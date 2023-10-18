const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000


const app = express()

//Define path fro express config
const directory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//To set up the connection with express and hbs(handlebars)
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(directory))


app.get('',(req,res)=>{
    res.render('index',{
        title : "Weather App",
        name : "salma"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : "About Page",
        name : "salma"
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        msg : "Help page to render some help",
        title : "Help Page",
        name : 'salma'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send("You must Provide an address for the weather to search")
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error})
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                return read.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})


app.get('/product',(req,res)=>{
    if(!req.query.search){
        return  res.send({ error : "You must provide the search term"})
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title :"404",
        name : "salma",
        errmsg : "Help article not found"
    })
})

//To display 404 for the pages that doesnt exist by explicitly
//* symbol from express let's us to match the pages which arent matched before
app.get('*',(req, res)=>{
    res.render('404',{
        title:"404",
        errmsg :"Page not found",
        name : "salma"
    })
})

app.listen(port,()=>{
    console.log("server is running on the port " + port)
})