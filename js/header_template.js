function renderHeader() {
    let content = document.getElementById('header');
    content.innerHTML = `
        <p class="cursor-d">Kanban Project Management Tool</p>
        <div class="header-right-corner flex">
            <img class="help-img cursor-p" src="assets/img/question-mark-icon.png" onclick="renderHelp()">
            <div class="header-profil-container flex cursor-p" onclick="logoutHeaderPopup()"><img class="header-profil" src="assets/img/sample-profil.jpg"></div>
        </div>`;
}