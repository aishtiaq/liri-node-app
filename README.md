# liri-node-app

This is a node.js app.

This program demonstrates the use of spotify, twitter, fs, request, and dotenv npm packages.

To run, 

1. create a .env file with the following info. Enter your own keys.

# Spotify API keys

SPOTIFY_ID=""
SPOTIFY_SECRET=""

# Twitter API keys

TWITTER_CONSUMER_KEY=""
TWITTER_CONSUMER_SECRET=""
TWITTER_ACCESS_TOKEN_KEY=""
TWITTER_ACCESS_TOKEN_SECRET=""

#OMDB API keys

OMDB_API=""

2. Run "npm install" to download all the packages.

3. Commands the program takes
    -node.js spotify-this-song <song name>
    -node.js movie-this <movie name>
    -node.js my-tweets
    -node.js do-what-it-says