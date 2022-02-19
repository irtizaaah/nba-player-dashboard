function searchPlayer(){
    let playerName;
    let playerFirstName;
    let playerLastName;
    let playerId;
    let nbaPlayerList;
    let specificPlayerFromNbaPlayerList;
    let playerIdForImage;
    let playerBio;
    let playerStats;
    let year = new Date().getFullYear() - 1;
    // nba api: "https://data.nba.net/data/10s/prod/v1/" + year + "/players/" + "1629630" + "_profile.json"
    // ttps://data.nba.net/data/10s/prod/v1/2021/teams.json

    playerName = document.querySelector(".search_bar-text").value;

    async function fetchEverything() {
        try {
            const response = await fetch("https://www.balldontlie.io/api/v1/players?search=" + playerName); // returns promise
            const obj = JSON.parse(await response.text()); // converts value in promise to JSON
            playerId = obj.data[0].id; // finds specific value
        }
        catch (err) {
            console.log("fetch failed", err);
        }

        try {
            const response = await fetch("https://www.balldontlie.io/api/v1/players?search=" + playerName); // returns promise
            const obj = JSON.parse(await response.text()); // converts value in promise to JSON
            playerId = obj.data[0].id; // finds specific value
        }
        catch (err) {
            console.log("fetch failed", err);
        }

        try {
            const response = await fetch("https://www.balldontlie.io/api/v1/players?search=" + playerName); // returns promise
            const obj = JSON.parse(await response.text()); // converts value in promise to JSON
            playerFirstName = obj.data[0].first_name; // finds specific value
            playerLastName = obj.data[0].last_name; // finds specific value
        }
        catch (err) {
            console.log("fetch failed", err);
        }
    
        try {
            const response = await fetch("https://www.balldontlie.io/api/v1/players/" + playerId); // returns promise
            const obj = JSON.parse(await response.text()); // converts value in promise to JSON
            playerBio = obj; // finds specific value
        }
        catch (err) {
            console.log("fetch failed", err);
        }

        try {
            const response = await fetch("https://www.balldontlie.io/api/v1/season_averages?player_ids[]=" + playerId); // returns promise
            const obj = JSON.parse(await response.text()); // converts value in promise to JSON
            playerStats = obj.data[0]; // finds specific value
            console.log(playerStats);
        }
        catch (err) {
            console.log("fetch failed", err);
        }

        try {
            const response = await fetch("http://data.nba.net/data/10s/prod/v1/" + year + "/players.json"); // returns promise
            const obj = JSON.parse(await response.text()); // converts value in promise to JSON
            nbaPlayerList = obj.league.standard; // finds specific value
            specificPlayerFromNbaPlayerList = nbaPlayerList.filter(
                    function(nbaPlayerList){
                        return (nbaPlayerList.firstName == playerFirstName && nbaPlayerList.lastName == playerLastName)
                    });
            
            playerIdForImage = specificPlayerFromNbaPlayerList[0].personId;
        }
        catch (err) {
            console.log("fetch failed", err);
        }

        document.querySelector(".player_bio-position").innerHTML = playerBio.position;
        document.querySelector(".player_bio-team").innerHTML = playerBio.team.full_name;
        document.querySelector(".player_bio-height").innerHTML = playerBio.weight_pounds;
        document.querySelector(".player_bio-weight").innerHTML = playerBio.height_feet + "\'" + playerBio.height_inches + "\"";
        
        for (var i = 0; i <= Math.round(playerStats.pts); i++) {
            (function(index) {
                setTimeout(function (){document.querySelector(".player_stats-points").innerHTML = index}, i*35);
            })(i);
        }

        for (var i = 0; i <= Math.round(playerStats.ast); i++) {
            (function(index) {
                setTimeout(function (){document.querySelector(".player_stats-assists").innerHTML = index;}, i*35);
            })(i);
        }

        for (var i = 0; i <= Math.round(playerStats.stl); i++) {
            (function(index) {
                setTimeout(function (){document.querySelector(".player_stats-steals").innerHTML = index;}, i*35);
            })(i);
        }

        for (var i = 0; i <= Math.round(playerStats.blk); i++) {
            (function(index) {
                setTimeout(function (){document.querySelector(".player_stats-blocks").innerHTML = index;}, i*35);
            })(i);
        }

        document.querySelector(".player_header-image").src = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + playerIdForImage + ".png"; 
        document.querySelector(".name-first").innerHTML = playerFirstName; 
        document.querySelector(".name-last").innerHTML = playerLastName; 

    }

    fetchEverything();
    
}

document.querySelector(".search_bar-button").addEventListener("click", searchPlayer);