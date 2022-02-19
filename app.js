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
    let year = 2021;
    // nba api: "https://data.nba.net/data/10s/prod/v1/" + year + "/players/" + "1629630" + "_profile.json"

    playerName = document.querySelector(".search_bar-text").value;
    document.querySelector(".player_name").innerHTML = playerName;

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

        document.querySelector(".player_position").innerHTML = playerBio.position;
        document.querySelector(".player_team").innerHTML = playerBio.team.full_name;
        document.querySelector(".player_height").innerHTML = playerBio.weight_pounds;
        document.querySelector(".player_weight").innerHTML = playerBio.height_feet + "\'" + playerBio.height_inches + "\"";
        
        document.querySelector(".player_points").innerHTML = playerStats.pts;
        document.querySelector(".player_assists").innerHTML = playerStats.ast;
        document.querySelector(".player_steals").innerHTML = playerStats.stl;
        document.querySelector(".player_blocks").innerHTML = playerStats.blk; 

        document.querySelector(".player_image").src = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + playerIdForImage + ".png"; 

    }

    fetchEverything();
    
}

document.querySelector(".search_bar-button").addEventListener("click", searchPlayer);