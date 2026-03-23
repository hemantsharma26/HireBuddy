const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const buddies = [
  {
    displayName: "Rahul Sharma",
    phoneNumber: "9876543210",
    role: "user",
    category: "Medicine Pickup",
    ratePerHour: 300,
    bio: "Always happy to help with medicine or groceries. I'm quick and reliable.",
    location: { city: "Mumbai", area: "Andheri" },
    vibes: ["Friendly", "Energetic"],
    stats: { averageRating: 4.8, totalRatings: 25, totalJobsCompleted: 42 },
    availability: "available",
    age: 24,
    gender: "male",
    status: "active"
  },
  {
    displayName: "Ananya Iyer",
    phoneNumber: "9876543211",
    role: "user",
    category: "Companionship",
    ratePerHour: 500,
    bio: "Great listener and lover of books. If you need someone to talk to or read with, I'm here.",
    location: { city: "Bangalore", area: "Koramangala" },
    vibes: ["Quiet", "Friendly"],
    stats: { averageRating: 5.0, totalRatings: 12, totalJobsCompleted: 15 },
    availability: "available",
    age: 28,
    gender: "female",
    status: "active"
  },
  {
    displayName: "Vikram Singh",
    phoneNumber: "9876543212",
    role: "user",
    category: "Household Help",
    ratePerHour: 250,
    bio: "Can help with minor repairs, gardening, or moving stuff around the house.",
    location: { city: "Delhi", area: "Saket" },
    vibes: ["Professional", "Quiet"],
    stats: { averageRating: 4.5, totalRatings: 50, totalJobsCompleted: 88 },
    availability: "available",
    age: 35,
    gender: "male",
    status: "active"
  },
  {
    displayName: "Priya Das",
    phoneNumber: "9876543213",
    role: "user",
    category: "Night Safety",
    ratePerHour: 600,
    bio: "Trained in self-defense. Can accompany you for late-night travels or safety walks.",
    location: { city: "Kolkata", area: "Salt Lake" },
    vibes: ["Professional", "Energetic"],
    stats: { averageRating: 4.9, totalRatings: 8, totalJobsCompleted: 10 },
    availability: "available",
    age: 30,
    gender: "female",
    status: "active"
  },
  {
    displayName: "Amit Patel",
    phoneNumber: "9876543214",
    role: "user",
    category: "Technical Support",
    ratePerHour: 800,
    bio: "Can help setting up your WiFi, cleaning your laptop, or fixing basic software issues.",
    location: { city: "Ahmedabad", area: "Satellite" },
    vibes: ["Professional"],
    stats: { averageRating: 4.7, totalRatings: 30, totalJobsCompleted: 55 },
    availability: "available",
    age: 26,
    gender: "male",
    status: "active"
  },
  {
    displayName: "Sneha Reddy",
    phoneNumber: "9876543215",
    role: "user",
    category: "Grocery Shopping",
    ratePerHour: 200,
    bio: "I know all the best local markets. Can help you with fresh picks and heavy bags.",
    location: { city: "Hyderabad", area: "Gachibowli" },
    vibes: ["Friendly", "Energetic"],
    stats: { averageRating: 4.6, totalRatings: 18, totalJobsCompleted: 30 },
    availability: "available",
    age: 22,
    gender: "female",
    status: "active"
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected!');

    console.log('Cleaning up existing buddies...');
    // Only delete buddies with these phone numbers to avoid wiping real data
    const phoneNumbers = buddies.map(b => b.phoneNumber);
    await User.deleteMany({ phoneNumber: { $in: phoneNumbers } });

    console.log('Seeding buddies...');
    await User.insertMany(buddies);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
