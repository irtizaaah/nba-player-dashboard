export function countAnimation(querySelection, targetNumber, speed){
    let i = 0;
    while(i <= targetNumber) {
        (function(index) {
            setTimeout(function (){document.querySelector(querySelection).innerHTML = index;}, i*speed);
        })(i);

        i = i + 0.01;
        i = Math.round(i * 100) / 100; // round to 2 decimal places
    }
}