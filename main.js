prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'jpg',
    jpg_quality: 90

});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'">';
    });
}

console.log(ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/fnSGr2wBN/model.json', modelloaded);

function modelloaded(){
    console.log("Model Loaded !!");
}

function speak(){
    synth = window.speechSynthesis;
    speak_data_1 = "The first Prediction is " + prediction_1;
    speak_data_2 = "and second Prediction is " + prediction_2;
    utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterthis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotresult);
    }

function gotresult(error, result){
    if(error){
        console.log(error);
         }

         else{
             console.log(result);
             document.getElementById("result_1").innerHTML= result[0].label;
             document.getElementById("result_2").innerHTML= result[1].label;
             prediction_1 = result[0].label;
             prediction_2 = result[1].label;
            speak();
             
            if(result[0].label == 'Happy'){
                document.getElementById("emoji_1").innerHTML = "&#128512;";
            }

            if(result[0].label == 'Sad'){
                document.getElementById("emoji_1").innerHTML = "&#128532;";
            }

            if(result[0].label == 'Angry'){
                document.getElementById("emoji_1").innerHTML = "&#128545;";
            }

            if(result[0].label == 'Scared'){
                document.getElementById("emoji_1").innerHTML = "&#128552;";
            }
//prediction 2//

            if(result[1].label == 'Happy'){
                document.getElementById("emoji_2").innerHTML = "&#128512;";
            }

            if(result[1].label == 'Sad'){
                document.getElementById("emoji_2").innerHTML = "&#128532;";
            }

            if(result[1].label == 'Angry'){
                document.getElementById("emoji_2").innerHTML = "&#128545;";
            }

            if(result[1].label == 'Scared'){
                document.getElementById("emoji_2").innerHTML = "&#128552;";
            }
         }
}