//import le modul mongoose
const mongoose=require('mongoose');
//create le user shema
const playerSchema = mongoose.Schema(
    {
        Name: String,
        age: Number,
        nbr: Number,
        position: Number,
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        }
    }
)
// create un model playear
const player = mongoose.model("Player", playerSchema);
// export de model playear
module.exports = player;