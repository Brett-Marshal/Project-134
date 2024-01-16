song = "";
status = "";
objects = [];

function setup()
{
    canvas = createCanvas(400, 350);
    canvas.center()

    video = createCapture(VIDEO);
    video.hide();

    cocossd = ml5.objectDetector("cocossd", modelLoaded);
}

function draw()
{
    image(video, 0, 0, 400, 350);

    
    if(status != "")
    {
        cocossd.detect(video, gotResults);

        for(i = 0; i < objects.length; i++)
        {
        if(objects[i].label == "person")
        {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("baby_found").innerHTML = "Baby Found";
        song.stop();

        fill("red");
        percent = floor(objects[i].confidence * 100);
        text("Person " + percent + "% ", objects[i].x + 20, objects[i].y + 20);
        noFill();
        stroke("red");
        rect(objects[i].x + 20, objects[i].y + 20, objects[i].width, objects[i].height);
    }
    else
    {
        document.getElementById("status").innerHTML = "Status : Object Not Detected";
        document.getElementById("baby_found").innerHTML = "Baby Not Found";
        song.play();
    }
    }

    if(objects.length < 0)
    {
        document.getElementById("status").innerHTML = "Status : Object Not Detected";
        document.getElementById("baby_found").innerHTML = "Baby Not Found";
        song.play();
    }
}
}

function modelLoaded()
{
    console.log("Model is Initialized!");
    status = true;
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    if(results)
    {
        console.log(results);
    }

    objects = results;
}

function preload()
{
    song = loadSound("alert.mp3");
}

function play()
{
    song.loop();
}