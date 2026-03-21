const mongoose = require('mongoose');
const Event = require('./src/models/Event');
const dotenv = require('dotenv');

dotenv.config();

async function checkEvents() {
  await mongoose.connect(process.env.MONGODB_URI);
  const events = await Event.find().populate('host', 'displayName');
  console.log(JSON.stringify(events, null, 2));
  await mongoose.connection.close();
}

checkEvents();
