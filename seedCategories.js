const mongoose = require('mongoose');
const Category = require('./src/models/Category');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const categories = [
  {
    name: 'Medicine Pickup',
    slug: 'medicine_pickup',
    icon: 'pill',
    color: '#FFE4E6',
    order: 1
  },
  {
    name: 'Household Help',
    slug: 'household_help',
    icon: 'home',
    color: '#F0FDF4',
    order: 2
  },
  {
    name: 'Companionship',
    slug: 'companionship',
    icon: 'heart',
    color: '#FDF2F8',
    order: 3
  },
  {
    name: 'Safety Presence',
    slug: 'safety_presence',
    icon: 'shield',
    color: '#EFF6FF',
    order: 4
  },
  {
    name: 'Travel Companion',
    slug: 'travel_companion',
    icon: 'map',
    color: '#FFF7ED',
    order: 5
  },
  {
    name: 'Homework Help',
    slug: 'homework_help',
    icon: 'book',
    color: '#F5F3FF',
    order: 6
  },
  {
    name: 'General Help',
    slug: 'general_help',
    icon: 'hand',
    color: '#F9FAFB',
    order: 7
  },
  {
    name: 'Other',
    slug: 'other',
    icon: 'plus',
    color: '#F3F4F6',
    order: 8
  }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Category.deleteMany({});
    console.log('Cleared existing categories');

    await Category.insertMany(categories);
    console.log('Inserted categories successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
