export async function getPlayer(fullName) {
    try {
        const response = await fetch("https://www.balldontlie.io/api/v1/players?search=" + fullName); // returns promise
        const obj = JSON.parse(await response.text()); // converts value in promise to JSON
        return obj.data[0];
    }
    catch (err) {
        console.log("fetch failed", err);
    }
}

export async function getBio(id) {
    try {
        const response = await fetch("https://www.balldontlie.io/api/v1/players/" + id); // returns promise
        const obj = JSON.parse(await response.text()); // converts value in promise to JSON
        return obj;
    }
    catch (err) {
        console.log("fetch failed", err);
    }
}

export async function getStats(id){
    try {
        const response = await fetch("https://www.balldontlie.io/api/v1/season_averages?player_ids[]=" + id); // returns promise
        const obj = JSON.parse(await response.text()); // converts value in promise to JSON
        
        return obj.data[0];
    }
    catch (err) {
        console.log("fetch failed", err);
    }
}

export async function getImage(firstName, lastName){
    try {
        const year = new Date().getFullYear() - 1;

        const response = await fetch("http://data.nba.net/data/10s/prod/v1/" + year + "/players.json"); // returns promise
        const obj = JSON.parse(await response.text()); // converts value in promise to JSON
        const nbaPlayerList = obj.league.standard; // finds specific value
        const specificPlayerFromNbaPlayerList = nbaPlayerList.filter(
                function(nbaPlayerList){
                    return (nbaPlayerList.firstName == firstName && nbaPlayerList.lastName == lastName)
                });
        
        const playerIdForImage = specificPlayerFromNbaPlayerList[0].personId;
        return "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + playerIdForImage + ".png";

    }
    catch (err) {
        console.log("fetch failed", err);
    }
}

export async function getPointsHistory(id){
    try {
        const year = new Date().getFullYear() - 1;

        const response = await fetch("https://www.balldontlie.io/api/v1/stats?seasons[]=" + year + "&player_ids[]=" + id + "&postseason=false"); // returns promise
        const obj = JSON.parse(await response.text()); // converts value in promise to JSON

        let pointsHistory = [obj.data[0].pts];
        
        for(let i = 1; i < obj.data.length; i++){
            pointsHistory.push(obj.data[i].pts);
        }

        pointsHistory = pointsHistory.filter(point => point > 0);

        return pointsHistory;

    }
    catch (err) {
        console.log("fetch failed", err);
    }
}

export async function getShots(id){
    try {
        const year = new Date().getFullYear() - 1;

        const response = await fetch("https://www.balldontlie.io/api/v1/season_averages?season=" + year + "&player_ids[]=" + id); // returns promise
        const obj = JSON.parse(await response.text()); // converts value in promise to JSON

        const cleanedObj = {
            fta : obj.data[0].fta,
            ftm : obj.data[0].ftm,
            
            fga : obj.data[0].fga,
            fgm : obj.data[0].fgm,

            fg3a : obj.data[0].fg3a, 
            fg3m : obj.data[0].fg3m
        }

        console.log(cleanedObj)

        return cleanedObj;

    }
    catch (err) {
        console.log("fetch failed", err);
    }
}



