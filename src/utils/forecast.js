const request = require('request')
const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=7575d6242f74952bb8829a266f7b2c46&query='+latitude+','+longitude+'&units=f'
    request({url, json :true},(error,{body})=>{
       if(error){
            callback("Unable to fetch the weather Api",undefined)
       }else if(body.error){
            callback("Unable to find the location",undefined)
       }else{
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} out, and feelslike ${body.current.feelslike} out`)
       }
    })
}
module.exports = forecast