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
        <div class="contact cursor-p flex" id="contact-withLetter-${letter}-number-${number}">
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