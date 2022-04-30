document.addEventListener("keypress", function(event){
document.querySelector("h1").innerHTML = `Who told you to press ${event.key} key.`
    setTimeout(function(){document.querySelector("h1").innerHTML ="Enter co-ordinates to find temperature."},1000)
});
