const prompt = require('prompt-sync')();
const fetch = require("sync-fetch");
const _ = require("lodash");
//API for data on Countries
let response = fetch(
    " https://restcountries.com/v3.1/all" ,
    {"method": "GET"}
);
let data = response.json();
//API for genrating a random evil insult
let evilResponse = fetch(
    "https://evilinsult.com/generate_insult.php?lang=en&type=json",
     {"method": "GET"}
);
let evilData = evilResponse.json();
//API for generating a random piece of advice
let adviceResponse = fetch(
    " https://api.adviceslip.com/advice",
      {"method": "GET"}
 );
 let adviceData = adviceResponse.json();

//***  "FRONT END" CODE STARTS HERE  ***
let openingLine = "February is the month of LOOOOOVE. But...it's almost over...";
console.log(openingLine);
let loveAnsw = prompt("Did you find love this year? Enter 1 if you're SINGLE. Enter 2 if you're TAKEN.");

while (loveAnsw !== "1" && loveAnsw !== "2"){
    loveAnsw = prompt("Did you find love this year? Enter 1 if you're SINGLE. Enter 2 if you're TAKEN.");
};

if(loveAnsw === "1"){
    console.log("Ouch. A Lonely Bird huh? That's ok, there are lonely birds all over the world!");
    let country = _.startCase(prompt("In what country do you live?"));
    //console.log(data); <--checking that country data comes through
    let countryCodes = {};
    let countryCode = "";
    
    for (let i = 0; i < data.length; i++){
        countryCodes[data[i].name.common.trim()] = data[i].cca2; 
    };
    countryCode = (countryCodes[country]);
    //console.log(countryCode); <--checking that the loop successfully created a country code
    let generateURL = `https://api.ebird.org/v2/data/obs/${countryCode}/recent`;
    //console.log(generateURL); <-- checking that new URL was successfully created
    response = fetch(
         generateURL,
         {"method": "GET", "headers":{"x-ebirdapitoken": "vkavmp7fl93l"}}
    ); 
    data = response.json();
    //console.log(data); <-- checking that all the data from the specififed country was received 
    let numOfSingles = 0;
    let singBirdNames = {};
    let locInfo = {};
    for (i = 0; i < data.length; i++){
        if (data[i].howMany === 1){
        numOfSingles += 1;
        singBirdNames[numOfSingles] = data[i].comName;
        locInfo[numOfSingles] =`They were last seen at Latitude ${data[i].lat} and Longitude ${data[i].lng}.`;
        };
    };
    if(numOfSingles === 0){
        console.log("I'm sorry, either that's not a country or there just aren't any single birds there..");
        console.log("Oh, and by the way....");
        console.log(evilData.insult);
    }
    else{console.log(`I see there are ${numOfSingles} other lonely birds in ${country}.`);
        let introAns = prompt("Would you like me to introduce you to them? Enter 1 for YES. Enter 2 for NO.")
        if(introAns === "1"){
            console.log(singBirdNames);
            console.log(`See?! Plenty of soaring singles to meet! These are all the MOST RECENT RECORDED sightings of every bird species in the ${country} that was alllllll alone. `)
            let numBirdToFind = prompt("Enter the number to the left of the bird's name to find out EXACTLY where you might find them!");
            console.log(`You're looking for the ${singBirdNames[numBirdToFind]}.`);
            console.log(locInfo[numBirdToFind]);
            console.log("Good luck! Let me leave you with a bit of advice...");
            console.log(adviceData.slip.advice);
        }
        else if (introAns === "2"){
            console.log("Fine, be single forever.");
            console.log("Oh, and by the way....");
            console.log(evilData.insult);
            console.log("bye")
         }
        else{
             console.log("Can't type a simple 1 or 2? Yikes");
             console.log("Let me give you a little piece of advice...")
                console.log(adviceData.slip.advice);
                console.log("bye");
         };
    };
};


if (loveAnsw ==="2"){
    console.log("Taken eh? Wow love must really be in the air where you live!");
    let country = _.startCase(prompt("In what country do you live?"));
    let countryCodes = {};
    let countryCode = "";
    for (let i = 0; i < data.length; i++){
        countryCodes[data[i].name.common.trim()] = data[i].cca2; 
    };
    countryCode = (countryCodes[country]);
    let generateURL = `https://api.ebird.org/v2/data/obs/${countryCode}/recent`;
    response = fetch(
         generateURL,
         {"method": "GET", "headers":{"x-ebirdapitoken": "vkavmp7fl93l"}}
    ); 
    data = response.json();
    let numOfDoubles = 0;
    let doubBirdNames = {};
    let locInfo = {};
    for (i = 0; i < data.length; i++){
        if (data[i].howMany === 1){
        numOfDoubles += 1;
        doubBirdNames[numOfDoubles] = data[i].comName;
        locInfo[numOfDoubles] =`They were last seen at Latitude ${data[i].lat} and Longitude ${data[i].lng}.`;
        };
    };
    if(numOfDoubles === 0){
        console.log("I'm sorry, either that's not a country or there just aren't any single birds there..");
        console.log("Oh, and by the way....");
        console.log(evilData.insult);
    }
    else{
         console.log(`I see there are ${numOfDoubles} other couples of Love Birds in ${country}.`);
        let introAns = prompt("Would you like me to introduce you to them? Enter 1 for YES. Enter 2 for NO.")
        if(introAns === "1"){
            console.log(doubBirdNames);
            console.log(`Whoa! Look at all these Love Birds! These are all the MOST RECENT RECORDED sightings of every bird species in ${country} that was seen as a pair. `)
            let numBirdToFind = prompt("Enter the number to the left of the bird's name to find out EXACTLY where you might find this coo-ing couple!");
            console.log(`You're looking for the ${doubBirdNames[numBirdToFind]}.`);
            console.log(locInfo[numBirdToFind]);
            console.log("Good luck! Hope you find them!")
            console.log("Oh, and by the way....");
            console.log(evilData.insult);
        }
        else if(introAns === "2"){
            console.log("Fine, have fun being a boring reclusive couple.");
            console.log("Oh, and by the way....");
            console.log(evilData.insult);
        }
        else{
            console.log("Can't type a simple 1 or 2? Yikes");
            console.log("Let me give you a little piece of advice...")
            console.log(adviceData.slip.advice);
        };
    }
};

//next steps if i had more time:
//  use https://zylalabs.com/api-marketplace/travel/get+worldwide+airports+api/2120 to find lat/lng of airports around the world
//have user enter the nearest airport airport to them
//use the lat/lng of the bird they chose to locate the nearest aiport to that bird sighting
//once i found the closest airports to their take-off and destination, i would use https://www.adsbdb.com/, 
//an API database of scheduled flight routes to tell them the next avail flight to get them to to that bird
//comment