var stories = [];
//GET DATABASE LIST
fetch('/storiesList').then(res => res.json()).then(function(json) {
    //POPULATE STORIES TO VAR
    json.forEach(function(story){
        stories.push(story);
    });
});

//GET ELEMENTS
var storyGroup = document.getElementById("storyGroup");
var selectedStory = document.getElementById("selectedStory");
var bodyText = document.getElementById("bodytext");
var userName = document.getElementById("name");
var place = document.getElementById("place");
var date = document.getElementById("date");
var randFontList = ["storyFont1", "storyFont2", "storyFont3", "storyFont4", "storyFont5"];

//RANDOM NUMBER
function randomInt(min, max){
    return min + Math.floor((max - min) * Math.random())
}
//SELECT RANDOMIZED STORY
function changeStory(){
    var randFont = randomInt(0, 4);
    var randNum = randomInt(0, stories.length);
    var storyNum = stories[randNum];

    //CHANGE FONT
    if(storyGroup.classList != ""){
        storyGroup.classList.remove(storyGroup.classList);
    }
    storyGroup.classList.add(randFontList[randFont]);;
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
}

//TIMER
setTimeout(setInterval(function(){
    changeStory();
}, 8000), 1000);
