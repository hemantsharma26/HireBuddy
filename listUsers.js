const mongoose = require('mongoose');
const User = require('./src/models/User');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const findUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({}, '_id displayName email');
    console.log('--- Users in Database ---');
    users.forEach(u => {
      console.log(`ID: ${u._id} | Name: ${u.displayName} | Email: ${u.email}`);
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

findUsers();
