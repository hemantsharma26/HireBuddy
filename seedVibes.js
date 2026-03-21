const mongoose = require('mongoose');
const Vibe = require('./src/models/Vibe');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const vibes = [
  // Emotional & Social
  { name: 'Calm', slug: 'calm', order: 1 },
  { name: 'Friendly', slug: 'friendly', order: 2 },
  { name: 'Funny', slug: 'funny', order: 3 },
  { name: 'Professional', slug: 'professional', order: 4 },
  { name: 'Listener', slug: 'listener', order: 5 },
  { name: 'Motivator', slug: 'motivator', order: 6 },
  { name: 'Adventurous', slug: 'adventurous', order: 7 },
  { name: 'Reliable', slug: 'reliable', order: 8 },
  { name: 'Cheerful', slug: 'cheerful', order: 9 },
  { name: 'Empathetic', slug: 'empathetic', order: 10 },
  { name: 'Energetic', slug: 'energetic', order: 11 },
  { name: 'Chill', slug: 'chill', order: 12 },
  { name: 'Talkative', slug: 'talkative', order: 13 },
  { name: 'Quiet', slug: 'quiet', order: 14 },
  { name: 'Intellectual', slug: 'intellectual', order: 15 },
  { name: 'Sarcastic', slug: 'sarcastic', order: 16 },
  { name: 'Gentle', slug: 'gentle', order: 17 },
  { name: 'Bold', slug: 'bold', order: 18 },
  { name: 'Creative', slug: 'creative', order: 19 },
  { name: 'Practical', slug: 'practical', order: 20 },
  
  // Professional & Skills-based
  { name: 'Punctual', slug: 'punctual', order: 21 },
  { name: 'Organized', slug: 'organized', order: 22 },
  { name: 'Tech-savvy', slug: 'tech_savvy', order: 23 },
  { name: 'Hardworking', slug: 'hardworking', order: 24 },
  { name: 'Patient', slug: 'patient', order: 25 },
  
  // Specific Personalities
  { name: 'Introverted', slug: 'introverted', order: 26 },
  { name: 'Extroverted', slug: 'extroverted', order: 27 },
  { name: 'Non-judgmental', slug: 'non_judgmental', order: 28 },
  { name: 'Open-minded', slug: 'open_minded', order: 29 },
  { name: 'Storyteller', slug: 'storyteller', order: 30 },
  { name: 'Problem Solver', slug: 'problem_solver', order: 31 },
  { name: 'Music Lover', slug: 'music_lover', order: 32 },
  { name: 'Movie Buff', slug: 'movie_buff', order: 33 },
  { name: 'Foodie', slug: 'foodie', order: 34 },
  { name: 'Fitness Enthusiast', slug: 'fitness_enthusiast', order: 35 },
  { name: 'Animal Lover', slug: 'animal_lover', order: 36 },
  { name: 'Travel Freak', slug: 'travel_freak', order: 37 },
  { name: 'Night Owl', slug: 'night_owl', order: 38 },
  { name: 'Early Bird', slug: 'early_bird', order: 39 },
  { name: 'Tech Enthusiast', slug: 'tech_enthusiast', order: 40 },
  { name: 'Geeky', slug: 'geeky', order: 41 },
  { name: 'Spiritual', slug: 'spiritual', order: 42 },
  { name: 'Nature Lover', slug: 'nature_lover', order: 43 },
  { name: 'Artistic', slug: 'artistic', order: 44 },
  { name: 'Bookworm', slug: 'bookworm', order: 45 },
  
  // Support-oriented
  { name: 'Nurturing', slug: 'nurturing', order: 46 },
  { name: 'Protective', slug: 'protective', order: 47 },
  { name: 'Strict', slug: 'strict', order: 48 },
  { name: 'Supportive', slug: 'supportive', order: 49 },
  { name: 'Encouraging', slug: 'encouraging', order: 50 },
  { name: 'Honest', slug: 'honest', order: 51 },
  { name: 'Loyal', slug: 'loyal', order: 52 },
  { name: 'Discreet', slug: 'discreet', order: 53 },
  { name: 'Kind', slug: 'kind', order: 54 },
  { name: 'Direct', slug: 'direct', order: 55 },
];

const seedVibes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Vibe.deleteMany({});
    console.log('Cleared existing vibes');

    await Vibe.insertMany(vibes);
    console.log(`Inserted ${vibes.length} vibes successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding vibes:', error);
    process.exit(1);
  }
};

seedVibes();
