const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const { log } = require("console");


const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const cityName=req.body.CityName;
    
    var locationkey={
        'Dhaka':'281433',
        'Kinshasa':'113487',
        'Santiago':'60449',
        'Beijing':'101924',
        'Bogota':'107487',
        'Berlin':'178087',
        'Cairo':'127164',
        'Madrid':'308526',
        'London':'328328',
        'Athens':'182536',
        'Hong Kong':'1123655',
        'Jakarta':'208971',
        'Baghdad':'207375',
        'Tokyo':'226396',
        'Pyongyang':'225058',
        'Seoul':'226081',
        "Mexico City":"242560",
        "Lima": "264120",        
        "Moscow": "294021",        
        "Riyadh": "297030",        
        "Singapore": "300597",        
        "Bangkok": "318849",
        
        "Hanoi":"353412",
        
        "Sydney":"22889",
        
        "Melbourne":"26216",
    
        "Rio de Janeiro":"45449",
        "Shanghai": "106577",
         
         
        "Delhi": "202396",
         
        "Bengaluru": "204108",
         
        "Mumbai": "204842",
         
        "Chennai":"206671",
         
        "Kolkata": "206690",
         
        "Busan": "222888",
         
        "Yangon": "246562",
         
        "Karachi": "261158",
         
        "Saint Petersburg": "295212",
         
        "Istanbul": "318251",
         
        "Ho Chi Minh City": "353981",
         
        "Johannesburg": "305448",
         
        "Lagos": "4607",
         
        "Los Angeles": "347625",
         
        "New York": "349727",
         
        "Kabul": "4361",
         
        "Yerevan": "16890",
         
        "Luanda": "4651",
         
        "Buenos Aires": "7894",
         
        "Vienna": "31868",
         
        "Sofia": "51097",
         
        "Brasília": "43348",
         
        "Minsk": "28580",
         
        "Ottawa": "55487",
         
        "Havana": "122438",
         
        "Prague": "125594",
         
        "Santo Domingo": "125887",
         
        "Algiers": "2093",
         
        "Quito": "129846",
         
        "Paris": "623",
         
        "Tbilisi": "171705",
         
        "Port-au-prince": "189891",
         
        "Budapest": "187423",
         
        "Tehran": "210841",
         
        "Rome": "213490",
         
        "Nairobi": "224758",
         
        "Phnom Penh": "49785",
         
        "Nur-Sultan": "222343",
         
        "Rabat": "245072",
         
        "Ulan Bator": "246421",
         
        "Kuala Lumpur": "233776",
         
        "Manila": "264885",
         
        "Warsaw": "274663",
         
        "Bucharest": "287430",
         
        "Belgrade": "298198",
         
        "Khartoum": "308406",
         
        "Dakar": "297442",
         
        "Mogadishu": "297120",
         
        "Taipei City": "315078",
         
        "Kyiv": "324505",
         
        "Montevideo": "349269",
         
        "Tashkent": "351199",
         
        "Caracas": "353020",
         
        "Sana'a": "355809",
         
        "Cape Town": "306633",
         
        "Harare": "353558",
         
        "Perth": "26797",
         
        "Manaus": "42471",
         
        "Recife": "45090",
         
        "Sao Paulo": "45881",
        
        "Toronto": "55488",
         
        "Abidjan": "113725",
         
        "Barcelona": "307297",
         
        "Osaka-shi": "225007",
         
        "Auckland": "252066",
         
        "Novosibirsk":"294459",
 
        "Aleppo": "313468",
         
        "Dar es Salaam": "317663",
         
        "Montreal": "56186",
         
        "Jeddah": "299429",
         
        "Chicago": "348308",
         
        "Dallas": "351194",
         
        "Abu Dhabi":"321626",
         
        "Tirana": "6522",
         
        "La Paz": "33655",
         
        "San Jose": "115295",
         
        "Copenhagen": "123094",
         
        "Tallinn": "127964",
         
        "Helsinki": "133328",
         
        "Dublin": "207931",
         
        "Jerusalem": "213225",
         
        "Kingston": "214971",
         
        "Colombo": "311399",
         
        "Vilnius":"231459",
         
        "Riga": "225780",
         
        "Tripoli": "230555",
         
        "Amsterdam": "249758",
         
        "Oslo": "254946",
         
        "Kathmandu": "241809",
         
        "Panama City": "259549",
         
        "Port Moresby": "258848",
         
        "Islamabad": "258278",
         
        "San Juan": "275478",
         
        "Lisbon": "274087",
         
        "Asuncion": "257012",
         
        "Stockholm": "314929",
         
        "Bratislava": "297345",
         
        "San Salvador": "130669",
         
        "Dushanbe": "313854",
         
        "Ashgabat": "317036",
         
        "Tunis": "321398",
         
        "Tel Aviv": "215854",
         
        "Hyderabad": "202190",
         
        "Denver": "347810",
         
        "Honolulu": "348211",
         
        "Vancouver": "53286",
         
        "Anchorage": "346835",
         
        "San Francisco": "347629",
         
        "Miami": "347936",
         
        "Seattle": "351409",
         
        "St. John's": "355989",
         
        "Brussels": "27581",
         
        "Bujumbura": "47205",
         
        "Reykjavik": "190390",
         
        "Vientiane": "361929",
         
        "Male": "5003",
         
        "Wellington": "250938",
         
        "Paramaribo": "309398",
         
        "Dili": "3484",
         
        "Banda Aceh": "205110",
         
        "Nicosia": "124697",
         
        "Gibraltar": "178535",
         
        "Pago Pago": "2094",         

    }
    const id=locationkey[cityName];
    const apikey="MG6ZcVkFKgXbvpd4Ychl68ikacKGfLuO"
    const lang="en-us"
    const detail="true"
    const url="https://dataservice.accuweather.com/currentconditions/v1/"+id+"?apikey="+apikey+"&language="+lang+"&details="+detail
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const weatherDescription=weatherData[0].WeatherText;
            const tempC=weatherData[0].Temperature.Metric.Value;
            const tempFeel=weatherData[0].RealFeelTemperature.Metric.Value;
            const icon=weatherData[0].WeatherIcon;
            
            // if (icon<10){
            //     const imageURL="https://developer.accuweather.com/sites/default/files/0"+icon+"-s.png"
            // }
            // if (icon>10){
            //     const imageURL="https://developer.accuweather.com/sites/default/files/"+icon+"-s.png"
            // }
            const imageURL="https://developer.accuweather.com/sites/default/files/0"+icon+"-s.png"
            

            res.write("<p>The weather is currently "+weatherDescription+"</p>");
            res.write("<h1>The temperature in Hyderabad is "+tempC+" degree Celcius</h1>")
            res.write("<img src="+imageURL+"></img>")
            res.send();
        });
    })
    
});



   


app.listen(3000,function(){
    console.log("Server started at 3000");
})