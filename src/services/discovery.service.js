const User = require('../models/User');
const HiringRequest = require('../models/HiringRequest');
const Category = require('../models/Category');
const Vibe = require('../models/Vibe');
const ProfileConfig = require('../models/ProfileConfig');
const logger = require('../utils/logger');

/**
 * Discovery Service
 * Handles data aggregation for the Explore/Discovery page
 */
class DiscoveryService {
  /**
   * Get dynamic profile configuration options
   */
  async getProfileOptions() {
    logger.info('Fetching profile config options');
    const config = await ProfileConfig.findOne({ isSingleton: true }).lean();
    if (!config) {
      // Fallback empty structure if not seeded
      return {
        ageRanges: [],
        pronouns: [],
        languages: [],
        vibes: [],
        helpSituations: [],
        availabilitySlots: [],
        comfortSettings: [],
        trustLayerFields: []
      };
    }
    return config;
  }

  /**
   * Get all data needed for the Explore page
   */
  async getExploreData() {
    logger.info('Fetching explore data');

    const [totalBuddies, totalConnections, categories, vibesData] = await Promise.all([
      User.countDocuments({ status: 'active', role: 'user' }),
      HiringRequest.countDocuments({ status: 'completed' }),
      Category.find({ isActive: true }).sort({ order: 1, name: 1 }),
      Vibe.find({ isActive: true }).sort({ order: 1, name: 1 })
    ]);

    // Format stats with strings like "10k+", "1.5k+" for the frontend
    const heroStats = {
      totalBuddies: totalBuddies > 1000 ? `${(totalBuddies / 1000).toFixed(1)}k+` : totalBuddies.toString(),
      totalConnections: totalConnections > 1000 ? `${(totalConnections / 1000).toFixed(1)}k+` : totalConnections.toString(),
      buddiesLabel: 'qualified buddies',
      connectionsLabel: 'human connections'
    };

    // Derived trending needs (can be based on actual request titles)
    const recentRequests = await HiringRequest.find({ status: 'open' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category');

    const trendingNeeds = recentRequests.map(req => ({
      label: req.title,
      count: 'Recently requested',
      category: req.category,
      icon: 'zap' // Default icon
    }));

    // If less than 3, add some default trending needs
    if (trendingNeeds.length < 3) {
      trendingNeeds.push(
        { label: 'Late night companionship', count: '2.4k requests', category: 'Just Someone There', icon: 'moon' },
        { label: 'AC repair help', count: '1.7k requests', category: 'Everyday Help', icon: 'tool' }
      );
    }

    const vibes = vibesData.map(v => v.name);

    // Get real request counts per category
    const categoryCounts = await HiringRequest.aggregate([
      { $match: { status: 'open' } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const countMap = {};
    categoryCounts.forEach(c => { countMap[c._id] = c.count; });

    return {
      heroStats,
      categories: categories.map(c => ({
        title: c.name,
        slug: c.slug,
        icon: c.icon,
        color: c.color,
        buddies: countMap[c.slug] || 0
      })),
      trendingNeeds,
      vibes
    };
  }
}

module.exports = new DiscoveryService();
