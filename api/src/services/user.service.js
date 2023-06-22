const Users = require('../database/users');

const createUser =  (req)=>{
    Users.createUser(req);
}
const getAllUser =  ()=>{
    const allUsers = Users.getAllUser();
    return allUsers;
}
const updateUserPassword =  (req)=>{
    Users.updateUserPassword(req);
}
const updateUserEmail =  (req)=>{
    Users.updateUserEmail(req);
}
const updateUserNicknames =  (req)=>{
    Users.updateUserNicknames(req);
}
const deleteUser = (req)=>{
    Users.deleteUser(req)
}


module.exports = {
    createUser,
    getAllUser,
    updateUserPassword,
    updateUserEmail,
    updateUserNicknames,
    deleteUser
}