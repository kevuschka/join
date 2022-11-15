setURL('https://gruppe-348.developerakademie.net/join/smallest_backend_ever');


let users = [{}];




    async function init() {
       
        await downloadFromServer();
        users = JSON.parse(backend.getItem('users')) || [];
    }


async function addUser() {
    let userName = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let user = {
        'userName':userName.value,
        'email'   :email.value,
        'password':password.value
    }

    userName.value ='';
    email.value ='';
    password.value ='';
    
    users.push(user);

    let allUsersAsString = JSON.stringify(users);
    await backend.setItem('users', allUsersAsString);
    //Weiterleitung zu Login-Seite + Nachricht anzeigen: "Erfolgreiche Registrierung!".
    window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert';
    

}



function login() {
  

    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let user = users.find(u => u.email == email.value && u.password == password.value);
    console.log(user);
    if(user) {
        console.log('user gefunden');
    
        //Weiterleitung zu Join-Seite + Nachricht anzeigen: "Erfolgreiche Anmeldung!".
    window.location.href = 'summary.html?msg=Du hast dich erfolgreich angemeldet';
    }
} 

function redirect() {
const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');

if(msg) {
    document.getElementById('msgBox').innerHTML = msg;
} else {
    document.getElementById('msgBox').classList.add('d-none');
}
}


function newPassword() {
let newPassword = document.getElementById('newPassword').value;
let confirmPassword = document.getElementById('confirmPassword').value;

    if(newPassword == confirmPassword) {
        let changedPassword  = confirmPassword;
        console.log('The new password is,', changedPassword);
    }
    window.location.href = 'login.html?msg=Password erfolgreich eingerichtet';
}


    /*new Date().toLocaleString("de-DE");*/

    function preventRefresh() {
        var form = document.getElementById("myform");
        function handleForm(event) { event.preventDefault(); } 
        form.addEventListener('submit', handleForm);
    }