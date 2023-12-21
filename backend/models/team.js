//import le modul mongoose
const mongoose=require('mongoose')
//create le user shema
const teamShema = mongoose.Schema({
    name :String,
    foundation :Number,
    Owner: String,
    players:[{type:mongoose.Schema.Types.ObjectId,
        ref:"Playear"
    }]
    ,
    
})
// create un model user
const team = mongoose.model("Team",teamShema);
// export de model user
module.exports = team;