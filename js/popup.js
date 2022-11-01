/**
 * Prerender alle popup-windows in the popup div.
 */
function renderPopups() {
    let container = document.getElementById('popUp');
    container.innerHTML = renderHeaderMenuPopup();
    container.innerHTML += renderSearchbarPopup();
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


function renderSearchbarPopup() {
    return `<div class="board-header-search-popup-full absolute w-100 d-none" id="board-header-search-input-popup-full" onclick="closeBoardSearchInput()">
                <div class="board-header-search-popup-container w-100 absolute flex">
                    <div class="board-header-search-popup-spacer-left"></div>
                    <input class="board-header-search-input-popup h-100" id="board-header-search-input-popup" type="text" placeholder="Find Task" onkeydown="" focus autofocus onclick="doNotClose(event)">
                    <div class="board-header-search-popup-spacer-right"></div>
                </input>
            </div>`;
}

function closeBoardSearchInput() {
    document.getElementById('board-header-search-input-popup').value = '';
    document.getElementById(`board-header-search-input-popup-full`).classList.add('d-none');
    document.getElementById(`board-header-search-container`).classList.remove('d-none');
}