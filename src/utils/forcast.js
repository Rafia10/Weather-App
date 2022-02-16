const request=require("request")
const forcast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=0b22d082ef26345da892cc59ff6bc165&query='+latitude+","+longitude+'&unit=f'
//console.log(url)
    request({url:url,json:'true'},(error,response)=>{
        if(error){
            callback("Invalid Url",undefined)
          }
        else if(response.body.error){
            callback("Something went wrong",undefined)
        }
        else{
            callback(undefined,"current weather is "+" "+response.body.current.weather_descriptions[0]+" "+"but feels like"+ " "+response.body.current.feelslike+" "+response.body.current.humidity+"% chance of rain")
        }
    })

}
module.exports=forcast;