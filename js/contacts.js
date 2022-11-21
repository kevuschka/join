function renderContactsList() {
    let list = document.getElementById(`contacts-list`);
    list.innerHTML = '';
    filterContacts();
}

function filterContacts(list) {
    let contactNumber = 0;
    for (let i = 0; i < alphabet.length; i++) {
        let contactNumberAtThisLetter = 0;
        for (let j = 0; j < contacts.length; j++) {
            if(contactNumber == contacts.length) break;
            if(alphabet[i] == contacts[j]['name'].charAt(0).toLowerCase()) {
                contactNumber++;
                contactNumberAtThisLetter++;
                if(contactNumberAtThisLetter == 1) renderListLetter(alphabet[i].toUpperCase(), list);
            }

            
        }
        if(contactNumber == contacts.length) break;

    }
}


function renderListLetter(x, list) {
    list.innerHTML += `<div></div>`
}