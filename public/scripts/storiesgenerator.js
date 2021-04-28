var stories = [];
//GET DATABASE LIST
fetch('/storiesList').then(res => res.json()).then(function(json) {
    //POPULATE STORIES TO VAR
    json.forEach(function(story){
        stories.push(story);
    });
});

//GET ELEMENTS
var selectedStory = document.getElementById("selectedStory");
var bodyText = document.getElementById("bodytext");
var userName = document.getElementById("name");
var place = document.getElementById("place");
var date = document.getElementById("date");

//RANDOM NUMBER
function randomInt(min, max){
    return min + Math.floor((max - min) * Math.random())
}

//TIMER
setTimeout(setInterval(function(){
    //SELECT RANDOMIZED STORY
    var randNum = randomInt(0, stories.length);
    var storyNum = stories[randNum];
    //UPDATE HTML
    selectedStory.classList.add("animatedTransition");
    // AGREGAR IF "UBICACION VACIA" "NOMBRE ANONYMOUS"
    bodyText.textContent = storyNum.bodytext;
    if(storyNum.name != ""){
        userName.textContent = storyNum.name;
    }else{
        userName.textContent = "Anonymous";
    };
    place.textContent = storyNum.place;
    date.textContent = storyNum.date;
}, 8000), 1000);