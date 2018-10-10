//used for reading .env file
require('dotenv').config()
var Spotify = require('node-spotify-api');
//reads keys from .env file
var keys=require("./keys.js");
var Twitter = require('twitter');
var request = require('request');
var fs = require("fs");


//reading command line args
var command=process.argv[2];
var arg=process.argv.slice(3).join(" ");
logFile("\nCommand: "+command+" ");

//initializing spotify and twitter
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);
var url;

//calling the main function for program to run once
main();
function main() {

    switch(command) {

        case "my-tweets":
            tweetThis();
            break;
        case "spotify-this-song":
            if(arg==="") {
                logFile("\n");
                console.log("no arg");
                url="https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE";
            } else {
                logFile(arg+"\n");
                url="https://api.spotify.com/v1/search?type=track&q="+arg;
            }
            
            spotifyThis();
            break;
        case "movie-this":
            if(arg==="") {
                logFile("\n");
                url="http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey="+keys.omdb.id;
            } else {
                logFile(arg+"\n");
                url="http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey="+keys.omdb.id;
            }
        
            movieThis();
            
            break;
        case "do-what-it-says":
            readFile();
            break;
        default:
            console.log("invalid command");
            break;

    }

}

function spotifyThis() {

    spotify.request(url).then(function(response) {
  
        if(arg==="") {
            console.log("Artist(s): "+response.artists[0].name);
            console.log("Name of the Song: "+response.name);
            console.log("Preview URL: "+response.preview_url);
            console.log("Album Name: "+response.album.name);

            logFile("\nArtist(s): "+response.artists[0].name+"\nName of the Song: "+response.name+
            "\nPreview URL: "+response.preview_url+"\nAlbum Name: "+response.album.name+
            "\n-------------------------------------\n");
           //console.log(response);
        } else {
            var tracks= response.tracks.items;
            for(var i=0; i<tracks.length;i++) {
                console.log("Result "+(i+1)+":");
                console.log("Artist(s): "+tracks[i].artists[0].name);
                console.log("Name of the Song: "+tracks[i].name);
                console.log("Preview URL: "+tracks[i].preview_url);
                console.log("Album Name: "+tracks[i].album.name);
                console.log("-----------------------------------------\n");

                logFile("\nResult "+(i+1)+":\nArtist(s): "+tracks[i].artists[0].name+
                "\nName of the Song: "+tracks[i].name+"\nPreview URL: "+tracks[i].preview_url+
                "\nAlbum Name: "+tracks[i].album.name+"\n-----------------------------------------\n");
            }
            
        }
    
    })
    .catch(function(err) {
        console.log(err);
    });
      
}

function tweetThis(){

    twitter.get('statuses/user_timeline', {count:20})
    .then(function (tweet) {
       
        for(var i=0; i<tweet.length; i++) {
            console.log(tweet[i].text);
            console.log(tweet[i].created_at);

            logFile("\n"+tweet[i].text+"\n"+tweet[i].created_at);
        }
        console.log("\n-----------------------------------------\n");
    })
    .catch(function (error) {
            throw error;
    })
}

function movieThis() {

    request(url, function(error, response, body) {

        
        if (!error && response.statusCode === 200) {
            
            console.log("Title: "+ JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Rating: "+ JSON.parse(body).Rated);

            logFile("\nTitle: "+ JSON.parse(body).Title+"\nRelease Year: " + JSON.parse(body).Year+
            "\nRating: "+ JSON.parse(body).Rated);
            try {
                console.log("Rotter Tomatoes Rating: "+ JSON.parse(body).Ratings[1].Value);
                logFile("\nRotter Tomatoes Rating: "+ JSON.parse(body).Ratings[1].Value);
            }
            catch {
                console.log("Rotter Tomatoes Rating: NO DATA FOUND ");
                logFile("\nRotter Tomatoes Rating: NO DATA FOUND ");
            }
            
            console.log("Production Country: "+ JSON.parse(body).Country);
            console.log("Language: "+ JSON.parse(body).Language);
            console.log("Movie Plot: "+ JSON.parse(body).Plot);
            console.log("Cast: "+ JSON.parse(body).Actors);

            logFile("\nProduction Country: "+ JSON.parse(body).Country+"\nLanguage: "+ JSON.parse(body).Language+
            "\nMovie Plot: "+ JSON.parse(body).Plot+"\nCast: "+ JSON.parse(body).Actors);
            console.log("\n-----------------------------------------\n");
        }
    });
}

function readFile() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
      
        
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        command=dataArr[0];
        arg=dataArr[1];
        
        main();
      
      });
}

function logFile(data) {
   
    fs.appendFile("log.txt", data, function(err) {

        // If an error was experienced we will log it.
        if (err) {
          console.log(err);
        }
      
      });
}
 
