const { Op } = require("sequelize");
const cors=require('cors')
const path = require('path')
require('dotenv').config();
const express = require("express");
const app = express();
app.use(cors())
//Heroku
//app.use(express.static(path.join(__dirname,'build')))
const port = 5000;
//Heroku
//const port = process.env.PORT

const sequelize = require("./sequelize.js");

const Meeting = require("./models/meeting");
const Participant = require("./models/participant");

Meeting.hasMany(Participant, { as: "Participants", foreignKey: "meetingId" });
Participant.belongsTo(Meeting, { foreignKey: "meetingId" })

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.listen(port, () => {
    console.log("The server is running on http://localhost:" + port);
});

app.use((err, req, res, next) => {
    console.error("[ERROR]:" + err);
    res.status(500).json({ message: "500 - Server Error" });
});

//Create Database
app.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'table created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

//utils functions
const sortMeetings = (a, b) => {
    var descriptionA = a.description.toUpperCase();
    var descriptionB = b.description.toUpperCase();
    if (descriptionA <= descriptionB) {
        return -1;
    }
    if (descriptionA > descriptionB) {
        return 1;
    }

    return 0;
}

//api calls Primary entity
app.get('/meetings', async (req, res) => {
    try {
        const meetings = await Meeting.findAll()
        res.status(200).json(meetings)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

//Sorting alphabetically on the description field
app.get('/meetingsSorted', async (req, res) => {
    try {
        const meetings = await Meeting.findAll()
        meetings.sort(sortMeetings)
        res.status(200).json(meetings)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/meetings', async (req, res, next) => {
    try {

        await Meeting.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/meetings/:mid', async (req, res) => {
    try {
        const meeting = await Meeting.findByPk(req.params.mid)
        if (meeting) {
            await meeting.update(req.body, { fields: ['description', 'link', 'meetingDate'] })
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.delete('/meetings/:mid', async (req, res) => {
    try {
        const meeting = await Meeting.findByPk(req.params.mid)
        if (meeting) {
            await meeting.destroy()
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/meetings/:mid', async (req, res) => {
    try {
        const meeting = await Meeting.findByPk(req.params.mid)
        if (meeting) {
            res.status(200).json(meeting)

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})



//api calls Secondary entity
app.get('/participants', async (req, res) => {
    try {
        const participant = await Participant.findAll()
        res.status(200).json(participant)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/participants', async (req, res, next) => {
    try {
        await Participant.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/participants/:pid', async (req, res) => {
    try {
        const participant = await Participant.findByPk(req.params.pid)
        if (participant) {
            await participant.update(req.body, { fields: ['name', 'meetingId'] })
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.delete('/participants/:cid', async (req, res) => {
    try {
        const participant = await Participant.findByPk(req.params.cid)
        if (participant) {
            await participant.destroy()
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.get('/participants/:pid', async (req, res) => {
    try {
        const participant = await Participant.findByPk(req.params.pid)
        if (participant) {
            res.status(200).json(participant)

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

//api calls for Secondary entity as a child resource
app.get('/meetings/:mid/participants', async (req, res) => {
    try {
        const meeting = await Meeting.findByPk(req.params.mid)
        if (meeting) {
            const participant = await meeting.getParticipants()
            res.status(200).json(participant)
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/meetings/:mid/participants', async (req, res) => {
    try {
        const meeting = await Meeting.findByPk(req.params.mid)
        if (meeting) {
            const participant = req.body
            participant.meetingId = meeting.id
            await Participant.create(participant)
            res.status(200).json({ message: 'created' })
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/meetings/:mid/participants/:pid', async (req, res) => {
    try {
        const meeting = await Meeting.findByPk(req.params.mid)
        if (meeting) {
            const participants = await meeting.getParticipants({ id: req.params.pid })
            var participant = null
            for (var i = 0; i < participants.length; i++) {
                if (participants[i].id == req.params.pid) {
                    participant = participants[i];
                }
            }
            if (participant) {
                participant.name = req.body.name;
                await participant.save();
                res.status(202).json({ message: "accepted" })
            } else {
                res.status(404).json({ message: "not found" })
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.delete('/meetings/:mid/participants/:pid', async (req, res) => {
    try {
        const meeting = await Meeting.findByPk(req.params.mid)
        if (meeting) {
            const participants = await meeting.getParticipants({ id: req.params.pid })
            var participant = null
            for (var i = 0; i < participants.length; i++) {
                if (participants[i].id == req.params.pid) {
                    participant = participants[i];
                }
            }
            if (participant) {
                await participant.destroy()
                res.status(202).json({ message: "accepted" })
            } else {
                res.status(404).json({ message: "not found" })
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

// filtering: gets all meetings after a certain year which contain the entered substring in the description field

app.get('/meetingsFilter/:mdescription/:myear', async (req, res) => {

    const referenceDate = new Date(`${req.params.myear}-01-01`);
    try {
        const meetings = await Meeting.findAll(
            {
                where: {
                    description: {
                        [Op.substring]: req.params.mdescription
                    },
                    meetingDate: {
                        [Op.gte]: referenceDate
                    }
                }
            }
        )
        //meetings.sort(sortMeetings)
        res.status(200).json(meetings)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})