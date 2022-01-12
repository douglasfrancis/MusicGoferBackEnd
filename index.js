const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')
const app = express()
const port = 4000

var bodyParser = require('body-parser')

require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

const main = require('./Nodemailer')


const Artists = require('./models/ArtistSchema')
const Venues = require('./models/VenueSchema');
const Events = require('./models/EventSchema');

mongoose.connect(process.env.MONGODB_URI).then(
    ()=>{
        console.log("Connected to MongoDB")},
    (err)=>{
        console.log(err)
    });

app.post('/add-artist', async (req, res) => {
    const user = new Artists(req.body)
    
    await user.save()

    res.send("Successfully added")
})

app.post('/add-event', async (req, res) => {
    const event = new Events(req.body)
    
    await event.save()

    res.json({event, msg:"Successfully added"})
})

app.get('/get-events', async (req, res)=>{
    const list = await Events.find();
    res.send(list)
})

app.post('/get-events-by-date-range', async (req, res)=>{
    let {dateFrom, dateTo} = req.body;
    console.log(req.body)

    const events = await Events.find({   "date": {"$gte": dateFrom, "$lte": dateTo}   }, 'date artist venueName artistFee venueFee').exec();
    res.send(events)
})

app.get('/get-artists', async(req,res) =>{
    const list = await Artists.find();
    res.send(list)
})

app.post('/update-artist', async(req,res) =>{

    const {id, payload} = req.body
    await Artists.findByIdAndUpdate( id, payload);
    res.send("Successfully updated")
})

app.post('/update-venue', async(req,res) =>{

    const {id, payload} = req.body
    await Venues.findByIdAndUpdate( id, payload);
    res.send("Successfully updated")
})
app.get('/get-venues', async(req,res) =>{
    const list = await Venues.find();
    res.send(list)
})

app.post('/get-venue-by-id', async(req,res) =>{
    Venues.findById(req.body.id, function (err, venue) {
        if(err){
            console.log(err)
        } else {
            res.send(venue)
        }
    });
    
})

app.post('/add-venue', async (req, res) => {
    const venue = new Venues(req.body)
    
    await venue.save()

    res.send("Successfully added")
})

//Nodemailer
app.post('/new-event', async (req, res) => {
    const booking = (req.body)
    try{
        await main(booking)
        res.json({success: true, msg: "Email successfuly sent"})
    } catch(e){
        console.log(e)
        res.json({success: false, msg: "Error sending email"})
    }
   
})

app.post('/update-event', async(req,res) =>{

    const {id, payload} = req.body
    await Events.findByIdAndUpdate( id, payload);
    res.send("Successfully updated")
})

app.post('/delete-event', async(req,res) =>{

    const {id} = req.body
    await Events.findByIdAndDelete(id);
    res.send("Successfully Deleted")
})

app.post('/confirm-gig', async(req,res) =>{

    const {id, data} = req.body
    await Events.findByIdAndUpdate( id, data);
})

app.post('/decline-gig', async(req,res) =>{

    const {id, data} = req.body
    await Events.findByIdAndUpdate( id, data);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})