const mongoose = require('mongoose');
const HiringRequest = require('./src/models/HiringRequest');
const User = require('./src/models/User');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedRequests = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const users = await User.find().limit(2);
        if (users.length === 0) {
            console.log('No users found to assign requests to.');
            process.exit(1);
        }

        const requesterId = users[0]._id;

        const requests = [
            {
                requesterId,
                title: 'Need help with Gardening',
                description: 'Looking for someone to help me prune the roses and mow the lawn this weekend.',
                category: 'household_help',
                jobType: 'in-person',
                location: {
                    city: 'Mumbai',
                    area: 'Andheri',
                    coordinates: [72.86, 19.11]
                },
                compensation: '₹500 / hour',
                duration: '4 hours',
                status: 'open',
                workersNeeded: 1
            },
            {
                requesterId,
                title: 'Math Tutor for Class 10',
                description: 'Need a tutor for 10th grade mathematics. Focus on Algebra and Geometry.',
                category: 'homework_help',
                jobType: 'in-person',
                location: {
                    city: 'Mumbai',
                    area: 'Bandra',
                    coordinates: [72.83, 19.05]
                },
                compensation: '₹1200 / session',
                duration: '2 hours',
                status: 'open',
                workersNeeded: 1
            },
            {
                requesterId,
                title: 'Grocery Shopping & Delivery',
                description: 'Need someone to pick up groceries from the local market and deliver to my home.',
                category: 'general_help',
                jobType: 'in-person',
                location: {
                    city: 'Mumbai',
                    area: 'Juhu',
                    coordinates: [72.82, 19.10]
                },
                compensation: '₹300 + fuel',
                duration: '1 hour',
                status: 'open',
                workersNeeded: 1
            }
        ];

        await HiringRequest.deleteMany({ title: { $in: requests.map(r => r.title) } });
        await HiringRequest.insertMany(requests);

        console.log('Hiring requests seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding requests:', error);
        process.exit(1);
    }
};

seedRequests();
