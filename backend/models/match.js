const mongoose = require('mongoose');
const matchShema = mongoose.Schema({
    teamsOne: String,
    teamsTwo :String,
    scoreOne : Number,
    scoreTwo :Number,
})
const match =mongoose.model("Match",matchShema )
module.exports=match;