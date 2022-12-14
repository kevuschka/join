function renderContactsList() {
    let list = document.getElementById(`contacts-list`);
    list.innerHTML = '';
    filterContacts(list);
}

function filterContacts(list) {
    let contactNumber = 0;
    for (let i = 0; i < alphabet.length; i++) {
        let contactNumberAtThisLetter = 0;
        for (let j = 0; j < contacts.length; j++) {
            if(alphabet[i] == contacts[j]['name'].toLowerCase().charAt(0)) {
                contactNumber++;
                contactNumberAtThisLetter++;
                if(contactNumberAtThisLetter == 1) renderTemplateListLetter(alphabet[i].toUpperCase(), list);
                renderListLetterContacts(alphabet[i].toUpperCase(), contactNumberAtThisLetter, j);
            }
            if(contactNumber == contacts.length) break;
        }
        if(contactNumber == contacts.length) break;
    }
}


function renderTemplateListLetter(letter, list) {
    list.innerHTML += `
        <div class="contacts-container-withLetter column flex">
            <p>${letter}</p>
            <div class="container-with-contacts column flex" id="contacts-with-${letter}"></div>
        </div>`
}

function renderListLetterContacts(letter, number, j) {
    let content = document.getElementById(`contacts-with-${letter}`);
    content.innerHTML +=  renderTemplateListLetterContact(letter, number, j);
    contactAbbreviationColoring(letter, number, j);
}


function renderTemplateListLetterContact(letter, number, j) {
    return `
        <div class="contact cursor-p flex" id="contact-withLetter-${letter}-number-${number}" onclick="openContactInfoPopup(${j}, '${letter}', ${number})">
            <div class="contact-abbreviation-wrapper flex" id="contact-abbreviation-wrapper-${letter}-${number}">
                <p class="contact-abbreviation">${contacts[j]['abbreviation']}</p>
            </div>
            <div class="contact-name-wrapper column flex">
                <p class="contact-name">${contacts[j]['name']}</p>
                <p class="contact-email">${contacts[j]['email']}</p>    
            </div>
        </div>`
}


function contactAbbreviationColoring(letter, number, j) {
    document.getElementById(`contact-abbreviation-wrapper-${letter}-${number}`).style.backgroundColor = `${contacts[j]['color']}`;
}


function openContactInfoPopup(index, letter, number) {
    if(window.innerWidth > 800) showContactInfoPopup(index, letter, number);
    else showContactInfoPopupResponsive(index);
}


function showContactInfoPopup(index, letter, number) {
    removeClasslist('contacts-info-popup-container', 'contact-info-popup-visible');
    setTimeout(() => {
        changebackgroundColorOfSelectedContact(letter, number);
        renderContactInfoPopup(index);
        contactInfoPopupAbbreviationColoring(index);
        addClasslist('contacts-info-popup-container', 'contact-info-popup-visible');
    }, 125);
}


function changebackgroundColorOfSelectedContact(letter, number) {
    renderContactsList();
    document.getElementById(`contact-withLetter-${letter}-number-${number}`).style.backgroundColor = "#2A3647";
    document.getElementById(`contact-withLetter-${letter}-number-${number}`).style.color = "#ffffff";
    document.getElementById(`contact-abbreviation-wrapper-${letter}-${number}`).style.border = `1px solid white`;
}

function renderContactInfoPopup(i) {
    let popupContainer = document.getElementById('contacts-info-popup-container');
    popupContainer.innerHTML = renderTemplateContactInfoPopup(i);
    let content = document.getElementById(`contact-info-popup`);
    content.innerHTML = renderTemplateContactInfoPopupAbbreviationAndName(i);
    content.innerHTML += renderTemplateContactInfoPopupTitleAndEditContactBtn(i);
    content.innerHTML += renderTemplateContactInfoPopupEmailAndPhone(i);
}


function renderTemplateContactInfoPopup(i) {
    return `<div class="contact-info-popup column flex" id="contact-info-popup"></div>`;
}


function renderTemplateContactInfoPopupAbbreviationAndName(i) {
    return `<div class="contact-info-popup-abbreviation-and-name flex">
                <div class="contact-info-popup-abbreviation-wrapper">
                    <div class="contact-abbreviation-wrapper contact-info-popup-abbreviation flex" id="contact-info-popup-abbreviation-${i}">
                        <p class="contact-abbreviation">${contacts[i]['abbreviation']}</p>
                    </div>
                </div>
                <div class="contact-info-popup-name-and-addtask column flex">
                    <p>${contacts[i]['name']}</p>
                    <div class="contact-info-popup-addTask-btn flex cursor-p" onclick="openBoardAddtaskPopup()">
                        <p>+</p>
                        <p>Add Task</p>
                    </div>
                </div>
            </div>`;
}


function renderTemplateContactInfoPopupTitleAndEditContactBtn(i) {
    return `<div class="contact-info-popup-title-and-editContactBtn flex">
                <p>Contact Information</p>
                <div class="contact-info-popup-editContact-btn cursor-p" onclick="openContactsNewContactPopup(${i})">
                    <img src="assets/img/profil-edit-contact-icon.png">
                    <p>Edit Contact</p>
                </div>
            </div>`;
}


function renderTemplateContactInfoPopupEmailAndPhone(i) {
    return `<div class="contact-info-popup-email-and-phone column flex">
                <div class="contact-info-popup-email-wrapper column flex">
                    <p>Email</p>
                    <p>${contacts[i]['email']}</p>
                </div>
                <div class="contact-info-popup-phone-wrapper column flex">
                    <p>Phone</p>
                    <p>${contacts[i]['phone']}</p>
                </div>
            </div>`;
}


function contactInfoPopupAbbreviationColoring(index) {
    document.getElementById(`contact-info-popup-abbreviation-${index}`).style.backgroundColor = `${contacts[index]['color']}`;
    // addClasslist(`contact-info-popup-abbreviation-${index}`, `contact-info-popup-abbreviation`);
}


function makeValueContactsAddtoTrue() {
    contacts_add = true;
}

function makeValueContactsAddToFalse() {
    contacts_add = false;
}