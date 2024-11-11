const RegisteredUsers = require("../models/event.modules");

const RegisterEvent = async (req, res) => {
    try {
        const { name, email, why_join, know_about } = req.body;
        
        // Create a new user entry
        await RegisteredUsers.create({
            name: name,
            email: email,
            why_join: why_join,
            know_about: know_about
        });

        // Fetch all registered users (await the result)
        const users = await RegisteredUsers.find();

        // Send response with success message
        res.status(201).json({
            message: "Event Registered Successfully",
            status: 201,
            data: users,
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({
            message: "An error occurred while registering the event",
            status: 500,
            error: error.message
        });
    }
};

module.exports = RegisterEvent;
