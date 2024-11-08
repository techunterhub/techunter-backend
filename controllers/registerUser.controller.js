const RegisteredUsers = require("../models/registerEvent.model");

exports.RegisterUser = async(req,res)=>{
const {name , email , whyJoin , knowAbout } = req.body;
console.log(name,email,whyJoin,knowAbout);
await RegisteredUsers.create({
    name ,
    email ,
    whyJoin,
    knowAbout
});
res.json({
    message: "User Registered Events Successfully",
})
}

