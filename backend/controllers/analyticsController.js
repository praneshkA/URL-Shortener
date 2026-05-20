import { ShortUrl } from '../models/ShortUrl.js';
import { Visit } from '../models/Visit.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { config } from '../config/env.js';

export const getAnalytics = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const url = await ShortUrl.findOne({
    shortCode,
    userId: req.user._id,
  });

  if (!url) {
    throw new AppError('Analytics not found for this link', 404);
  }

  const lastVisit = await Visit.findOne({ shortUrlId: url._id })
    .sort({ timestamp: -1 })
    .select('timestamp')
    .lean();

  const recentVisits = await Visit.find({ shortUrlId: url._id })
    .sort({ timestamp: -1 })
    .limit(50)
    .select('timestamp')
    .lean();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const dailyClicks = await Visit.aggregate([
    {
      $match: {
        shortUrlId: url._id,
        timestamp: { $gte: thirtyDaysAgo },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
        },
        clicks: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        date: '$_id',
        clicks: 1,
      },
    },
  ]);

  res.json({
    success: true,
    analytics: {
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      shortUrl: `${config.baseUrl}/${url.shortCode}`,
      totalClicks: url.clicks,
      lastVisited: lastVisit?.timestamp || null,
      recentVisits: recentVisits.map((v) => ({
        timestamp: v.timestamp,
      })),
      dailyClicks,
      createdAt: url.createdAt,
    },
  });
});
