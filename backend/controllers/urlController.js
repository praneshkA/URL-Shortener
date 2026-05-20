import { ShortUrl } from '../models/ShortUrl.js';
import { Visit } from '../models/Visit.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateUniqueShortCode } from '../utils/generateShortCode.js';
import { config } from '../config/env.js';

const formatUrl = (doc, lastVisited = null) => ({
  id: doc._id,
  originalUrl: doc.originalUrl,
  shortCode: doc.shortCode,
  shortUrl: `${config.baseUrl}/${doc.shortCode}`,
  clicks: doc.clicks,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
  lastVisited,
});

const getLastVisitedMap = async (urlIds) => {
  const visits = await Visit.aggregate([
    { $match: { shortUrlId: { $in: urlIds } } },
    { $sort: { timestamp: -1 } },
    {
      $group: {
        _id: '$shortUrlId',
        lastVisited: { $first: '$timestamp' },
      },
    },
  ]);
  return Object.fromEntries(visits.map((v) => [v._id.toString(), v.lastVisited]));
};

export const createUrl = asyncHandler(async (req, res) => {
  const shortCode = await generateUniqueShortCode();
  const shortUrl = await ShortUrl.create({
    userId: req.user._id,
    originalUrl: req.body.originalUrl,
    shortCode,
  });

  res.status(201).json({
    success: true,
    url: formatUrl(shortUrl, null),
  });
});

export const getUrls = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const filter = { userId: req.user._id };

  if (search?.trim()) {
    const term = search.trim();
    filter.$or = [
      { originalUrl: { $regex: term, $options: 'i' } },
      { shortCode: { $regex: term, $options: 'i' } },
    ];
  }

  const urls = await ShortUrl.find(filter).sort({ createdAt: -1 });
  const urlIds = urls.map((u) => u._id);
  const lastVisitedMap = urlIds.length ? await getLastVisitedMap(urlIds) : {};

  res.json({
    success: true,
    urls: urls.map((u) =>
      formatUrl(u, lastVisitedMap[u._id.toString()] || null)
    ),
  });
});

export const getUrlById = asyncHandler(async (req, res) => {
  const url = await ShortUrl.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!url) {
    throw new AppError('Short URL not found', 404);
  }

  const lastVisit = await Visit.findOne({ shortUrlId: url._id })
    .sort({ timestamp: -1 })
    .select('timestamp')
    .lean();

  res.json({
    success: true,
    url: formatUrl(url, lastVisit?.timestamp || null),
  });
});

export const deleteUrl = asyncHandler(async (req, res) => {
  const url = await ShortUrl.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!url) {
    throw new AppError('Short URL not found', 404);
  }

  await Visit.deleteMany({ shortUrlId: url._id });

  res.json({
    success: true,
    message: 'URL deleted successfully',
  });
});

export const redirect = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const url = await ShortUrl.findOne({ shortCode });
  if (!url) {
    throw new AppError('Short link not found', 404);
  }

  url.clicks += 1;
  await url.save();

  await Visit.create({
    shortUrlId: url._id,
    timestamp: new Date(),
  });

  res.redirect(302, url.originalUrl);
});
