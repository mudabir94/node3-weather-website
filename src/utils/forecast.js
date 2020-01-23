const request= require("request")

const forecast = (lat,long,callback) => {
    const url ='https://api.darksky.net/forecast/0d423de6243fb0e9a9d2b09f2c262324/'+lat+','+long+ '?units=si'
    request({url,json:true},(error,{body}) => {
        if (error){
            callback('Unable to connect to weather services!',undefined)
        }else if (body.error){
            callback("Unable to find location. Try another search.",undefined)
        }
        else {
            callback(undefined,body.daily.data[0].summary +"it is currently "+body.currently.apparentTemperature+" degrees out. The high today is "+body.daily.data[0].temperatureHigh +". The Low Today is "+body.daily.data[0].temperatureLow+". There is a " +body.currently.precipProbability+ " of rain. ")
        }
    })
}

module.exports=forecast