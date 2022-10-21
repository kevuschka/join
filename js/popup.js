function renderPopups() {
    let container = document.getElementById('popUp');
    container.innerHTML = renderHeaderLogoutPopup();
}

/**Logout-Popup (Header profile onclick) */
function renderHeaderLogoutPopup() {
    return `<div class="logout-popup-container absolute flex d-none" id="logout-popup-container">
                <div class="logout-spacer"></div>
                <div class="logout flex column cursor-p" onclick="closeLogoutHeaderPopup()">
                    <a href="help.html" class="header-menu-item header-menu-resp d-none">Help</a>
                    <a href="legal_notice.html" class="header-menu-item header-menu-resp d-none">Legal notice</a>
                    <a href="index.html" class="header-menu-item">Log out</a>
                </div>
            </div>`;
}


function logoutHeaderPopup() {
    document.getElementById('logout-popup-container').classList.remove('d-none');
}


function closeLogoutHeaderPopup() {
    document.getElementById('logout-popup-container').classList.add('d-none');
}