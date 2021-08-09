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



const share = document.getElementById('shareRoomBtn')


   share.addEventListener('click', event => {
     console.log('sharing process')
  if (navigator.share) {
    navigator.share({
      title: `Meeting about ${document.getElementById("descrip").value}` ,
      text:` ID : ${document.getElementById("roomName").value} Date : ${new Date().getDate} Time : ${new Date().getTime} `,
      url: '/join/'+document.getElementById("roomName").value
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
  } else {
    // fallback
  }
}); 






const buttonChecker = document.getElementById("buttonChecker")

const checkInput = document.getElementById('checkerInput')
const idErr = document.getElementById('errId')

buttonChecker.addEventListener("click",()=>{
  console.log('click')
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


const addToDataHandler= async(meetingId , date , time , url , description )=>{
     

   
   const data = await fetch(`https://stream-66085-default-rtdb.firebaseio.com/scheduled.json`,{
     method:'POST',
     body: JSON.stringify({
       data : {

    meetId : meetingId,
    timePeriod : ` Date: ${date} Time ${time}`,
    link : url,
    description : description

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

let createBtn = document.getElementById("createbtn")
let popup = document.getElementById("popup")

createBtn.onclick = ()=>{
    popup.classList.remove("displayPopup");
}




const listDataHandler= async ()=>{
   


  const data = await fetch(`https://stream-66085-default-rtdb.firebaseio.com/scheduled.json?auth=`);
  


  const resData =  await data.json();
  let container = [];
  
  for(let i in resData){
    container.push({
      id : i,
      meetId  : resData[i].data.meetId,
      dateAndTime  : resData[i].data.timePeriod,
      url : resData[i].data.link,
      description : resData[i].data.description,
    })
  }
  console.log(resData)
  console.log(container)
   
   container.map((i)=>{
  
   let cardData = document.createElement("div")
    let eventIDB = document.createElement("b")
    let dateAndTimeB = document.createElement("b")
     let description = document.createElement("p")

     let button = document.createElement("button")
      let button1 = document.createElement("button")
        let button2 = document.createElement("button")
        
        button.style.color = "white"
        button.style.backgroundColor = 'black'
        button1.style.backgroundColor ="blue"
        button2.style.backgroundColor = "lightgreen"

      let buttonContent = document.createTextNode("Copy")
      let button1Content = document.createTextNode("Share")
      let button2Content = document.createTextNode("Start")
     
      button.appendChild(buttonContent)
       button1.appendChild(button1Content)
       button2.appendChild(button2Content)
       
button2.onclick = ()=>{
   window.location.href = i.url
}


       button1.onclick =()=>{
         
     console.log('sharing process')
  if (navigator.share) {
    navigator.share({
      title: i.description ,
      text:` ID : ${i.meetId}  ${i.dateAndTime} `,

      url: i.url
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
  } else {
    // fallback
  }


       }

     cardData.style.backgroundColor="white"
     cardData.style.padding='1rem'
     cardData.style.borderRadius=".5rem"
     cardData.style.margin=".5rem"

     cardData.id = i.id;
     let eventIdContent =  document.createTextNode("ID :"+ i.meetId)
     let dateAndTimeContent = document.createTextNode(i.dateAndTime)
     let descriptionContent = document.createTextNode(i.description)


     button.onclick = ()=>{
  eventIDB.style.userSelect = 'all';
  dateAndTimeB.style.userSelect = 'all';
  description.style.userSelect = 'all';
  document.execCommand("copy")
}


    
     eventIDB.appendChild(eventIdContent)
     dateAndTimeB.appendChild(dateAndTimeContent)
     description.appendChild(descriptionContent)

  cardData.appendChild(eventIDB)  
  cardData.appendChild(dateAndTimeB)
  cardData.appendChild(description)
  cardData.appendChild(button)
  cardData.appendChild(button1)
  cardData.appendChild(button2)
  

   document.getElementById("scheduledList").appendChild(cardData)
   })



       

}






const submit = document.getElementById('mark')
 const insert =  document.getElementById('meetlink')
let date = document.getElementById('date');
let time = document.getElementById('time');
let description = document.getElementById('scheduleDesription')


         
  listDataHandler()


submit.onclick = ()=>{






 var adjective1 = adjectives[Math.floor(Math.random() * adjectives.length)];
var noun1 = nouns[Math.floor(Math.random() * nouns.length)];
var num1 = getRandomNumber(5);
noun1 = noun1.charAt(0).toUpperCase() + noun1.substring(1);
adjective1 = adjective1.charAt(0).toUpperCase() + adjective1.substring(1);
var meetidlink= 'https://stream-321403.el.r.appspot.com/join/' + num1+adjective1+noun1
 let meetId = num1+adjective1+noun;

 let packet = [];



    if ( date.value === '' || time.value === '' || description.value === '' ){

      document.getElementById('popError').classList.remove('popupError');
      document.getElementById('popError').style.color = 'red';

      console.log('if called')

    }
    else {
            console.log(date.value , time.value , description.value)
     document.getElementById('popup').style.display = "none";
    
     addToDataHandler(meetId , date.value , time.value , meetidlink , description.value)
       
     shareRoomHandler( meetId , date.value , time.value , meetidlink , description.value);
   
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
console.log('else called')
  
}
}





