let task;
let todo = [];
let inProgress = [];
let feedback = [];
let done = [];
let boardColumns = [todo, inProgress, feedback, done];

let priorities = [
    {
        'name': 'Urgent',
        'image': './assets/img/red-prio.svg',
        'color': '#FF3D00'
    },
    {
        'name': 'Medium',
        'image': './assets/img/orange-prio.svg',
        'color': '#FFA800'
    },
    {
        'name': 'Low',
        'image': './assets/img/green-prio.svg',
        'color': '#7AE229'
    }
]

let category = [{
    'name': 'design',
    'color': '#FF7A00'
}];


let contacts = [{
    'name': 'Simon Meyer',
    'color': '#0190E0',
    'email': 'simon.meyer@gmail.com',
    'phone': '+490123456789'
},{
    'name': 'Maximilian Vogel',
    'color': '#EE00D6',
    'email': 'maximilian.vogel@gmail.com',
    'phone': '+49 0123 456 78 9'
},{
    'name': 'Eva Fischer',
    'color': '#02CF2F',
    'email': 'Eva.Fischer@gmail.com',
    'phone': '+49 0123 456 78 9'
}];


let newContact = {
    'name': '',
    'color': '',
    'email': '',
    'phone': ''
}


// let createdTask = {
//     'category': {'name': 'Design','color': '#FF7A00'},
//     'title': 'Website redesign',
//     'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
//     'progress': 0,
//     'subtasks': 1,
//     'team': [
//         {
//             'name': 'Simon Meyer',
//             'color': '#0190E0',
//             'email': 'simon.meyer@gmail.com',
//             'phone': '+49 0123 456 78 9'
//         },{
//             'name': 'Maximilian Vogel',
//             'color': '#EE00D6',
//             'email': 'maximilian.vogel@gmail.com',
//             'phone': '+49 0123 456 78 9'
//         }
//     ],
//     'prior': {
//         'name': 'Low',
//         'image': 'assets/img/green.png',
//         'color': '#7AE229'
//     },
//     'board': 0
// };


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