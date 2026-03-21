const mongoose = require('mongoose');
const Event = require('./src/models/Event');
const User = require('./src/models/User');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const HEMANT_IDS = [
  '69b4ff1e76ec8ca9f923842b',
  '69b50650018c9c17f8abde3d',
  '69b50897018c9c17f8abde41'
];

const seedTestData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 2);

    // Create 10+ random attendees
    const randomAttendees = [];
    for (let i = 0; i < 15; i++) {
        randomAttendees.push({
            user: new mongoose.Types.ObjectId(), // Virtual users
            status: i % 3 === 0 ? 'accepted' : (i % 3 === 1 ? 'pending' : 'rejected')
        });
    }

    const testEvents = [
      {
        title: 'PENDING: Future Workshop',
        description: 'You have applied to this event and are waiting for approval.',
        date: futureDate,
        time: '10:00 AM',
        address: '123 Tech Park, Phase 1',
        city: 'Mumbai',
        host: HEMANT_IDS[0],
        category: 'Workshop',
        status: 'upcoming',
        attendees: [
            ...HEMANT_IDS.map(id => ({ user: id, status: 'pending' })),
            ...randomAttendees
        ]
      },
      {
        title: 'ACCEPTED: Upcoming Concert',
        description: 'You are accepted to this event! See you there.',
        date: futureDate,
        time: '7:00 PM',
        address: 'Royal Opera House',
        city: 'Mumbai',
        host: HEMANT_IDS[0],
        category: 'Entertainment',
        status: 'upcoming',
        attendees: [
            ...HEMANT_IDS.map(id => ({ user: id, status: 'accepted' })),
            ...randomAttendees
        ]
      },
      {
        title: 'REJECTED: Study Group',
        description: 'Your application to this event was rejected by the host.',
        date: futureDate,
        time: '2:00 PM',
        address: 'Library Cafe',
        city: 'Mumbai',
        host: HEMANT_IDS[0],
        category: 'Education',
        status: 'upcoming',
        attendees: [
            ...HEMANT_IDS.map(id => ({ user: id, status: 'rejected' })),
            ...randomAttendees
        ]
      },
      {
        title: 'COMPLETED: Last Week Meetup',
        description: 'This event is finished. You can now rate your experience!',
        date: pastDate,
        time: '11:00 AM',
        address: 'Central Park',
        city: 'Mumbai',
        host: HEMANT_IDS[0],
        category: 'Social',
        status: 'completed',
        attendees: [
            ...HEMANT_IDS.map(id => ({ user: id, status: 'accepted' })),
            ...randomAttendees
        ]
      }
    ];

    await Event.deleteMany({ title: { $in: testEvents.map(e => e.title) } });

    for (const data of testEvents) {
      await Event.create(data);
      console.log(`Created test event: ${data.title}`);
    }

    console.log('Test session data seeded successfully with high attendee count!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding test data:', error);
    process.exit(1);
  }
};

seedTestData();
