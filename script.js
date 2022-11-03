let task;
let todo = [];
let inProgress = [];
let feedback = [];
let done = [];
let boardColumns = [todo, inProgress, feedback, done];


// ########## ALLES ZUM BACKEND ##########
setURL('http://developerakademie.com/smallest_backend_ever');

//LOAD
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}
// ADD
// async function addUser() {
//     users.push('John);
//     await backend.setItem('users', JSON.stringify(users));
// }
// DELETE
// function deleteUser(name) {
//     await backend.deleteItem('users');
// }

function addClasslist(id, classe) {
    document.getElementById(id).classList.add(classe);
}

function removeClasslist(id, classe) {
    document.getElementById(id).classList.remove(classe);
}

let selectedNavItem = 0;

function doNotClose(event) {
    event.stopPropagation();
}

function markNavItem(n) {
    unmarkAllNAvItems();
    selectedNavItem = n;
    document.getElementById(`${n}`).classList.add('selected-nav-item');  
}

function markPreviewsNavItem() {
    document.getElementById(`${selectedNavItem}`).classList.add('selected-nav-item'); 
}


function unmarkAllNAvItems() {
    for (let i = 1; i < 5; i++) document.getElementById(`${i}`).classList.remove('selected-nav-item');
}

function renderResponsiveHeaderTitle() {
    document.getElementById('content-container').innerHTML = `<p class="header-title-resp d-none cursor-d">Kanban Project Management Tool</p>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}