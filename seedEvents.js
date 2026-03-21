const mongoose = require('mongoose');
const Event = require('./src/models/Event');
const User = require('./src/models/User');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const dummyEventsData = [
  {
    title: 'Tech Meetup Mumbai',
    description: 'A gathering of tech enthusiasts to discuss the latest in AI and Web3.',
    imageUrl: 'https://images.unsplash.com/photo-1540575861501-7ad060e39fe6?w=800&q=80',
    date: new Date('2026-03-15T18:00:00'),
    time: '6:00 PM',
    location: 'WeWork BKC, Mumbai',
    city: 'Mumbai',
    maxAttendees: 50,
    tags: ['Tech', 'Networking', 'AI'],
    isFeatured: true,
    category: 'Technology'
  },
  {
    title: 'Weekend Hiking Trip',
    description: 'Explore the scenic trails of Lonavla with fellow nature lovers.',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    date: new Date('2026-03-20T07:00:00'),
    time: '7:00 AM',
    location: 'Lonavla Trail Head',
    city: 'Lonavla',
    maxAttendees: 20,
    tags: ['Nature', 'Fitness', 'Hiking'],
    isFeatured: false,
    category: 'Outdoor'
  },
  {
    title: 'Yoga & Wellness Workshop',
    description: 'Start your weekend with a refreshing yoga session and wellness talk.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    date: new Date('2026-03-21T08:30:00'),
    time: '8:30 AM',
    location: 'Cubbon Park, Bangalore',
    city: 'Bangalore',
    maxAttendees: 30,
    tags: ['Yoga', 'Wellness', 'Health'],
    isFeatured: true,
    category: 'Wellness'
  },
  {
    title: 'Pottery for Beginners',
    description: 'Unleash your creativity in this hands-on pottery class.',
    imageUrl: 'https://images.unsplash.com/photo-1565191999001-551c1874ad7b?w=800&q=80',
    date: new Date('2026-03-25T11:00:00'),
    time: '11:00 AM',
    location: 'The Art Studio, Delhi',
    city: 'Delhi',
    maxAttendees: 12,
    tags: ['Art', 'Workshop', 'Pottery'],
    isFeatured: false,
    category: 'Workshop'
  }
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all active users to distribute hosting/RSVPing
    const users = await User.find({ status: 'active' });
    if (users.length === 0) {
      console.log('No active users found. Please seed users first.');
      process.exit(1);
    }

    console.log(`Found ${users.length} active users.`);

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    for (let i = 0; i < dummyEventsData.length; i++) {
      const eventData = dummyEventsData[i];
      
      // Rotate through users as hosts
      const host = users[i % users.length];
      
      // Randomly assign some other users as attendees
      const attendeeCount = Math.floor(Math.random() * Math.min(eventData.maxAttendees, users.length));
      const attendees = [host._id]; // Host is always an attendee
      
      // Add other random attendees
      for (let j = 0; j < attendeeCount; j++) {
        const attendee = users[Math.floor(Math.random() * users.length)];
        if (!attendees.includes(attendee._id)) {
          attendees.push(attendee._id);
        }
      }

      await Event.create({
        ...eventData,
        host: host._id,
        attendees: attendees
      });
      console.log(`Created event: ${eventData.title} (Host: ${host.displayName})`);
    }

    // Special case: Ensure the FIRST user has at least one hosted event and one RSVP'd event
    const firstUser = users[0];
    const userEvents = await Event.countDocuments({ host: firstUser._id });
    if (userEvents === 0) {
        // Create one more if needed
        await Event.create({
            title: 'Community Coffee Morning',
            description: 'A casual meetup for the local community over coffee.',
            imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
            date: new Date(),
            time: '10:00 AM',
            location: 'Starbucks, Bandra',
            city: 'Mumbai',
            maxAttendees: 15,
            tags: ['Social', 'Coffee'],
            host: firstUser._id,
            attendees: [firstUser._id],
            category: 'Social'
        });
        console.log(`Created additional event for ${firstUser.displayName}`);
    }

    console.log('Seeding events completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding events:', error);
    process.exit(1);
  }
};

seedEvents();
