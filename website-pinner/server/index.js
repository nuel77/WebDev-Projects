const express = require("express")
const bodyParser = require('body-parser');
const cors = require("cors")
const findOrCreate = require('mongoose-findorcreate')
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://emmanuel:9495112289@cluster0-j7mp0.mongodb.net/webpager?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err) => {
    console.log("connection to mongodb error:", err)
});

const userDataSchema = new mongoose.Schema({
    url: String,
    title: String,
    description: String,
    category: String
})

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    userData: [userDataSchema]
})

const userData = mongoose.model("userData", userDataSchema)
const User = mongoose.model("User", userSchema)

app.post("/login", (req, res) => {
    console.log("login endpoint hit")
    const {name, email} = req.body
    console.log(name, email)
    const newUser = new User({
        email: email,
        name: name,
        userData: []
    })
    User.find({email: email}, (err, userData) => {
        if (!userData.length) {
            newUser.save()
            console.log("not found creating new")
            res.send({success: true})
        } else {
            console.log("found!")
            res.send({success: true})
        }
    });

})
app.post("/getUser", (req, res) => {
    const email = req.body.email;
    User.find({email: email}, (err, userData) => {
        res.send(userData)
    })
})

app.post("/updateData", (req, res) => {
    const {email, urlData} = req.body
    let dataToPush = new userData({...urlData})
    User.updateOne({email: email}, {$push: {userData: dataToPush}}, (err, resp) => {
        if (!err) {
            res.send({status: true})
        } else {
            res.send({status: false})
        }
    })
})
app.post("/deleteLink", (req, res) => {
    console.log("deleteLink endpoint")
    const {email, id} = req.body
    User.updateOne({email: email}, {$pull: {userData: {_id: id}}}, (err, resp) => {
        if (!err) {
            res.send({status: true})
        } else {
            res.send({status: false})
        }
    })
})


app.listen(8080, () => {
    console.log("app listening 8080")
})