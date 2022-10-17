function renderNav() {
    let navbar = document.getElementById('nav');
    navbar.innerHTML = renderNavContent();  
    renderMainNavItems();
}

function renderNavContent() {
    return `<img src="assets/img/logo-big.png">
            <div class="nav-selection flex column" id="nav-selection">
                <div class="nav-main-selection flex column" id="nav-main-selection"></div>
                <div class="nav-item nav-legal-notice flex" onclick="">
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
    return `<div class="nav-item nav-summary flex" onclick="">
                <img src="assets/img/summary-nav-icon.png">
                <p>Summary</p>
            </div>`;
}

function renderNavItemBoard() {
    return `<div class="nav-item nav-board flex" onclick="">
                <img src="assets/img/board-nav-icon.png">
                <p>Board</p>
            </div>`;
}

function renderNavItemAddTask() {
    return `<div class="nav-item nav-add-task flex" onclick="">
                <img src="assets/img/add-task-nav-icon.png">
                <p>Add Task</p>
            </div>`;
}

function renderNavItemContacts() {
    return ` <div class="nav-item nav-contacts flex" onclick="">
                <img src="assets/img/contacts-nav-icon.png">
                <p>Contacts</p>
            </div>`;
}