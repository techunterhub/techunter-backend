const Subscriber = require('../models/newsletter.models');
const transporter = require('../services/newsletter.service');

exports.addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'This email is already subscribed' });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    await transporter.sendMail({
      from: 'shahbishwa21@gmail.com',
      to: email,
      subject: 'Welcome to our Newsletter!',
      text: `Hi, thank you for subscribing to our newsletter!`,
    });

    res.status(201).json({ message: 'Subscription successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing', error });
  }
};

exports.sendNewsletter = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    const emails = subscribers.map(sub => sub.email);

    await transporter.sendMail({
      from: 'shahbishwa21@gmail.com',
      to: emails,
      subject: 'Our Latest Newsletter!',
      text: 'Here’s our latest news!',
    });

    res.status(200).json({ message: 'Newsletter sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending newsletter', error });
  }
};
