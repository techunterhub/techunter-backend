const RegisteredUsers = require("../models/event.modules");
const asyncHandler = require("express-async-handler");


const RegisterEvent = asyncHandler(async (req, res) => {
    const { name, email, why_join, know_about } = req.body;

    // check if email exist or not
    const isExist = await RegisteredUsers.findOne({ email });
    if(isExist){
        return res.status(400).json({ message: "Email already exist" });
    }

    const user = await RegisteredUsers.create({
        name,
        email,
        why_join,
        know_about
    })

    await user.save();

    return res.status(201).json({ message: "User created successfully",data:user });
})

module.exports = { RegisterEvent }