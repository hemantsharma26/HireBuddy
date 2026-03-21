const mongoose = require('mongoose');
const User = require('./src/models/User');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const buddies = [
  {
    phoneNumber: '9876543210',
    displayName: 'Aarav Mehta',
    bio: 'Passionate about networking and music. Love to help with tech issues.',
    email: 'aarav@example.com',
    location: { city: 'Mumbai', area: 'Andheri' },
    availability: 'available',
    stats: { averageRating: 4.8, totalRatings: 24, totalJobsCompleted: 15 }
  },
  {
    phoneNumber: '9876543211',
    displayName: 'Ananya Iyer',
    bio: 'Foodie and content creator. Happy to help with household tasks or companion walks.',
    email: 'ananya@example.com',
    location: { city: 'Chennai', area: 'Adyar' },
    availability: 'available',
    stats: { averageRating: 4.6, totalRatings: 18, totalJobsCompleted: 12 }
  },
  {
    phoneNumber: '9876543212',
    displayName: 'Meera Reddy',
    bio: 'Yoga enthusiast and wellness coach. Available for companionship and light help.',
    email: 'meera@example.com',
    location: { city: 'Hyderabad', area: 'Banjara Hills' },
    availability: 'available',
    stats: { averageRating: 4.9, totalRatings: 32, totalJobsCompleted: 28 }
  },
  {
    phoneNumber: '9876543213',
    displayName: 'Arjun P.',
    bio: 'Tech geek and gadget lover. I can help you with anything computer related.',
    email: 'arjun@example.com',
    location: { city: 'Bangalore', area: 'Yelahanka' },
    availability: 'available',
    stats: { averageRating: 5.0, totalRatings: 10, totalJobsCompleted: 8 },
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80'
  },
  {
    phoneNumber: '9876543214',
    displayName: 'Priya Sharma',
    bio: 'Student at DU. Love reading and helping kids with homework.',
    email: 'priya@example.com',
    location: { city: 'Delhi', area: 'North Campus' },
    availability: 'available',
    stats: { averageRating: 4.7, totalRatings: 15, totalJobsCompleted: 10 }
  },
  {
    phoneNumber: '9876543215',
    displayName: 'Rahul Verma',
    bio: 'Fitness trainer. Can help with safety presence or travel companion tasks.',
    email: 'rahul@example.com',
    location: { city: 'Pune', area: 'Kothrud' },
    availability: 'busy',
    stats: { averageRating: 4.5, totalRatings: 20, totalJobsCompleted: 14 }
  }
];

const seedBuddies = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Filter out our seed buddies by phone number before adding to avoid duplicates if rerun
    // But since this is a seed script, maybe just delete others? 
    // No, better to just insert if not exists or clear non-admin users.
    // For simplicity, we'll just insert those that don't exist.
    
    for (const buddy of buddies) {
      const existing = await User.findOne({ 
        $or: [
          { phoneNumber: buddy.phoneNumber },
          { email: buddy.email }
        ]
      });
      if (!existing) {
        await User.create({
          ...buddy,
          password: 'password123', // Default dummy password
          phoneVerified: true,
          status: 'active'
        });
        console.log(`Created buddy: ${buddy.displayName}`);
      } else {
        // Update existing buddy details for testing (except sensitive ones)
        await User.findByIdAndUpdate(existing._id, {
          displayName: buddy.displayName,
          bio: buddy.bio,
          location: buddy.location,
          availability: buddy.availability,
          stats: buddy.stats
        });
        console.log(`Updated buddy: ${buddy.displayName}`);
      }
    }

    console.log('Seeding buddies completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding buddies:', error);
    process.exit(1);
  }
};

seedBuddies();
