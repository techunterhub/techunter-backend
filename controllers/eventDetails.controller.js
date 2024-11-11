
const EventManagement = require('../models/event-detail.models');

const CreateEvent = async (req, res) => {
    try {
        const { Title, Description, Duration, Venue, Prize } = req.body

        const eventDetail = await EventManagement.create({
            user: req.user._id,
            Title,
            Description,
            Duration,
            Venue,
            Prize
        })
        res.json({
            message: 'Event created successfully',
            data: eventDetail
        });
        console.log('Event created successfully');

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.keys(error.errors).map(field => ({
                    field,
                    message: error.errors[field].message
                }))
            });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// Edit event details 
const UpdateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;  // the new data for updating the event
        const editedEvent = await model.findByIdAndUpdate(id, updatedData, { new: true });

        res.json({
            success: true,
            data: editedEvent
        });
        console.log('Edit event successfully');

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.keys(error.errors).map(field => ({
                    field,
                    message: error.errors[field].message
                }))
            });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete event 
const DeleteEvent = async (req, res) => {

    try {
        const { id } = req.params;
        if (!id) return res.status(404).json({ message: 'Event not found' });

        await EventManagement.findByIdAndDelete(id);

        res.json({
            message: 'Event deleted successfully',
            success: true
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.keys(error.errors).map(field => ({
                    field,
                    message: error.errors[field].message
                }))
            });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Show all events
const getAllEvents = async (req, res) => {
    try {

        const limit = req.params.limit || 10
        const page = req.params.page || 1
        const events = await EventManagement.find().limit(limit).skip((page - 1) * limit).exec()

        res.json({
            success:true,
            data: events
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.keys(error.errors).map(field => ({
                    field,
                    message: error.errors[field].message
                }))
            });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }

};

// Get events by id 
const getSingleEvent = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id) return res.status(404).json({ message: 'Event not found' });

        const events = await model.findById(id);

        res.json({
            message: 'Event fetched successfully',
            success: true,
            data: events
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.keys(error.errors).map(field => ({
                    field,
                    message: error.errors[field].message
                }))
            });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};





module.exports = {
    CreateEvent,
    UpdateEvent,
    DeleteEvent,
    getAllEvents,
    getSingleEvent
}