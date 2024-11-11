
const model= require('../models/eventdetail.model');

// Create new event 

const CreateEvent = async(req,res)=>{
    const{Title,Description,Duration, Venue,Prize}= req.body
    const eventDetail= await model.create({
        Title,
        Description,
        Duration,
        Venue,
        Prize
    });
    res.json({
        message:'Event created successfully',
        data:eventDetail
    });
    console.log(eventDetail);

};

// Edit event details 
const EditEvent = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;  // the new data for updating the event
    const editedEvent = await model.findByIdAndUpdate(id, updatedData, { new: true });

    res.json({
        message: 'Event updated successfully',
        data: editedEvent
    });
    console.log('Edit event successfully');
};



// Delete event 
const DeleteEvent= async(req,res)=>{
    const {id}= req.params; 
    const deletedEvent= await model.findByIdAndDelete(id);
    res.json({
        message:'Event deleted successfully',
        data:deletedEvent
    });
    console.log('Deleted event successfully');
};

// Show all events
const ShowEvents= async(req,res)=>{
    const allEvents= await model.find();
    res.json({
        message:'All events',
        data:allEvents
    });
console.log('All events showed successfully');

};
// Get events by id 
const GetEvent= async(req,res)=>{
    const {id}= req.params; 
    const getEvent= await model.findById(id);
    res.json({
        message:'Event fetched successfully',
        data:getEvent
    });
    console.log('Event fetched successfully');
};




module.exports= {
    CreateEvent,
    EditEvent,
    DeleteEvent,ShowEvents,GetEvent
}