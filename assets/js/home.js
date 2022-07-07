console.log("my script is loaded");
//Changing some features clicking on our buttons to make my website look attractive
//like changing color and background color for both the buttons
var a=document.getElementById('button1');
a.addEventListener('click',function(){
a.style.backgroundColor="red";
a.style.color="white";
});

var b =document.getElementById('button2');
b.addEventListener('click',function(){
b.style.backgroundColor="black";
b.style.color="white";
});