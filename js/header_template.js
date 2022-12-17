function renderHeader() {
    let content = document.getElementById('header');
    content.innerHTML = `
        <p class="header-title cursor-d">Kanban Project Management Tool</p>
        <div class="header-right-corner flex" id="header-right-corner">
            <a href="help.html"><img class="help-img cursor-p" src="assets/img/question-mark-icon.png"></a>
            <div class="header-profil-container flex cursor-p" id="header-profil-container" onclick="openHeaderMenuPopup()"><img class="header-profil" src="assets/img/sample-profil.jpg"></div>
            <img class="logo-img-resp absolute" src="assets/img/logo-big2.png">
        </div>
        <div class="header-right-corner-addTask flex" id="header-right-corner-addTask">
            <img class="logo-img-resp absolute" src="assets/img/logo-big2.png">
            <button form="myform" value="update" class="create-btn-responsive">
                Create
                <img src="./assets/img/check-small.png">
            </button>
        </div>`;
}