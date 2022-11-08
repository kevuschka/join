function renderHeader() {
    let content = document.getElementById('header');
    content.innerHTML = `
        <p class="header-title cursor-d">Kanban Project Management Tool</p>
        <div class="header-right-corner flex" id="header-right-corner">
            <a href="help.html"><img class="help-img cursor-p" src="assets/img/question-mark-icon.png"></a>
            <div class="header-profil-container flex cursor-p" onclick="openHeaderMenuPopup()"><img class="header-profil" src="assets/img/sample-profil.jpg"></div>
            <img class="logo-img-resp absolute d-none" src="assets/img/logo-big2.png">
        </div>
        <div class="header-right-corner-add-task d-none flex" id="header-right-corner-add-task">
            <img class="logo-img-resp absolute d-none" src="assets/img/logo-big2.png">
            <div class="header-create-btn cursor-p h-100 flex">
                <p>Create</p>
                <img src="assets/img/check-small.png">
            </div>
        </div>`;
    whenItsAddtask();
}

function whenItsAddtask() {
    if(window.location.pathname.includes('add_task.html') && (window.innerWidth < 801)) {
        document.getElementById('header-right-corner').classList.add('d-none');
        document.getElementById('header-right-corner-add-task').classList.remove('d-none');
    }
}

window.onresize = function() {
    if(window.location.pathname.includes('add_task.html') && (window.innerWidth < 801)) {
        document.getElementById('header-right-corner').classList.add('d-none');
        document.getElementById('header-right-corner-add-task').classList.remove('d-none');
    } else {
        document.getElementById('header-right-corner').classList.remove('d-none');
        document.getElementById('header-right-corner-add-task').classList.add('d-none');
    }
}