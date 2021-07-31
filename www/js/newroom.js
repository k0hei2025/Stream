var adjectives = [
  "small",
  "big",
  "large",
  "smelly",
  "new",
  "happy",
  "shiny",
  "old",
  "clean",
  "nice",
  "bad",
  "cool",
  "hot",
  "cold",
  "warm",
  "hungry",
  "slow",
  "fast",
  "red",
  "white",
  "black",
  "blue",
  "green",
  "basic",
  "strong",
  "cute",
  "poor",
  "nice",
  "huge",
  "rare",
  "lucky",
  "weak",
  "tall",
  "short",
  "tiny",
  "great",
  "long",
  "single",
  "rich",
  "young",
  "dirty",
  "fresh",
  "brown",
  "dark",
  "crazy",
  "sad",
  "loud",
  "brave",
  "calm",
  "silly",
  "smart",
];

var nouns = [
  "dog",
  "bat",
  "wrench",
  "apple",
  "pear",
  "ghost",
  "cat",
  "wolf",
  "squid",
  "goat",
  "snail",
  "hat",
  "sock",
  "plum",
  "bear",
  "snake",
  "turtle",
  "horse",
  "spoon",
  "fork",
  "spider",
  "tree",
  "chair",
  "table",
  "couch",
  "towel",
  "panda",
  "bread",
  "grape",
  "cake",
  "brick",
  "rat",
  "mouse",
  "bird",
  "oven",
  "phone",
  "photo",
  "frog",
  "bear",
  "camel",
  "sheep",
  "shark",
  "tiger",
  "zebra",
  "duck",
  "eagle",
  "fish",
  "kitten",
  "lobster",
  "monkey",
  "owl",
  "puppy",
  "pig",
  "rabbit",
  "fox",
  "whale",
  "beaver",
  "gorilla",
  "lizard",
  "parrot",
  "sloth",
  "swan",
];

function getRandomNumber(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
var noun = nouns[Math.floor(Math.random() * nouns.length)];
var num = getRandomNumber(5);
noun = noun.charAt(0).toUpperCase() + noun.substring(1);
adjective = adjective.charAt(0).toUpperCase() + adjective.substring(1);
document.getElementById("roomName").value = num + adjective + noun;
let meetName = num+adjective+noun;

const buttonChecker = document.getElementById("buttonChecker")
const checkInput = document.getElementById('checkerInput')
const idErr = document.getElementById('errId')

buttonChecker.addEventListener("click",()=>{
  console.log(meetName);
  console.log(checkInput.value)
  if (checkInput.value === meetName ){
    window.location.href = '/join/' + document.getElementById('roomName').value
    console.log('success')
  }
  idErr.classList.remove('id-error');
  idErr.style.color = 'red'
  console.log('error')
})

const copyInput = document.querySelector('.inp')
const btn = document.getElementById('bt');

btn.onclick = ()=>{
  copyInput.select();
  document.execCommand("Copy")
}
// btn.addEventListener("click",()=>{
//   copyInput.select();
//   document.execCommand("Copy");
// })


const addToDataHandler= async(meetingId , date , time , url)=>{
     

   
   const data = await fetch(`https://stream-66085-default-rtdb.firebaseio.com/scheduled.json`,{
     method:'POST',
     body: JSON.stringify({
       data : {

    meetId : meetingId,
    timePeriod : ` Date: ${date} Time ${time}`,
    link : url

  },
       returnSecureToken : true
     } ),
     headers:{
         'Content-Type': 'application/json' 
     }
   })

   const resData = await data.json();
   
   console.log(resData)


 

}


const listDataHandler= async ()=>{
   
  let scheduleListContainer = document.querySelector('.scheduleList');
  let eventId = document.getElementById('eventId');
  let date = document.getElementById('dateAndTimeId')
  let url = document.getElementById('urlId');



  const data = await fetch(`https://stream-66085-default-rtdb.firebaseio.com/scheduled.json`);
  


  const resData =  await data.json();
  let container = [];
  
  for(let i in resData){
    container.push({
      id : i,
      meetId  : resData[i].data.meetId,
      dateAndTime  : resData[i].data.timePeriod,
      url : resData[i].data.link
    })
  }
  console.log(resData)
  console.log(container)
   
   container.map((i)=>{
     scheduleListContainer.id = i.id
     eventId.innerHTML = i.meetId
     date.innerHTML = i.dateAndTime
     url.innerHTML = i.url 
   })


}





const date = document.getElementById('date');
const time = document.getElementById('time');
const submit = document.getElementById('mark')
 const insert =  document.getElementById('meetlink')


         
  listDataHandler()


submit.onclick = ()=>{





 var adjective1 = adjectives[Math.floor(Math.random() * adjectives.length)];
var noun1 = nouns[Math.floor(Math.random() * nouns.length)];
var num1 = getRandomNumber(5);
noun1 = noun1.charAt(0).toUpperCase() + noun1.substring(1);
adjective1 = adjective1.charAt(0).toUpperCase() + adjective1.substring(1);
var meetidlink= 'https://tetherr-master.el.r.appspot.com/join/' + num1+adjective1+noun1
 let meetId = num1+adjective1+noun;

 let packet = [];



    if ( date === '' && time === ''){
       document.getElementById("err").classList.remove("check"); 
      document.getElementById("err").style = "red";

    }
    else {
     document.getElementById('err').style.visibility = "hidden";
    
     addToDataHandler(meetId , date.value , time.value , meetidlink)

   
    console.log("hello")

 console.log(meetidlink);

 const data = { 
   date : date.value,
   time : time.value,
   url : meetidlink,
   meetid : num1+adjective1+noun1
 }
 packet.push(data)

  let dataPlate =    `                
                       ID ${num1+adjective1+noun1}  
                       Date ${date.value}  Time ${time.value}
                       Link ${meetidlink}  
                     `
 insert.classList.remove('hide');
                     insert.innerHTML = dataPlate;
                     console.log(dataPlate);

 console.log(packet)

 
  document.getElementById('collectedData').classList.remove("fade");
  insert.style.userSelect = "all";
   
     
 document.execCommand('Copy');





 

  
}
}




