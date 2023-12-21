//impot express module
const express = require("express");
// import body-parser module
const bodyParser = require("body-parser");
// import bcrypet module (chifre le mt passe )
const bcrypt = require("bcrypt");
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const session = require('express-session');
// import axios module;
const axios = require('axios');
// import mongoose module
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/sportBD');
//creer une app BE named app
const app = express();
//configure le body-parser pour structure la reponse du BE sous formzt json
app.use(bodyParser.json());
//configure le body-parser pour parser le req recu du FE (accéder au contenu de l'objet )
app.use(bodyParser.urlencoded({ extended: true }));
//security config
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH, PUT");
    next();
});
app.use('/files', express.static(path.join('backend/images')));
//type de Media
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});
const secretKey = 'croco-omayma-23-cun';
app.use(session({
secret: secretKey,
}));


// Models Importation
const User = require("./models/user");
const Match = require("./models/match");
const Player = require("./models/playear")
const Team = require("./models/team");




let allMatches = [
    { id: 1, teamsOne: "FCB", teamsTwo: "EST", scoreOne: 1, scoreTwo: 2 },
    { id: 2, teamsOne: "CA", teamsTwo: "RMD", scoreOne: 2, scoreTwo: 1 },
    { id: 3, teamsOne: "FCB", teamsTwo: "RMD", scoreOne: 0, scoreTwo: 2 },

]
let allPlayers = [
    { id: 1, name: "omayma", position: 1, age: 10 },
    { id: 2, name: "salma", position: 1, age: 15 },
    { id: 3, name: "amani", position: 1, age: 13 }


]
let allUser = [
    { id: 1, firstName: "omayma", LastName: "gantassi", email: "omaymagantassi@gmail.com", password: "azertyG@12", tel: 25469871 },
    { id: 2, firstName: "asma", LastName: "gantassi", email: "asmagantassi@gmail.com", password: "azerty", tel: 25469871 },


]

//busines logic
// busines logic get allMatches 
app.get('/matches', (req, res) => {
    console.log('here into Be get all matches');
    Match.find().then(
        (docs) => {
            console.log("here into docs", docs);

            res.json({ t: docs })
        }
    )

});
//business logic get allMaches by Id
app.get('/matches/:id', (req, res) => {
    console.log('here into get matchBYid');
    //recuperer l'Id;
    let matchId = req.params.id;
    Match.findById(matchId).then(
        (doc) => {
            console.log("here doc", doc);
            res.json({ findedMatch: doc });
        }
    )


}
)

//busines logic
// busines logic get allPLayreas 
app.get('/players', (req, res) => {
    console.log('here into all playreas');

    Player.find().then(
        (docs) => {
            console.log("here into docs", docs);

            res.json({ t: docs })
        }
    )

});
//busines logic get allPLayreas by ID
app.get('/players/:id', (req, res) => {

    //recuperer l'Id;
    let y = req.params.id;
    console.log('here into get playearBYid');
    let playear = allPlayers.find(
        (obj) => {
            return obj.id == y
        }
    )
    res.json({ p: playear })
}
)

//busines logic DElete matches
app.delete('/matches/:id', (req, res) => {
    let matchId = req.params.id;
    Match.deleteOne({ _id: matchId }).then((deleteReponse) => {
        console.log('here delette', deleteReponse);
        if (deleteReponse.deletedCount == 1) {
            res.json({ message: "Success" });

        }
        else {
            res.json({ message: "Echec" });
        }
    })

}
)
// busines logic delete playreas
app.delete('/players/:id', (req, res) => {
    let playearId = req.params.id
    Player.deleteOne({ _id: playearId }).then((deleteReponse) => {
        console.log('here delette', deleteReponse);
        if (deleteReponse.deletedCount == 1) {
            res.json({ message: "Success" });

        }
        else {
            res.json({ message: "Echec" });
        }
    })
}
)

// business logic to add matches
app.post('/matches', (req, res) => {
    console.log('Here into add match', req.body);
    let matche = new Match(req.body);
    matche.save();
    res.json({ msg: 'match added with success' });
});

// busines logic to add playreas
app.post("/players", (req, res) => {
    console.log("Here into BL: Add Player", req.body);
    Team.findById(req.body.tId).then((team) => { // Corrected team ID
        if (!team) {
            return res.json({ msg: "Team Not Found" });
        }
        let player = new Player({
            Name: req.body.Name,
            age: req.body.age,
            nbr: req.body.nbr,
            position: req.body.position,
            team: team._id
        });
        player.save((err, doc) => {
            if (err) {
                res.json({ msg: "Error" });
            } else {
                team.players.push(doc);
                team.save();
                res.json({ msg: "Player Added with Success" });
            }
        });
    });
});


// busines logic to edit match
app.put('/matches', (req, res) => {

    console.log('here into obj', req.body);
    Match.updateOne({ _id: req.body._id }, req.body).then(
        (updateResponse) => {
            console.log('here is update response', updateResponse);
            if (updateResponse.nModified == 1) {
                res.json({ msg: "success" });
            }
            else {
                res.json({ msg: "Error" });
            }

        })
}


)
// busines logic to edit playears
app.put('/players', (req, res) => {

    console.log('here into obj', req.body);
    Player.updateOne({ _id: req.body._id }, req.body).then(
        (updateResponse) => {
            console.log('here is update response', updateResponse);
            if (updateResponse.nModified == 1) {
                res.json({ msg: "success" });
            }
            else {
                res.json({ msg: "Error" });
            }

        })
}


)
// busines logic to add teams
app.post('/teams', (req, res) => {
    console.log('here into teams', req.body);

    let teams = new Team(req.body);
    teams.save();
    res.json({ msg: 'teams added with success' });
}
)
// busines logic to edit teams
app.put('/teams', (req, res) => {

    console.log('here into obj', req.body);
    Team.updateOne({ _id: req.body._id }, req.body).then(
        (updateResponse) => {
            console.log('here is update response', updateResponse);
            if (updateResponse.nModified == 1) {
                res.json({ msg: "success" });
            }
            else {
                res.json({ msg: "Error" });
            }

        })
}


)
// busines logic get allPLayreas 
app.get('/teams', (req, res) => {
    console.log('here into all teams');

    Team.find().then(
        (docs) => {
            console.log("here into docs", docs);

            res.json({ t: docs })
        }
    )

});
// busines logic delete playreas
app.delete('/teams/:id', (req, res) => {
    let teamsId = req.params.id
    Team.deleteOne({ _id: teamsId }).then((deleteReponse) => {
        console.log('here delette', deleteReponse);
        if (deleteReponse.deletedCount == 1) {
            res.json({ message: "Success" });

        }
        else {
            res.json({ message: "Echec" });
        }
    })
}
)
//business logic get allTeams by Id
app.get('/teams/:id', (req, res) => {
    console.log('here into get teamBYid');
    //recuperer l'Id;
    let teamId = req.params.id;
    Team.findById(teamId).then(
        (doc) => {
            console.log("here doc", doc);
            res.json({ findedTeam: doc });
        }
    )


}
)


// business logic to add user
app.post('/users/signup', multer({ storage: storageConfig }).single("img"), (req, res) => {
    console.log('Here into signup', req.body);
    bcrypt.hash(req.body.password, 10).then(
        (bcryptedPwd) => {
            console.log("here is bcryp password", bcryptedPwd);

            req.body.password = bcryptedPwd;
            req.body.avatar = `http://localhost:3000/files/${req.file.filename}`;
            // add user
            let user = new User(req.body);
            user.save();
            res.json({ msg: 'user added with success' });
        }
    )
});

// business logic to add login
app.post('/users/login', (req, res) => {

    console.log('here into login');
    console.log('here is added login', req.body);
    let user = req.body;
    // check if email exist
    User.findOne({ email: user.email }).then((doc) => {
        if (!doc) {
            return res.json({ msg: "please check your email"})
        }
        bcrypt.compare(user.password, doc.password).then((pwdResult) => {
            if (!pwdResult) {
                return res.json({ msg: "please check pwd" });

            }
            let userTSend = {
                fNme: doc.firstName,
                lName: doc.lastName,
                id: doc._id,
                role:doc.role,

            }
            const token =jwt.sign(userTSend,secretKey,{ expiresIn:
                '1h' })
            res.json({ msg: "wellcom", token: token})
        })

    }
    )
}



);

app.get('/users', (req, res) => {
    console.log('here into Be get all user');
    User.find().then(
        (docs) => {
            console.log("here into docs", docs);

            res.json({ user: docs })
        }
    )

});


//business logic get allUser by Id
app.get('/users/:id', (req, res) => {
    console.log('here into get userBYid');
    //recuperer l'Id;
    let userId = req.params.id;
    User.findById(userId).then(
        (doc) => {
            console.log("here doc", doc);
            res.json({ findedUser: doc });
        }
    )


}
)

// business logic to add scrore by match
app.post('/matches/searchScore', (req, res) => {
    console.log('here into add score');
    console.log('here is added score', req.body);
    let searchScore = req.body;
    let matche = allMatches.filter(match => {
        return match.scoreOne === searchScore.score || match.scoreTwo === searchScore.score;
    });

    res.json({ m: matche });
});

app.post('/weather', (req, res) => {
    console.log('here is added city', req.body);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=62ee756a34835483299877a61961cafb`).then(
      (APres) =>{
        console.log("here is APres",APres.data);
        let result={
            temp:APres.data.main.temp,
            humidity:APres.data.main.humidity,
            pressure:APres.data.main.pressure,
            speed:APres.data.wind.speed,
            icone:`https://openweathermap.org/img/wn/${APres.data.weather[0].icon}@4x.png`,

        }
        res.json({result:result})
      }
       
    );

   
});

//business logic get allMaches by Id
app.get('/teams/:id', (req, res) => {
    console.log('here into get teamBYid');
    //recuperer l'Id;
    let teamId = req.params.id;
    Team.findById(teamId).populate("players").then(
        (doc) => {
            console.log("here doc", doc);
            res.json({ team: doc });
        }
        
    )
        
    


}
)


// pour pouvoir importer l'app(la rendre exportable)
module.exports = app;