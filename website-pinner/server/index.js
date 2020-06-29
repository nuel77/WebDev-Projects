const express= require("express")
const passport=require("passport")
const cors= require("cors")
const app= express()
app.use(cors())


app.listen(8080,()=>{console.log("app listening 8080")})