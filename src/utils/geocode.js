const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaHVtbXVzYWxtYSIsImEiOiJjbGxuYndjOTcxdm12M2VyNmtpaW4wejA1In0.ZCIszfZxKOtwY28zfgyx6A&limit=1'
    request({url, json : true},(error,{ body})=>{
        if(error){
            callback("Unable to fetch MapBox",undefined)
        }else if (body.features.length === 0){
            callback("Unable to find the location",undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}
module.exports=geocode