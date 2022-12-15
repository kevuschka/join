let task;
let todo = [];
let inProgress = [];
let feedback = [];
let done = [];
let boardColumns = [todo, inProgress, feedback, done];
let alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
let contacts_add = false;

let priorities = [
    {
        'name': 'Urgent',
        'prio-index': 0,
        'image': './assets/img/red-prio.svg',
        'color': '#FF3D00'
    },
    {
        'name': 'Medium',
        'prio-index': 1,
        'image': './assets/img/orange-prio.svg',
        'color': '#FFA800'
    },
    {
        'name': 'Low',
        'prio-index': 2,
        'image': './assets/img/green-prio.svg',
        'color': '#7AE229'
    }
]

let category = [
//     'name': 'Design',
//     'color': '#FF8A00',
];


let categoryColors = ['#FF8A00', '#8AA4FF', '#FF0000', '#2AD300', '#E200BE', '#0038FF']
let colors = ['#0190e0','#ee00d6', '#02cf2f', '#ffa800', '#9327ff', '#ff5c00', '#4e963d', '#32daff', '#007cee', '#cb02cf']

let contacts = [
//{
//     'name': 'Simon Meyer',
//     'color': '#0190E0',
//     'email': 'simon.meyer@gmail.com',
//     'phone': '+490123456789',
//     'abbreviation': 'SM'
// },{
//     'name': 'Maximilian Vogel',
//     'color': '#EE00D6',
//     'email': 'maximilian.vogel@gmail.com',
//     'phone': '+49 0123 456 78 9',
//     'abbreviation': 'MV'
// },{
//     'name': 'Eva Fischer',
//     'color': '#02CF2F',
//     'email': 'Eva.Fischer@gmail.com',
//     'phone': '+49 0123 456 78 9',
//     'abbreviation': 'EF'

// },{
//     'name': 'Hans Maier',
//     'color': '#0038FF',
//     'email': 'Hans.Maier@gmail.com',
//     'phone': '+49 0123 456 78 9',
//     'abbreviation': 'HM'
// },{
//     'name': 'Manuel Neuer',
//     'color': '#0038FF',
//     'email': 'Neuer.manuell@gmail.com',
//     'phone': '+49 0123 456 78 9',
//     'abbreviation': 'MN'
// },
// {
//     'name': 'Kevin Schumilo',
//     'color': '#02CF2F',
//     'email': 'kevin.schumilo@gmail.com',
//     'phone': '+49 0123 456 78 9',
//     'abbreviation': 'KV'
//}
];

let newContact = {
    'name': '',
    'color': '',
    'email': '',
    'phone': '',
    'abbreviation': '',
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

// 'category': [],
// 'title': '',
// 'description': '',
// 'process': 0,
// 'subtasks': 0,
// 'subtasksArray': [],
// 'team': [],
// 'prior': '',
// 'board': 0,
// 'due-date': '',


// Returns a random integer from 0 to 9:
//Math.random returns a number lower than 1
//Math.floor makes the decimal number to a 'no decimal' number
//10 is the number of values we want, beginning from  0
function getRandomNumberFromZeroToNine() {
    return Math.floor(Math.random() * 10);
}

// ########## ALLES ZUM BACKEND ##########
setURL('https://gruppe-348.developerakademie.net/join/smallest_backend_ever');

//LOAD
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    //boardColumns = JSON.parse(backend.getItem('boardColumns')) || [];
    category = JSON.parse(backend.getItem('category')) || [];
    //contacts = JSON.parse(backend.getITEM('contacts')) || [];
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
    document.getElementById('content-container').innerHTML = `<p class="header-title-resp cursor-d">Kanban Project Management Tool</p>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}


function reloadPage() {
    window.location.reload(true);
}


