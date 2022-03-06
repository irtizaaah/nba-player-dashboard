export function historyChart(playerData, querySelection, label){

    const CHART = document.querySelector(querySelection);

    const data = {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
        datasets: [{
        label: label,
        data: [...playerData],
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

    let historyChart = new Chart(CHART, {
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

export function efficiencyChart(playerData1, playerData2, querySelection, label){
    
    const CHART = document.querySelector(querySelection);

    const data = {
        labels: ['Missed','Made'],
        datasets: [{
          label: label,
          data: [playerData1-playerData2, playerData2],
          fill: true,
          backgroundColor: [
            '#470D21',
            '#9C0F48'
          ],
          hoverOffset: 4
        }],
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
      };

      Chart.defaults.font.size = 10;

    let efficiencyChart = new Chart(CHART, {
        type: 'doughnut',
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