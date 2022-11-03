/**
 * Prerender alle popup-windows in the popup div.
 */
function renderPopups() {
    let container = document.getElementById('popUp');
    container.innerHTML = renderHeaderMenuPopup();
    container.innerHTML += renderBoardSearchbarPopup();
}

/**Logout-Popup (Header profile onclick) */
function renderHeaderMenuPopup() {
    return `<div class="header-menu-container-full absolute d-none" id="header-menu-container-full" onclick="closeHeaderMenuPopup()">
                <div class="header-menu-container absolute flex" onclick="doNotClose(event)">
                    <div class="header-menu-spacer" onclick="closeHeaderMenuPopup()"></div>
                    <div class="header-menu flex column cursor-p" onclick="closeHeaderMenuPopup()">
                        <a href="help.html" class="header-menu-item header-menu-resp d-none">Help</a>
                        <a href="legal_notice.html" class="header-menu-item header-menu-resp d-none">Legal notice</a>
                        <a href="index.html" class="header-menu-item">Log out</a>
                    </div>
                </div>
            </div>`;
}

/**
 * Adding and removing some classes for a slide-in effect when opening the header menu-popup.
 */
function openHeaderMenuPopup() {
    removeClasslist('header-menu-container-full',`d-none`);
    slideIn();
}

/**
 * That function is for letting the header menu-popup slide in, removing the class d-none.
 */
function slideIn() {
    setTimeout(() => {
        addClasslist('header-menu-container-full',`header-menu-popup-slideIn`);
    }, 1);
}

/**
 * Adding and removing some classes for a slide-out effect.
 */
function closeHeaderMenuPopup() {
    removeClasslist('header-menu-container-full',`header-menu-popup-slideIn`);
    addClasslist('header-menu-container-full',`header-menu-popup-slideOut`);
    slideOut();
}

/**
 * That function is for letting the slideout-effect happen without applying d-none directly.
 */
function slideOut() {
    setTimeout(() => {
        addClasslist('header-menu-container-full',`d-none`);
        removeClasslist('header-menu-container-full', `header-menu-popup-slideOut`); 
    }, 125);
}


function renderBoardSearchbarPopup() {
    return `<div class="board-header-search-popup-full absolute w-100 d-none" id="board-header-search-input-popup-full" onclick="closeBoardSearchbarPopup()">
                <div class="board-header-search-popup-container w-100 absolute flex">
                    <div class="board-header-search-popup-spacer-left"></div>
                    <div class="board-header-search-input-and-results-popup h-100 flex column">
                        <input class="board-header-search-input-popup h-100 w-100" id="board-header-search-input-popup" type="text" placeholder="Find Task" onkeyup="taskFilter()" focus autofocus onclick="doNotClose(event)">
                        <div class="board-header-search-results-popup w-100 flex column d-none" id="board-header-search-results-popup"></div>
                    </div>
                    <div class="board-header-search-popup-spacer-right"></div>
                </input>
            </div>`;
}

function closeBoardSearchbarPopup() {
    document.getElementById('board-header-search-input-popup').value = '';
    document.getElementById(`board-header-search-input-popup-full`).classList.add('d-none');
    document.getElementById(`board-header-search-container`).classList.remove('d-none');
    document.getElementById('board-header-search-results-popup').innerHTML = '';
    document.getElementById('board-header-search-results-popup').classList.add('d-none');
}


function taskFilter() {
    let resultsContainer = document.getElementById('board-header-search-results-popup');
    resultsContainer.innerHTML = '';
    let input = document.getElementById('board-header-search-input-popup');
    let inputComparison = input.value.toLowerCase();
    document.getElementById('board-header-search-results-popup').classList.add('d-none');
    if(input.value.length > 0) filterTicketTitles(inputComparison, resultsContainer, 0);
}


function filterTicketTitles(inputComparison, resultsContainer, n) {
    let TeamMemberHere = false;
    for (let i = 0; i < boardColumns.length; i++) {
        if(boardColumns[i].length > 0) {
            for (let j = 0; j < boardColumns[i].length; j++) {
                let ticketCategory = boardColumns[i][j]['category']['name'].toLowerCase();
                let ticketTitle = boardColumns[i][j]['title'].toLowerCase();
                let ticketDescription = boardColumns[i][j]['description'].toLowerCase();
                TeamMemberHere = isTeamMemberHere(i, j, inputComparison);
                if(ticketCategory.includes(inputComparison) || ticketTitle.includes(inputComparison) || ticketDescription.includes(inputComparison) || TeamMemberHere) renderSearchResult(i, j, n, resultsContainer)
            }
        }
    }
}


function isTeamMemberHere(i,j, inputComparison) {
    let isHere = false;
    let member;
    for (let m = 0; m < boardColumns[i][j]['team'].length; m++) {
        member = (boardColumns[i][j]['team'][m]['name'].toLowerCase());
        if(member.includes(inputComparison)) {
            return true;
        }
    }
    return false;
}


function renderSearchResult(i, j, n, resultsContainer) {
    resultsContainer.innerHTML += returnTemplateSearchResult(i, j, n);
    searchResultTeamNames(i, j);
    document.getElementById(`search-result-ticket-category-${i}-${j}-${n}`).style.backgroundColor = `${boardColumns[i][j]['category']['color']}`;
    document.getElementById('board-header-search-results-popup').classList.remove('d-none');
    document.getElementById(`search-result-${i}-${j}-${n}`).classList.add('bold');
}


function returnTemplateSearchResult(i, j, n) {
    return `<a class="search-result flex w-100" href="#ticket-container-${i}-${j}">
                <div class="search-result-p-container w-100 flex column">
                    <p class="search-result-p w-100" id="search-result-${i}-${j}-0">${boardColumns[i][j]['title']}</p>
                    <p class="search-result-p" id="search-result-${i}-${j}-1">${boardColumns[i][j]['description']}</p>
                    <div class="ticket-contacts-container flex" id="search-result-contacts-container-${i}-${j}-2"></div>
                </div>
                <div class="search-result-ticket-category-point" id="search-result-ticket-category-${i}-${j}-${n}"></div>
            </a>`;
}


function searchResultTeamNames(i,j) {
    let content = document.getElementById(`search-result-contacts-container-${i}-${j}-2`);
    for (let k = 0; k < boardColumns[i][j]['team'].length; k++) {
        content.innerHTML += `<div class="search-result-ticket-contact" id="board-contact-${i}-${j}-${k}-2">${getNameLetters(i, j, k)}</div>`;
    }
}




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// function filterTicketTitles(inputComparison, resultsContainer, n) {
//     for (let i = 0; i < boardColumns.length; i++) {
//         if(boardColumns[i].length > 0) {
//             for (let j = 0; j < boardColumns[i].length; j++) {
//                 let ticketTitle = boardColumns[i][j]['title'].toLowerCase();
//                 if(ticketTitle.includes(inputComparison)) {
//                     resultsContainer.innerHTML += returnTemplateSearchResult(i, j, 'title', n);
//                     document.getElementById(`search-result-ticket-category-${i}-${j}-${n}`).style.backgroundColor = `${boardColumns[i][j]['category']['color']}`;
//                     document.getElementById('board-header-search-results-popup').classList.remove('d-none');
//                     document.getElementById(`search-result-${i}-${j}-${n}`).classList.add('bold');
//                 }
//             }
//         }
//     }
// }


// function filterTicketDescription(inputComparison, resultsContainer, n) {
//     for (let i = 0; i < boardColumns.length; i++) {
//         if(boardColumns[i].length > 0) {
//             for (let j = 0; j < boardColumns[i].length; j++) {
//                 let ticketDescription = boardColumns[i][j]['description'].toLowerCase();
//                 if(ticketDescription.includes(inputComparison)) {
//                     resultsContainer.innerHTML += returnTemplateSearchResult(i, j, 'description', n);
//                     document.getElementById(`search-result-ticket-category-${i}-${j}-${n}`).style.backgroundColor = `${boardColumns[i][j]['category']['color']}`;
//                     document.getElementById('board-header-search-results-popup').classList.remove('d-none');
//                     document.getElementById(`search-result-${i}-${j}-${n}`).classList.add('italic');
//                 }
//             }
//         }
//     }
// }


// function returnTemplateSearchResult(i, j, name, n) {
//     return `<a class="search-result flex w-100" href="#ticket-container-${i}-${j}">
//                 <p class="search-result-p" id="search-result-${i}-${j}-${n}">${boardColumns[i][j][name]}</p>
//                 <div class="search-result-ticket-category-point" id="search-result-ticket-category-${i}-${j}-${n}"></div>
//             </a>`;
// }//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


/* <div class="search-result-ticket-category-container flex">
                    <p class="search-result-ticket-category" id="search-result-ticket-category-${i}-${j}-${n}">${boardColumns[i][j]['category']['name']}</p>
                </div> */
