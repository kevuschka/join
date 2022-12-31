function renderTemplateBoardColumn(i) {
    return `<div class="board-column flex column">
                <div class="board-column-header flex cursor-p">
                    <p>${boardColumnTitle[i]}</p>
                    <div class="board-column-header-plus flex" onclick="openBoardAddtaskPopup()">+</div>
                </div>
                <div class="board-tickets w-100 flex column" id="board-column-${i}" ondrop="drop(${i})" ondragover="allowDrop(event);highlightAreas(${i})" ondragleave="removeHighlightAreas(${i})"></div>
            </div>`;
}

////////////////// CATEGORY
function templateTicketCategory(n,j) {
    return `<div class="ticket-category-container flex">
                <p class="ticket-category" id="ticket-category-${n}-${j}">${boardColumns[n][j]['category']['name']}</p>
            </div>`;
}

////////////////// DESCRIPTION
function templateTicketDescription(n,j) {
    return `<div class="ticket-description-container flex column">
                <p class="ticket-description-title">${boardColumns[n][j]['title']}</p>
                <div class="ticket-description" id="ticket-description-${n}-${j}">
                    ${boardColumns[n][j]['description']}
                </div>
            </div>`;
}

////////////////// PROGRESSBAR
function templateTicketProgressbar(n,j) {
    return `<div class="process-bar-container flex" id="process-bar-container-${n}-${j}">
                <progress class="process-bar" id="process-bar-${n}-${j}" value="" max="1"></progress>
                <div class="process-state">${boardColumns[n][j]['finished-subtasks']}/${boardColumns[n][j]['subtasks']}</div>
            </div>`;
}


function templateTicketFooter(n,j) {
    return `<div class="ticket-footer-container flex">
                <div class="ticket-contacts-container flex" id="ticket-contacts-container-${n}-${j}"></div>
                <img class="state-img" src="${boardColumns[n][j]['prior']['image']}">
            </div>`
}

////////////////// TEAM
function renderContactPlaceholder(k,column,ticket,content) {
    if (k < boardColumns[column][ticket]['team'].length) {
        content.innerHTML += `<div class="ticket-contact contact-placeholder">+${getRestNumberOfMembers(column, ticket)}</div>`;
    }
}

////////////////// ONHOLD
function renderTemplateOnholdTicketResponsive(content, column) {
    content.innerHTML += `<div class="onhold-container-first w-100" id="onhold-container-column-${column}-first"></div>`;
}


function renderOnholdTicketTarget() {
    let content;
        for (let i = 0; i < boardColumns.length; i++) {   
                content = document.getElementById(`board-column-${i}`);
                content.innerHTML += `<div class="onhold-container-last w-100" id="onhold-container-column-${i}-last"></div>`;
        }
}


function renderOnholdTicketTargetResponsive(i) {
    let content;  
    content = document.getElementById(`board-column-${i}`);
    content.innerHTML = `<div class="onhold-container-first w-100" id="onhold-container-column-${i}-first"></div>`;
}