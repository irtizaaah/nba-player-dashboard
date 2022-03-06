import NbaPlayer from "./nba-player.js";
import * as nbaAPI from "./nba-api.js";
import * as makeChart from "./make-chart.js"; 
import * as utility from "./utility.js"; 

document.addEventListener('DOMContentLoaded', function() {
    const year = new Date().getFullYear() - 1
    document.querySelector(".footer").innerHTML += " " + year;
}, false);

var input = document.querySelector(".search_bar-text");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.querySelector(".search_bar-button").click();
  }
});

function searchPlayer(){
    document.querySelector(".loading").style.visibility = "visible";
    let name = document.querySelector(".search_bar-text").value;
    let player = new NbaPlayer(name);
    let obj;
    let url;
    let list;

    let pointsHistory;
    let efficiencyTp;
    let efficiencyFg;
    let efficiencyFt;

    //let color = ["#FC4F4F","#9C0F48","#A73489","#FC4F4F"];

    async function getData() {

        // FETCH DATA
        obj = await nbaAPI.getPlayer(player.getFullName());
        player.setIdAndName(obj.id, obj.first_name, obj.last_name);
        document.querySelector(".loading").innerHTML = "Loading... 20%";

        obj = await nbaAPI.getBio(player.getId());
        player.setBio(obj.position, obj.team.full_name, obj.weight_pounds, obj.height_feet + "\'" + obj.height_inches + "\""); // finds specific value
        document.querySelector(".loading").innerHTML = "Loading... 40%";

        obj = await nbaAPI.getStats(player.getId());
        player.setStats(obj.pts, obj.ast, obj.stl, obj.blk);
        document.querySelector(".loading").innerHTML = "Loading... 60%";

        url = await nbaAPI.getImage(player.getFirstName(), player.getLasttName());
        player.setImage(url);
        document.querySelector(".loading").innerHTML = "Loading... 80%";

        list = await nbaAPI.getPointsHistory(player.getId());
        player.setPointsHistory(list);
        document.querySelector(".loading").innerHTML = "Loading... 100%";

        obj = await nbaAPI.getShots(player.getId());
        player.setShots(obj.fta, obj.ftm, obj.fga, obj.fgm, obj.fg3a, obj.fg3m);
        document.querySelector(".loading").innerHTML = "Loading... 60%";
        
        // VISIBILITY 
        document.querySelector(".loading").style.visibility = "hidden";
        document.querySelector(".loading").innerHTML = "Loading...";
        document.querySelector(".player_header").style.visibility = "visible";
        document.querySelector(".player_stats-container").style.visibility = "visible";
        document.querySelector(".points_history").style.visibility = "visible";
        document.querySelector(".efficiency").style.visibility = "visible";
        // document.querySelector(".player_header-block").style.background = "linear-gradient(-45deg, " + color[0] + "," + color[1] + "," + color[2] + "," + color[3];
        // document.querySelector(".player_header-block").style.backgroundSize = "300%";
        // document.querySelector(".player_header-block").style.animation = "animated_color 10s ease-in-out infinite";

        // DISPLAY DATA
        document.querySelector(".player_bio-position").innerHTML = player.getPosition();
        document.querySelector(".player_bio-team").innerHTML = player.getTeam();
        document.querySelector(".player_bio-height").innerHTML = player.getHeight();
        document.querySelector(".player_bio-weight").innerHTML = player.getWeight();

        document.querySelector(".player_header-image").src = player.getImage(); 
        document.querySelector(".name-first").innerHTML = player.getFirstName(); 
        document.querySelector(".name-last").innerHTML = player.getLasttName(); 

        utility.countAnimation(".points-value", player.getPoints(), 50);
        utility.countAnimation(".assists-value", player.getAssits(), 300);
        utility.countAnimation(".steals-value", player.getSteals(), 800);
        utility.countAnimation(".blocks-value", player.getBlocks(), 800);

        pointsHistory = makeChart.historyChart(player.getPointsHistory(), ".points_history-chart", "Point History");
        efficiencyTp = makeChart.efficiencyChart(player.getThreePointersAttempted(), player.getThreePointersMade(), ".tp-chart", "3 Pointers");
        efficiencyFg = makeChart.efficiencyChart(player.getFieldGoalsAttempted(), player.getFieldGoalsMade(), ".fg-chart", "Field Goal");
        efficiencyFt = makeChart.efficiencyChart(player.getFreeThrowsAttempted(), player.getFreeThrowsMade(), ".ft-chart", "Free Throw");
        
        document.querySelector(".tp-percentage").innerHTML = Math.round((player.getThreePointersMade()/player.getThreePointersAttempted())*100) + "%"; 
        document.querySelector(".fg-percentage").innerHTML = Math.round((player.getFieldGoalsMade()/player.getFieldGoalsAttempted())*100) + "%"; 
        document.querySelector(".ft-percentage").innerHTML = Math.round((player.getFreeThrowsMade()/player.getFreeThrowsAttempted())*100) + "%"; 

        const CHART = document.querySelector(".tp-chart");


    }

    getData();
    
}

document.querySelector(".search_bar-button").addEventListener("click", searchPlayer);