const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const ProfileConfig = require('./src/models/ProfileConfig');

dotenv.config({ path: path.join(__dirname, '.env') });

const DB_URI = process.env.MONGODB_URI;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  seedData();
}).catch(err => console.log(err));

async function seedData() {
  try {
    await ProfileConfig.deleteMany({});
    
    const config = {
      isSingleton: true,
      ageRanges: ['18–21', '22–25', '26–30', '31–35', '36–40', '41–50', '50+'],
      pronouns: ['He/Him', 'She/Her', 'They/Them', 'Prefer not to say'],
      languages: [
        'Hindi', 'English', 'Hinglish', 'Tamil', 'Telugu', 'Bengali', 
        'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu'
      ],
      vibes: [
        'Listener', 'Funny', 'Calm presence', 'Deep thinker', 'Motivator',
        'Non-judgmental', 'Spiritual', 'Practical advisor', 'Late-night talker',
        'Hype person', 'Storyteller', 'Empath'
      ],
      helpSituations: [
        'Feeling lonely', 'Anxiety talks', 'Late night chats', 'Breakup support',
        'Need someone to listen', 'Movie companion', 'Travel buddy', 'Study partner',
        'Motivation calls', 'Just random talks', 'Career confusion', 'Family stuff'
      ],
      availabilitySlots: [
        { label: 'Usually available instantly', subtitle: 'I can hop on quickly', icon: 'flash_on_rounded' },
        { label: 'Evenings mostly', subtitle: 'After 6 PM works best', icon: 'wb_twilight_rounded' },
        { label: 'Late night person', subtitle: 'Owl hours are my hours', icon: 'nights_stay_rounded' },
        { label: 'Weekends', subtitle: 'Saturday & Sunday vibes', icon: 'weekend_rounded' },
        { label: 'Scheduled chats only', subtitle: 'I prefer planned sessions', icon: 'event_available_rounded' }
      ],
      comfortSettings: [
        'Comfortable with video calls', 
        'Voice calls preferred', 
        'Chat only option', 
        'Same-gender connections only'
      ],
      trustLayerFields: [
        { id: 'id_verification', label: 'ID Verification', subtitle: 'Verified profiles get 5× more trust.', points: 20 }
      ]
    };
    
    await ProfileConfig.create(config);
    console.log('ProfileConfig seeded successfully.');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}
