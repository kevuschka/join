let title;
let description;
let state;

let category = [{
    'name': 'design',
    'color': '#FF7A00'
}];


let contacts = [{
    'name': 'Simon Meyer',
    'color': '#0190E0',
    'email': 'simon.meyer@gmail.com',
    'phone': '+49 0123 456 78 9'
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


let task = [{
    'category': [],
    'title': 'Website redesign',
    'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
    'process': '0/2',
    'team': [],
    'prior': 'assets/img/green.png',
    'board': 0
}]

let todo = [
    {
        'category': [{'name': 'design','color': '#FF7A00'}],
        'title': 'Website redesign',
        'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
        'process': '0/2',
        'team': [
            {
                'name': 'Simon Meyer',
                'color': '#0190E0',
                'email': 'simon.meyer@gmail.com',
                'phone': '+49 0123 456 78 9'
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
            }
        ],
        'prior': 'assets/img/green.png',
        'board': 0
    }
]

let progress = []

let feedback = []

let done = []


function templateBoard() {
    renderResponsiveHeaderTitle();
    let content = document.getElementById('content-container');
    content.innerHTML += `
                    <div class="board-wrapper">
                        <div class="board-container flex column">
                            <div class="board-header flex">
                                <div class="board-header-left flex">
                                    <p>Board</p>
                                    <img class="board-header-addTask-button-resp cursor-p d-none" src="assets/img/board-add-task-icon.png">
                                </div>
                                <div class="board-header-right flex">
                                    <div class="board-header-search-container flex">
                                        <div class="board-header-search-input-container">
                                            <div class="board-header-search-input"></div>
                                        </div>
                                        <img class="board-search-icon cursor-p" src="assets/img/search-icon.png">
                                    </div>
                                    <div class="board-header-addTask-button flex cursor-p">
                                        <p>Add task</p>
                                        <img class="board-white-plus-image" src="assets/img/board-add-task-icon.png">
                                    </div>
                                </div>
                            </div>
                            <div class="board-content flex">
                                <div class="board-column flex column">
                                    <div class="board-column-header flex cursor-p">
                                        <p>To do</p>
                                        <img class="board-column-header-plus" src="assets/img/plus-icon-big.png">
                                    </div>
                                    <div class="board-tickets flex column" id="board_1">
                                        <div class="ticket-container flex column cursor-p">
                                            <div class="ticket-category-container flex">
                                                <p class="ticket-category">Design</p>
                                            </div>
                                            <div class="ticket-description-container flex column">
                                                <p class="ticket-description-title">Website redesign</p>
                                                <div class="ticket-description">
                                                    Modify the contents of the main website. Adjust the
                                                    UI to the company's brand design.
                                                </div>
                                            </div>
                                            <div class="process-bar-container flex">
                                                <div class="process-bar"></div>
                                                <div class="process-state">0/2 Done</div>
                                            </div>
                                            <div class="ticket-footer-container flex">
                                                <div class="ticket-contacts-container flex">
                                                    <div class="ticket-contact" id="board-contact-0">SM</div>
                                                    <div class="ticket-contact" id="board-contact-1">MV</div>
                                                    <div class="ticket-contact" id="board-contact-2">EF</div>
                                                </div>
                                                <img class="state-img" src="assets/img/green.png">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="board-column flex column">
                                    <div class="board-column-header flex cursor-p">
                                        <p>In progress</p>
                                        <img class="board-column-header-plus" src="assets/img/plus-icon-big.png">
                                    </div>
                                    <div class="board-tickets flex column" id="board_2"></div>
                                </div>
                                <div class="board-column flex column">
                                    <div class="board-column-header flex cursor-p">
                                        <p>Awaiting Feedback</p>
                                        <img class="board-column-header-plus" src="assets/img/plus-icon-big.png">
                                    </div>
                                    <div class="board-tickets flex column" id="board_3"></div>
                                </div>
                                <div class="board-column flex column">
                                    <div class="board-column-header flex cursor-p">
                                        <p>Done</p>
                                        <img class="board-column-header-plus" src="assets/img/plus-icon-big.png">
                                    </div>
                                    <div class="board-tickets flex column" id="board_4"></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
}