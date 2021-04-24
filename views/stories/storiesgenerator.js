function randomInt(min, max){
    return min + Math.floor((max - min) * Math.random())
}

var randomStory = []

stories.forEach(function(story){
    randomStory.push(story);
});

var randomNumber = randomInt(0, randomStory.length)


<div>
    <blockquote>
        <div>
            <div>
                <h1>❛</h1>
                <h1>randomStory[randomNumber].bodytext</h1>
                <h1>❜</h1>
            </div>
            if(randomStory[randomNumber].name != ""){
                <h3>randomStory[randomNumber].name</h3>
            } else {
                <h3>Anonymous</h3>
            }
            if(randomStory[randomNumber].place != ""){
                <h4>randomStory[randomNumber].place</h4>
            } else {
                <h5>Somewhere across the world</h5>
            }
            <h5>randomStory[randomNumber].date</h5>
        </div>
      </blockquote>
</div> 