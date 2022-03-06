import NbaPlayer from "./nba-player.js";
import * as nbaAPI from "./nba-api.js";

function searchPlayer(){
    let name = document.querySelector(".search_bar-text").value;
    let player = new NbaPlayer(name);
    let obj;
    let url;
    let list;
    //let color = ["#FC4F4F","#9C0F48","#A73489","#FC4F4F"];

    async function fetchEverything() {

        obj = await nbaAPI.getPlayer(player.getFullName());
        player.setIdAndName(obj.id, obj.first_name, obj.last_name);

        obj = await nbaAPI.getBio(player.getId());
        player.setBio(obj.position, obj.team.full_name, obj.weight_pounds, obj.height_feet + "\'" + obj.height_inches + "\""); // finds specific value

        obj = await nbaAPI.getStats(player.getId());
        player.setStats(obj.pts, obj.ast, obj.stl, obj.blk);

        url = await nbaAPI.getImage(player.getFirstName(), player.getLasttName());
        player.setImage(url);

        list = await nbaAPI.getPointsHistory(player.getId());
        player.setPointsHistory(list);
        
        document.querySelector(".player_header").style.visibility = "visible";
        document.querySelector(".player_stats-container").style.visibility = "visible";
        document.querySelector(".chart_container").style.visibility = "visible";
        // document.querySelector(".player_header-block").style.background = "linear-gradient(-45deg, " + color[0] + "," + color[1] + "," + color[2] + "," + color[3];
        // document.querySelector(".player_header-block").style.backgroundSize = "300%";
        // document.querySelector(".player_header-block").style.animation = "animated_color 10s ease-in-out infinite";

        document.querySelector(".player_bio-position").innerHTML = player.getPosition();
        document.querySelector(".player_bio-team").innerHTML = player.getTeam();
        document.querySelector(".player_bio-height").innerHTML = player.getHeight();
        document.querySelector(".player_bio-weight").innerHTML = player.getWeight();

        document.querySelector(".player_header-image").src = player.getImage(); 
        document.querySelector(".name-first").innerHTML = player.getFirstName(); 
        document.querySelector(".name-last").innerHTML = player.getLasttName(); 

        countAnimation(".points-value", player.getPoints(), 50);
        countAnimation(".assists-value", player.getAssits(), 300);
        countAnimation(".steals-value", player.getSteals(), 800);
        countAnimation(".blocks-value", player.getBlocks(), 800);

        const CHART = document.querySelector(".radar_chart");
        const data = {
            labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
            datasets: [{
              label: 'Point History',
              data: [...player.getPointHistory()],
              fill: true,
              backgroundColor: '#9C0F48',
              borderColor: 'rgb(255, 99, 132)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)'
            }],
            scales: {
                y: {
                    min: 0,
                    max: 100
                }
            }
          };

          Chart.defaults.font.size = 30;

        let radarChart = new Chart(CHART, {
            type: 'line',
            data: data,
            options: {
                elements: {
                    line: {
                    borderWidth: 3
                    }
                }
            },
        });
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