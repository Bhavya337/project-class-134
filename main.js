song="";
Status="";
objects = [];



function setup(){
    canvas = createCanvas(380,380);
    canvas.position(500,100);
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function preload(){
 song= loadSound ("happy.mp3");

}



function  modelLoaded(){
    console.log("model Loaded");
    Status = true;
  

}


function gotResult(error , results) {
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}



function draw() {
    image(video, 0, 0, 380,380);
    if (Status != "") {
r = random(255);
g = random(255);

b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            fill(r,g,b);
            document.getElementById("status").innerHTML = "Status : Objects Detected ";
            document.getElementById("number_of_objects").innerHTML = " number of objects are : " + objects.length;
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label== "person"){
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();

            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Baby not Found";
                console.log("play");
                song.play();

              }
            }
            if(objects.label== 0 ){
                document.getElementById("number_of_objects").innerHTML = "Baby not  Found";
                console.log("play");
                song.play();

        
        }
    }
}