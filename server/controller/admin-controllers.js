const Contact = require("../model/contact-model");
const User = require("../model/user-model");



const getAllUsers = async (req, res, next) => {
    try {
        //password:0 means show all fiels axcept password 
        //password:1 means show only password
        const users = await User.find({}, { password: 0 });
        //console.log(users);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
       return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}


const getAllContacts = async (req, res) => {
    try {
      
        const contacts = await Contact.find();
        console.log(contacts);
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No Contacts found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}




const deleteUserById = async (req, res) => {
    try {


        const id = req.params.id;
        await User.deleteOne({ _id: id });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
}



const getUserById = async (req, res) => {
    try {


        const id = req.params.id;
        const data = await User.findOne({_id:id},{password:0})

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}



const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        

        const updatedData = await User.updateOne(
            {_id:id},{$set: updateUserData}
        )

        res.status(200).json({ updatedData });
    } catch (error) {
        next(error);
    }
}



const deleteContactById = async (req, res) => {
    try {


        const id = req.params.id;
        await Contact.deleteOne({ _id: id });

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        next(error);
    }
}





module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById,updateUserById,deleteContactById };