require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
const mongoURI = 'mongodb://127.0.0.1:27017/polling'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((error) => {
        console.error('MongoDB connection error: ', error)
    })

const db = require('./models');

const users = [
  { username: 'username', password: 'password' },
  { username: 'kelvin', password: 'password' },
];

const polls = [
  {
    question: 'Which is the best JavaScript framework',
    options: ['Angular', 'React', 'VueJS'],
  },
  { question: 'Who is the best mutant', options: ['Wolverine', 'Deadpool'] },
  { question: 'Truth or dare', options: ['Truth', 'Dare'] },
  { question: 'Boolean?', options: ['True', 'False'] },
];

const seed = async () => {
  try {
    await db.User.deleteMany({});
    console.log('DROP ALL USERS');

    await db.Poll.deleteMany({});
    console.log('DROP ALL POLLS');

    await Promise.all(
      users.map(async user => {
        const data = await db.User.create(user);
        await data.save();
      }),
    );
    console.log('CREATED USERS', JSON.stringify(users));

    await Promise.all(
      polls.map(async poll => {
        poll.options = poll.options.map(option => ({ option, votes: 0 }));
        const data = await db.Poll.create(poll);
        const user = await db.User.findOne({ username: 'username' });
        data.creator = user;
        user.polls.push(data._id);
        await user.save();
        await data.save();
      }),
    );
    console.log('CREATED POLLS', JSON.stringify(polls));
  } catch (err) {
    console.error(err);
  }
};

seed();