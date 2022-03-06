import NbaPlayer from "./nba-player.js";
import * as nbaAPI from "./nba-api.js";

function searchPlayer(){
    let name = document.querySelector(".search_bar-text").value;
    let player = new NbaPlayer(name);
    let obj;
    let url;
    let color = ["#FC4F4F","#9C0F48","#A73489","#FC4F4F"];

    async function fetchEverything() {

        obj = await nbaAPI.getPlayer(player.getFullName());
        player.setIdAndName(obj.id, obj.first_name, obj.last_name);

        obj = await nbaAPI.getBio(player.getId());
        player.setBio(obj.position, obj.team.full_name, obj.weight_pounds, obj.height_feet + "\'" + obj.height_inches + "\""); // finds specific value

        obj = await nbaAPI.getStats(player.getId());
        player.setStats(obj.pts, obj.ast, obj.stl, obj.blk);

        url = await nbaAPI.getImage(player.getFirstName(), player.getLasttName());
        player.setImage(url);
        
        document.querySelector(".player_header").style.visibility = "visible";
        document.querySelector(".player_header-block").style.background = "linear-gradient(-45deg, " + color[0] + "," + color[1] + "," + color[2] + "," + color[3];
        document.querySelector(".player_header-block").style.backgroundSize = "300%";
        document.querySelector(".player_header-block").style.animation = "animated_color 10s ease-in-out infinite";

        document.querySelector(".player_bio-position").innerHTML = player.position;
        document.querySelector(".player_bio-team").innerHTML = player.team;
        document.querySelector(".player_bio-height").innerHTML = player.height;
        document.querySelector(".player_bio-weight").innerHTML = player.weight;
        
        await countAnimation(".points-value", player.getPoints(), 70);
        await countAnimation(".assists-value", player.getAssits(), 300);
        await countAnimation(".steals-value", player.getSteals(), 800);
        await countAnimation(".blocks-value", player.getBlocks(), 800);
        

        document.querySelector(".player_header-image").src = player.getImage(); 
        document.querySelector(".name-first").innerHTML = player.getFirstName(); 
        document.querySelector(".name-last").innerHTML = player.getLasttName(); 

    }

    let countAnimation = (querySelection, targetNumber, speed)=>{
        let i = 0;
        while(i <= targetNumber) {
            (function(index) {
                setTimeout(function (){document.querySelector(querySelection).innerHTML = index;}, i*speed);
            })(i);

            i = i + 0.01;
            i = Math.round(i * 100) / 100; // round to 2 decimal places
        }
    }

    fetchEverything();
    
}

document.querySelector(".search_bar-button").addEventListener("click", searchPlayer);