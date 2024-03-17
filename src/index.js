const express=require('express');

// To access weather API
const https=require('https');
// to handle post
const bp=require('body-parser'); 

const app=express();
app.use(bp.urlencoded({extended : true}));
// To serve files from public folder
app.use(express.static("public"));         

app.post("/",function(req,res)
{
    const cityName=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=4d57d2e352425c551e50f38fd09a7457";
    // to get data from api
    
    // use get method from https module
    https.get(url,function(response) {
        response.on("data",function(data)
        {
           // data will be in Hexadecimal form
           // Converting to JavaScript
           const d=JSON.parse(data);

           // accessing the properties given by API.
            const temp=d.main.temp;
            const des=d.weather[0].description;
            const icon=d.weather[0].icon
            res.write("<p> The weather condition is "+ des +"</p>");
            res.write("<h1> The tempurature is "+ temp +"</h1>");
            const url2="http://openweathermap.org/img/wn/"+icon +"@2x.png";
            res.write("<img src="+ url2 + "> ");
            res.send();
        })
    });

});

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
});

// to listen to port 3000
app.listen(3000,function()
{
    console.log("server started!")
});