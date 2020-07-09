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
userSchema.plugin(findOrCreate);

const userData = mongoose.model("userData", userDataSchema)
const user = mongoose.model("user", userSchema)

app.post("/login", (req, res) => {
    const {name, email} = req.body
    const newUser = new user({
        email: email,
        name: name,
        userData: []
    })
    user.find({ email:email }, (err,userData)=>{
        if(!userData.length){
            newUser.save()
            console.log("not found creating new")
        }else{
           res.send(userData)
        }
    });

})


app.listen(8080, () => {
    console.log("app listening 8080")
})