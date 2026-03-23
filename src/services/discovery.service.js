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
      buddyFind: '12,842', // Mocked or calculated
      meetBuddy: totalConnections > 1000 ? `${(totalConnections / 1000).toFixed(1)}k+` : totalConnections.toString(),
      totalBuddies: totalBuddies > 1000 ? `${(totalBuddies / 1000).toFixed(1)}k+` : totalBuddies.toString(),
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
        image: c.image, // Include image from DB
        buddies: countMap[c.slug] || 0
      })),
      trendingNeeds,
      vibes
    };
  }

  /**
   * Get recommended public buddies for the Home page
   */
  async getRecommendedBuddies(limit = 5) {
    logger.info(`Fetching ${limit} recommended buddies`);
    
    // Fetch top rated buddies or recently active ones
    const buddies = await User.find({ status: 'active', role: 'buddy' })
      .sort({ averageRating: -1, totalJobs: -1 })
      .limit(limit)
      .select('displayName location ratePerHour verificationLevel bio skills totalJobs averageRating avatar category lastActive')
      .lean();
      
    // Add some default fields for the frontend like 'category', 'price', etc.
    return buddies.map(buddy => ({
      ...buddy,
      name: buddy.displayName,
      image: buddy.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      price: buddy.ratePerHour || 500,
      responseTime: '15 mins',
      rating: buddy.averageRating || 5.0,
      jobsCompleted: buddy.totalJobs || 0,
      lastActive: 'Just now'
    }));
  }
}

module.exports = new DiscoveryService();
