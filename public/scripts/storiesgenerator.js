// var storyList = fetch('/storiesList');
var stories = [];
fetch('/storiesList').then(res => res.json()).then(function(json) {
    //POPULATE STORIES TO VAR
    json.forEach(function(story){
        stories.push(story);
    });
    stories.forEach(function(story){
        console.log(story);
    });
    // console.log(json[0].name);
});


//STORIES GENERATOR

function randomInt(min, max){
    return min + Math.floor((max - min) * Math.random())
}


//TIMER


var randNum = randomInt(0, stories.length());
var storyNum = story[randNum];

var phrase = "</h1>" + storyNum.bodytext + "</h1>";
var storyName = "</h3>" + storyNum.name + "</h3>";
var place = "<h4>" + storyNum.place + "</h4>";
var date = "<h5>" + storyNum.date + "</h5>";

var selectedStory = document.getElementById("selectedStory");
selectedStory.textContent = phrase + storyName + place + date;









// var randomStory = []

// stories.forEach(function(story){
//     randomStory.push(story);
// });

// var randomNumber = randomInt(0, randomStory.length)


// <div>
//     <blockquote>
//         <div>
//             <div>
//                 <h1>❛</h1>
//                 <h1>randomStory[randomNumber].bodytext</h1>
//                 <h1>❜</h1>
//             </div>
//             if(randomStory[randomNumber].name != ""){
//                 <h3>randomStory[randomNumber].name</h3>
//             } else {
//                 <h3>Anonymous</h3>
//             }
//             if(randomStory[randomNumber].place != ""){
//                 <h4>randomStory[randomNumber].place</h4>
//             } else {
//                 <h5>Somewhere across the world</h5>
//             }
//             <h5>randomStory[randomNumber].date</h5>
//         </div>
//       </blockquote>
// </div> 