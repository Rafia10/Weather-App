const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./src/utils/geocode')
const forecast = require('./src/utils/forcast')
const app=express()
//setup paths for express config
const directory=path.join(__dirname, '../Express/public')
const viewPath=path.join(__dirname,'./templates/views')
const PartialPath=path.join(__dirname,'./templates/partials')
console.log(viewPath)
//setup handlebars engine and view locations
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(PartialPath)
//setup static directory
app.use(express.static(directory))
app.get('',(req,res)=>{
res.render('home',{
    title:"Weather App",
    name:"Owned by Rafia Memon"
})
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}
			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}
				res.send({
					forecast: forecastData,
					location,
					address: req.query.address,
				});
			});
		}
	);
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About us",
        name:"owned by Rafia Memon"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"owned by Rafia Memon"
    })
})
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Request not found"
        })
        
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        Error:"Error 404 Page not Found"
    })
   
})
app.listen(3000)
// app.get("/contact",(req,res)=>{
//     res.send({//json Object
//         name:"Rafia",
//         age:22

//     })
// })
// app.get("/weather",(req,res)=>{
//     res.send([{//Array of objects
//         name:"Pakistan"
//     },
// {
//     name:"Los Angeles"
// }])
// })

