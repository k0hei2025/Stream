const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

const container = document.getElementById('container');
const signupEmail = document.querySelector('.signup-email'); 
const signupPassword = document.querySelector('.signup-password');
const signupConfirmPassword = document.querySelector('.signup-passwordConfirm');
const signupButton = document.getElementById('signup-button');

let error = document.getElementById('err');
let checkError = document.getElementById('check')

const signinEmail = document.querySelector('.signin-email')
const signinPassword = document.querySelector('.signin-password')
const signinButton = document.getElementById('signin-button')




signUpButton.addEventListener('click', () =>
container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () =>
container.classList.remove('right-panel-active'));



signupButton.addEventListener('click', async() =>{

console.log(signupEmail.value , signupPassword.value )


   if (signupPassword.value === signupConfirmPassword.value && signupPassword.value.length > 8){ 
     
    checkError.classList.remove('checker');
    checkError.style.color='green'
    
    
    const data =  await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgvbOnkBU7Jkvmb9MCguSTIxpM8sNY7Dw

`,{
   method : 'POST',
   body: JSON.stringify({
     email : signupEmail.value,
     password : signupPassword.value,
     returnSecureToken : true 
   }),
   headers:{
     'Content-Type': 'application/json'
   }
  }

);

const resData = data.json();



console.log(resData);

   tokenId = resData.localId;
   console.log(tokenId);

 location.replace('/newcall')  

 
console.log(signupEmail.value , signupPassword.value )
}
else {
   console.log('Error')
} 


})



signinButton.addEventListener('click',async()=>{
  const data  = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgvbOnkBU7Jkvmb9MCguSTIxpM8sNY7Dw
`,{
    
  method : 'POST',
   body: JSON.stringify({
     email : signinEmail.value,
     password : signinPassword.value,
     returnSecureToken : true 
   }),
   headers:{
     'Content-Type': 'application/json'
   }



   })

 

   const resData = await data.json();
    
   console.log(resData.error);
   console.log(resData.idToken);
 
  if (resData.idToken){
    console.log(resData)
    console.log(resData.localId)

    location.replace('/newcall')  
  }

    if (resData.error  ){
       error.classList.remove("error")

      error.style.color = 'red'
      console.log(resData.error.message)
     
    }
    
      
 

})

