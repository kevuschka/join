function renderPopups() {
    let container = document.getElementById('popUp');
    container.innerHTML = renderHeaderLogoutPopup();
}

/**Logout-Popup (Header profile onclick) */
function renderHeaderLogoutPopup() {
    return `<div class="logout-popup-container absolute flex d-none" id="logout-popup-container">
                <div class="logout-spacer"></div>
                <div class="logout flex cursor-p" onclick="closeLogoutHeaderPopup()">
                    <p>Log out</p>
                </div>
            </div>`;
}


function logoutHeaderPopup() {
    document.getElementById('logout-popup-container').classList.remove('d-none');
}


function closeLogoutHeaderPopup() {
    document.getElementById('logout-popup-container').classList.add('d-none');
}