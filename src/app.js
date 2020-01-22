const path =require('path')
const express= require("express")
const hbs=require('hbs')
const request = require("request")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")



const app = express()
 
// Define paths for express coding
const publicDirPath=path.join(__dirname, "../public")
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
// setup handlebars engine and views location
app.set("view engine",'hbs')
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)
 

// Setup static directory to server
app.use(express.static(publicDirPath))
app.get("",(req,res)=>{
    res.render('index',{
        title:"Weather app",
        name:"Mudabir"
    })
})

app.get("/about",(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Mudabir"
    })
})
app.get("/help",(req,res)=>{
    res.render('help',{
        helptext:"Help Paragragh",
        title:"help",
        name:"Mudabir"
    })
})


app.get("/weather",(req,res) => {
    if (!req.query.address){
        return res.send({
            error:"No Address Present"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{

        if (error){
          return res.send({error}) 
        }
        
        // forecast(data.latitude, data.longitude, (error, forecastData) => {
            forecast(latitude, longitude, (error, forecastData) => {    
            if (error){
                return res.send({error}) 
            }
            res.send({
                forecast:forecastData,
                location ,
                address: req.query.address,
            })
           
         })
    })
    
    
})

app.get("/help/*",(req,res) => {
    res.render('404',{
        errorMessage:"Article not Found",
        title:"404",
        name:"Mudabir"
    })
})

app.get("*",(req,res) => {
    res.render('404',{
        errorMessage:"Page not Found",
        title:"404",
        name:"Mudabir"
    })
})
app.listen(3000,()=>{
    console.log('Server is Up on 3000')
}) 