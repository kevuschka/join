function renderNav(n) {
    let navbar = document.getElementById('nav');
    navbar.innerHTML = renderNavContent();  
    renderMainNavItems();
}

function renderNavContent() {
    return `<img class="logo-img absolute" src="assets/img/logo-big.png">
            <div class="nav-selection flex column" id="nav-selection">
                <div class="nav-main-selection flex column" id="nav-main-selection"></div>
                <div class="nav-item nav-legal-notice flex" onclick="renderLegalnotice()">
                    <img src="assets/img/legal-notice.png">
                    <p>Legal notice</p>
                </div>
            </div>`;
}

function renderMainNavItems() {
    let content = document.getElementById('nav-main-selection');
    content.innerHTML = renderNavItemSummery();
    content.innerHTML += renderNavItemBoard();
    content.innerHTML += renderNavItemAddTask();
    content.innerHTML += renderNavItemContacts();
}

function renderNavItemSummery() {
    return `<a href="summery.html" class="nav-item nav-summary flex" id="1" onclick="">
                <img src="assets/img/summary-nav-icon.png">
                <p>Summary</p>
            </a>`;
}

function renderNavItemBoard() {
    return `<a href="board.html" class="nav-item nav-board flex" id="2" onclick="">
                <img src="assets/img/board-nav-icon.png">
                <p>Board</p>
            </a>`;
}

function renderNavItemAddTask() {
    return `<a href="add_task.html" class="nav-item nav-add-task flex" id="3" onclick="">
                <img src="assets/img/add-task-nav-icon.png">
                <p>Add Task</p>
            </a>`;
}

function renderNavItemContacts() {
    return ` <a href="contacts.html" class="nav-item nav-contacts flex" id="4" onclick="">
                <img src="assets/img/contacts-nav-icon.png">
                <p>Contacts</p>
            </a>`;
}