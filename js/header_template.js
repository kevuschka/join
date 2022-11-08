function renderHeader() {
    let content = document.getElementById('header');
    content.innerHTML = renderTemplateHader();
    whenItsAddtask();
}

function renderTemplateHader() {
    return `
    <p class="header-title cursor-d">Kanban Project Management Tool</p>
    <div class="header-right-corner flex" id="header-right-corner">
        <a href="help.html"><img class="help-img cursor-p" src="assets/img/question-mark-icon.png"></a>
        <div class="header-profil-container flex cursor-p" id="header-profil-container" onclick="openHeaderMenuPopup()"><img class="header-profil" src="assets/img/sample-profil.jpg"></div>
        <img class="logo-img-resp absolute d-none" src="assets/img/logo-big2.png">
    </div>`;
}

function whenItsAddtask() {
    if(window.location.pathname.includes('add_task.html') && (window.innerWidth < 801)) document.getElementById('header-profil-container').classList.add('d-none');
}

window.onresize = function() {
    if (window.location.pathname.includes('add_task.html') && (window.innerWidth < 801)) document.getElementById('header-profil-container').classList.add('d-none');
    else document.getElementById('header-profil-container').classList.remove('d-none');
}