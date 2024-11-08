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

const getEvent = asyncHandler(async (req, res) => {
    // get the how many data to be fetch 
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const skip = (page - 1) * limit;

    const users = await RegisteredUsers.find()
    .skip(skip)
    .limit(limit)

    if(users.length === 0){
        return res.status(404).json({ message: "No data found" });
    }

    return res.json({
        count: users.length,
        data: users,
        page: parseInt(page),
        limit: parseInt(limit),
    });
})

const deleteEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await RegisteredUsers.findByIdAndDelete(id);

    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
})

const updateEvent = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { name, why_join, know_about } = req.body;

    const isExist = await RegisteredUsers.findById(id);
    if(!isExist){
        return res.status(404).json({ message: "User not found" });
    }

    const user = await RegisteredUsers.findByIdAndUpdate(id, {
        name,
        why_join,
        know_about
    }, {
        new: true
    });

    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User updated successfully", data: user });

})



module.exports = { 
    RegisterEvent , 
    getEvent,
    deleteEvent,
    updateEvent
}