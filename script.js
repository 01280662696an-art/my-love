/*====================================
    ELEMENTS
====================================*/

const intro=document.getElementById("intro");

const startBtn=document.getElementById("startBtn");

const scene=document.getElementById("scene");

const stars=document.getElementById("stars");

const shootingStars=document.getElementById("shootingStars");

const bow=document.getElementById("bowContainer");

const arrow=document.getElementById("arrowContainer");

const heart=document.getElementById("heartContainer");

const sparkContainer=document.getElementById("sparkContainer");

const gallery=document.getElementById("gallery");

const photo=document.getElementById("photo");

const caption=document.getElementById("caption");

const ending=document.getElementById("ending");

const bowString = document.getElementById("bowString");

/*====================================
    AUDIO
====================================*/

const piano=document.getElementById("piano");

const drawSound=document.getElementById("drawSound");

const releaseSound=document.getElementById("releaseSound");

const heartHit=document.getElementById("heartHit");

const heartbeat=document.getElementById("heartbeat");

const sparkle=document.getElementById("sparkle");

/*====================================
    DATA
====================================*/

const photos=[

"assets/images/01-first.jpg.jpg",

"assets/images/02-smile.jpg.jpg",

"assets/images/03-memory.jpg.jpg",

"assets/images/04-together.jpg.jpg",

"assets/images/05-love.jpg.jpg",

"assets/images/06-promise.jpg.jpg",

"assets/images/07-final.jpg.jpg"

];

const texts=[

" طول عمري بشوفك اجمل انسانة عيني ❤️",

"ابتسامتك أجمل حاجة في يومي.",

"كل لحظة معاكي بقيت ذكرى جميلة.",

"نفسي أفضل جنبك العمر كله.",

"بحبك أكتر من أي كلام يوصف.",

"ووعد مني أفضل أحارب علشانك.",

"يارب يجمعنا بالحلال قريب 🤍"

];

let currentPhoto=0;
/*====================================
    START
====================================*/

startBtn.addEventListener("click",()=>{

intro.style.opacity="0";

setTimeout(()=>{

intro.style.display="none";

scene.classList.remove("hidden");

startMovie();

},1000);

});
/*====================================
    START MOVIE
====================================*/

function startMovie(){

playMusic();

createStars();

startShootingStars();

showBow();

}
/*====================================
    MUSIC
====================================*/

function playMusic(){

piano.volume=.2;

piano.play().catch(()=>{});

const fade=setInterval(()=>{

if(piano.volume<.6){

piano.volume+=.02;

}else{

clearInterval(fade);

}

},800);

}
/*====================================
    STARS
====================================*/

function createStars(){

for(let i=0;i<300;i++){

const star=document.createElement("div");

star.className="star";

star.style.left=Math.random()*100+"%";

star.style.top=Math.random()*100+"%";

const size=(Math.random()*3)+1;

star.style.width=size+"px";

star.style.height=size+"px";

star.style.animationDuration=(Math.random()*4+2)+"s";

stars.appendChild(star);

}

}
/*====================================
    SHOOTING STARS
====================================*/

function startShootingStars(){

setInterval(()=>{

const s=document.createElement("div");

s.className="shootingStar";

s.style.top=Math.random()*40+"%";

s.style.left=(60+Math.random()*40)+"%";

shootingStars.appendChild(s);

setTimeout(()=>{

s.remove();

},2200);

},4500);

}
/*====================================
    SHOW BOW
====================================*/

function showBow(){

setTimeout(()=>{

bow.classList.add("show");

},1500);

setTimeout(()=>{

drawBow();

},3800);

}
/*====================================
    DRAW BOW
====================================*/

function drawBow(){

drawSound.currentTime = 0;
drawSound.play().catch(()=>{});


// شد الوتر للخلف من المنتصف

bowString.setAttribute(
"points",
"250,40 310,250 250,460"
);


// رجوع السهم للخلف
arrow.style.transform =
"translateY(-50%) translateX(-50px)";


setTimeout(()=>{

releaseArrow();

},900);

}
/*====================================
    RELEASE
====================================*/

function releaseArrow(){


// رجوع الوتر الطبيعي
bowString.setAttribute(
"points",
"250,40 250,250 250,460"
);


releaseSound.currentTime = 0;
releaseSound.play().catch(()=>{});


// إطلاق السهم
arrow.style.transition="transform .9s ease";

arrow.style.transform =
"translateY(-50%) translateX(950px)";


setTimeout(()=>{

hitHeart();

},900);

}
/*====================================
        HEART HIT
====================================*/

function hitHeart(){

heart.classList.add("heart-hit");

heartHit.currentTime=0;
heartHit.play().catch(()=>{});

heartbeat.currentTime=0;
heartbeat.play().catch(()=>{});

createSparks();

setTimeout(()=>{

showGallery();

},900);

}
/*====================================
        SPARKS
====================================*/

function createSparks(){

sparkle.currentTime=0;
sparkle.play().catch(()=>{});

for(let i=0;i<45;i++){

const spark=document.createElement("div");

spark.className="spark";

spark.style.left="79%";

spark.style.top="50%";

spark.style.setProperty("--x",(Math.random()*500-250)+"px");

spark.style.setProperty("--y",(Math.random()*350-175)+"px");

sparkContainer.appendChild(spark);

setTimeout(()=>{

spark.remove();

},900);

}

}
/*====================================
        SHOW GALLERY
====================================*/

function showGallery(){

gallery.style.display="block";

changePhoto();

}
/*====================================
        CHANGE PHOTO
====================================*/

function changePhoto(){

photo.src=photos[currentPhoto];

caption.innerHTML="";

writeText(texts[currentPhoto]);

setTimeout(()=>{

currentPhoto++;

if(currentPhoto<photos.length){

changePhoto();

}else{

finishMovie();

}

},6500);

}
/*====================================
        TYPE EFFECT
====================================*/

function writeText(text){

let i=0;

const timer=setInterval(()=>{

caption.innerHTML+=text.charAt(i);

i++;

if(i>=text.length){

clearInterval(timer);

}

},45);

}

/*====================================
        FINISH MOVIE
====================================*/

function finishMovie(){

setTimeout(()=>{

gallery.style.opacity="0";

setTimeout(()=>{

gallery.style.display="none";

ending.style.display="flex";

ending.style.opacity="0";

setTimeout(()=>{

ending.style.transition="1.5s";

ending.style.opacity="1";

},100);

},1000);

},1000);

}

/*====================================
        STAR PARALLAX
====================================*/

let offset=0;

function animateStars(){

offset+=0.03;

stars.style.transform=`translateY(${offset}px)`;

requestAnimationFrame(animateStars);

}

animateStars();

/*====================================
        HEART GLOW
====================================*/

setInterval(()=>{

heart.style.filter=`
drop-shadow(0 0 30px #ff2d55)
drop-shadow(0 0 80px #ff2d55)
`;

setTimeout(()=>{

heart.style.filter=`
drop-shadow(0 0 18px #ff2d55)
drop-shadow(0 0 40px #ff2d55)
`;

},450);

},1800);

/*====================================
        PHOTO FADE
====================================*/

photo.onload=()=>{

photo.style.opacity="0";

setTimeout(()=>{

photo.style.transition="1.2s";

photo.style.opacity="1";

},50);

};

/*====================================
        CAPTION CURSOR
====================================*/
