
//import le modul mongoose
const mongoose= require('mongoose')
//create le user shema
const userShema = mongoose.Schema({
    firstName :String,
    lastName : String,
    email: String,
    password:String,
    tel: Number,
    role:String,
    avatar:String,
})
// create un model user
const user = mongoose.model("User",userShema);
// export de model user
module.exports = user;