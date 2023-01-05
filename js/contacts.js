/** That function renders the contact list on the contacts.html page. */
function renderContactsList() { 
    let list = document.getElementById(`contacts-list`);
    list.innerHTML = '';
    if(contacts.length > 0 ) filterContacts(list);
}

/** That function filters all contacts saved in the array 'contacts' and shows them in a ordered list.
 * @param {div} list - list is the content of a html div with id 'contacts-list' */
function filterContacts(list) {
    let contactNumber = 0;
    for (let i = 0; i < alphabet.length; i++) {
        let contactNumberAtThisLetter = 0;
        filterContactsLoop(list, contactNumber, contactNumberAtThisLetter, i);
        if(contactNumber == contacts.length) break;
    }
}

/** That function filters all contacts saved in the array 'contacts' in a loop and renders, if necessary, the right first letter.
 * @param {div} list - list is the content of a html div with id 'contacts-list'
 * @param {number} contactNumber - contactNumber is the index of the contact in the array 'contacts' 
 * @param {number} contactNumberAtThisLetter - contactNumberAtThisLetter is the number of contacts at this current first letter
 * @param {number} i - i is the index of a letter from the array 'alphabet' */
function filterContactsLoop(list, contactNumber, contactNumberAtThisLetter, i) {
    for (let j = 0; j < contacts.length; j++) {
        if(alphabet[i] == contacts[j]['name'].toLowerCase().charAt(0)) {
            contactNumber++;
            contactNumberAtThisLetter++;
            if(contactNumberAtThisLetter == 1) renderTemplateListLetter(alphabet[i].toUpperCase(), list);
            renderListLetterContacts(alphabet[i].toUpperCase(), contactNumberAtThisLetter, j);
            if(createdContactName == contacts[j]['name'].toLowerCase()) setContactValuesForLinking(j, alphabet[i].toUpperCase(), contactNumberAtThisLetter);
        }
        if(contactNumber == contacts.length) break;
    }
}

/** Return a contact container with a first letter template
 * @param {div} list - list is the content of a html div with id 'contacts-list'
 * @param {string} letter - letter is the currrent letter of the array 'alphabet'  */
function renderTemplateListLetter(letter, list) {
    list.innerHTML += `
        <div class="contacts-container-withLetter column flex">
            <p>${letter}</p>
            <div class="container-with-contacts column flex" id="contacts-with-${letter}"></div>
        </div>`
}

/** That function renders the contact element in the contact list at the right letter.
 * @param {number} j - j is the index of the contact in the array 'contacts' 
 * @param {number} number - number is the number of contacts at this current first letter
 * @param {string} letter - letter is the currrent letter of the array 'alphabet' */
function renderListLetterContacts(letter, number, j) {
    let content = document.getElementById(`contacts-with-${letter}`);
    content.innerHTML +=  renderTemplateListLetterContact(letter, number, j);
    contactAbbreviationColoring(letter, number, j);
}

/** Return a contact element template for the contact list.
 * @param {number} j - j is the index of the contact in the array 'contacts' 
 * @param {number} number - number is the number of contacts at this current first letter
 * @param {string} letter - letter is the currrent letter of the array 'alphabet' */
function renderTemplateListLetterContact(letter, number, j) {
    return `
        <div class="contact cursor-p flex" id="contact-withLetter-${letter}-number-${number}" onclick="openContactInfoPopup(${j}, '${letter}', ${number})">
            <a class="d-none" href="#contact-withLetter-${letter}-number-${number}" id="contact-link-withLetter-${letter}-number-${number}"></a>
            <div class="contact-abbreviation-wrapper flex" id="contact-abbreviation-wrapper-${letter}-${number}">
                <p class="contact-abbreviation">${contacts[j]['abbreviation']}</p>
            </div>
            <div class="contact-name-wrapper column flex">
                <p class="contact-name">${contacts[j]['name']}</p>
                <p class="contact-email">${contacts[j]['email']}</p>    
            </div>
        </div>`
}

/** That function colors the contact abbreviation in the contact list.
 * @param {number} j - j is the index of the contact in the array 'contacts' 
 * @param {number} number - number is the number of contacts at this current first letter
 * @param {string} letter - letter is the currrent letter of the array 'alphabet' */
function contactAbbreviationColoring(letter, number, j) {
    document.getElementById(`contact-abbreviation-wrapper-${letter}-${number}`).style.backgroundColor = `${contacts[j]['color']}`;
}


function openContactInfoPopup(index, letter, number) {
    setContactValuesForLinking(index, letter, number); // used for moving to contact after editting (not necessary in responsive) (l. 170)
    if(window.innerWidth > 800) showContactInfoPopup(index, letter, number);
    else showContactInfoPopupResponsive(index);
}


function setContactValuesForLinking(index, letter, number) {
    cleanContactValues();
    contactValues['index'] = index;
    contactValues['letter'] = `${letter}`;
    contactValues['number'] = number;
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
                <div class="contact-info-popup-editContact-btn cursor-p" onclick="setContactValuesForEditting(${i});openContactsNewContactPopup(${i})">
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


///////////////////////// CREATE  OR  SAVE   NEW CONTACT ////////////////////////////////////
async function creatingOrSavingContact() {
    if(await createContact()) {
        closeContactsNewContactPopupFilled(); 
        renderContactsList();
        MoveToContact();
        showPopupWhenCreatedContact();
    } else {
        closeContactsNewContactPopupFilled();
        showPopupWhenNotCreatedContact();
    }
}


async function createContact() {
    setContactNameForLinking(); // used for moving to contact after creating (not necessary in responsive) (l. 63)
    if(addAllInputValuesToContact()) {
        if(edittingNewContact) saveAllInputValuesToContact();
        else contacts.push(newContact);
        await addContact();
        clearNewContact();
        return true;
    } else return false;
}


function addAllInputValuesToContact() {
    if(addInputValuesToContact('email')){
        addInputValuesToContact('name');
        addInputValuesToContact('phone');
        addAbbreviationToContact('name');
        addColorToContact('color');
        return true;
    } else return false;
}

/**
 * The function, to assign the values getting by the user to the 'new contact' JSON object. 
 * You'll find a similar function in add_task.js in line 476.
 * @param {string} identifier - ID of the input fields in the popup 'new contact' on the contacts-site.
 */
function addInputValuesToContact(identifier) {
    if(identifier == 'email') {
        if(emailIsUnique(document.getElementById(identifier).value)) {
            newContact[identifier] = document.getElementById(identifier).value;
            return true; 
        }
        else return false;
    }else newContact[identifier] = document.getElementById(identifier).value; 
}


function emailIsUnique(email) {
    for (let i = 0; i < contacts.length; i++) {
        if(!(isEmailUnique(i, email))) return false;
    }
    return true;
}


function isEmailUnique(i, email) {
    if(i < usersContact.length) {
        if(emailIsInUsersOrContacts(i, email)) return false;
        else return true;
    } 
    else if(emailIsInContacts(i, email)) return false; 
    else return true;
}


function emailIsInUsersOrContacts(i, email) {
    if(email == usersContact[i]['email'] || (email == contacts[i]['email'])) {
        return true; 
    }
}


function emailIsInContacts(i, email) {
    if(email == contacts[i]['email'])  {
        return true; 
    }
}


function addAbbreviationToContact(identifier) {
    newContact['abbreviation'] =  getNameLetters(document.getElementById(identifier).value);
}


function addColorToContact(identifier) {
    newContact[identifier] = colors[getRandomNumberFromZeroToNine()];
}


function setContactNameForLinking() {
    createdContactName = document.getElementById('name').value.toLowerCase();
}


// SAVE
function saveAllInputValuesToContact() {
    saveInputValuesToContact('name');
    saveInputValuesToContact('email');
    saveInputValuesToContact('phone');
    saveInputValuesToContact('abbreviation');
}


function saveInputValuesToContact(identifier) {
    contacts[indexOfChoosedContactToEdit][identifier] = newContact[identifier]; // because newContact is already created and for less code
}

/** That function will be started, if the user chooses to edit an existing contact. The function changes the variable
 * 'edittingNewContact' to true and gives the undefined variable 'choosedContactToEdit' the right index.
 * @param {number} index - Thats the index of the contact-object in the array 'contacts' which will be editted */
function setContactValuesForEditting(index) {
    edittingNewContact = true;
    indexOfChoosedContactToEdit = index;
}


function cleanValuesForEdittingContact() {
    edittingNewContact = false;
    indexOfChoosedContactToEdit = -1;
}

/**
 * basic contact structure
 */
function clearNewContact() {
    newContact = {
        'name': '',
        'color': '',
        'email': '',
        'phone': '',
        'abbreviation': '',
    };
}


function MoveToContact() {
    // if(window.innerWidth > 800) document.getElementById(`contact-link-withLetter-${contactValues['letter']}-number-${contactValues['number']}`).click(); 
    /*else*/ 
        setTimeout(() => {
            document.getElementById(`contact-link-withLetter-${contactValues['letter']}-number-${contactValues['number']}`).click();
            // document.getElementById(`contact-withLetter-${contactValues['letter']}-number-${contactValues['number']}`).click();
        }, 150);
}


function showPopupWhenCreatedContact() {
    if(!edittingNewContact) showPopupCreatedContact();
}

// CONTACT CREATED
function showPopupCreatedContact() {
    removeClasslist(`pop-up-created-contact-full`, `d-none`);
    setTimeout(() => {
        removeClasslist(`contact-is-created-popup`,`d-none`);
        addClasslist(`pop-up-created-contact`,`background-color-blue`);
        addClasslist(`pop-up-created-contact`,`contacts-created-popup-slideUp`);
    }, 400);
    hidePopupCreatedContact();
}

// CONTACT NOT CREATED
function showPopupWhenNotCreatedContact() {
    removeClasslist(`pop-up-created-contact-full`, `d-none`);
    setTimeout(() => {
        removeClasslist(`contact-is-not-created-popup`,`d-none`);
        addClasslist(`pop-up-created-contact`,`background-color-red`);
        addClasslist(`pop-up-created-contact`,`contacts-created-popup-slideUp`);
    }, 400);
    hidePopupCreatedContact();
}


function hidePopupCreatedContact() {
    setTimeout(() => {
        removeClasslist(`pop-up-created-contact`,`contacts-created-popup-slideUp`);
    }, 1300);
    setTimeout(() => {
        cleaningTheCreatedContactPopupClasslists();
    }, 1430);
}


function cleaningTheCreatedContactPopupClasslists() {
    addClasslist(`contact-is-created-popup`, `d-none`);
    addClasslist(`contact-is-not-created-popup`, `d-none`);
    removeClasslist(`pop-up-created-contact`,`background-color-blue`);
    removeClasslist(`pop-up-created-contact`,`background-color-red`);
    addClasslist(`pop-up-created-contact-full`, `d-none`);
}


function cleanContactValues() {
    contactValues = {
        'index' : '',
        'letter' : '',
        'number' : '',
    };
}