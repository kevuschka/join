/////////////////// CONTACTS SECTION ////////////////////
//colors the priority which is chosen in the task opened to edit
function selectPrioInEditContainer(column, ticket) {
    let id = boardColumns[column][ticket]['prior']['name'];
    let button = document.getElementById(id);
    let index = boardColumns[column][ticket]['prior']['prio-index']
    changePrioImageToWhite(button);
    changePrioBtnColors(button, index)    
}


/////////////////// CONTACTS SECTION ////////////////////

//Display the Assigned contacts with a check and display them in their Initials below the Dropdown
function renderAlreadyAssignedContacts(column, ticket) {
    let assignedContacts = getAssignedContacts(column, ticket);
    for (let i = 0; i < assignedContacts.length; i++) { 
        for (let j = 0; j < contacts.length; j++) {
            //compare email of all contacts with them assigned to the task 
            if (boardColumns[column][ticket]['team'][i]['email'] == contacts[j]['email']) { 
                displayAssignedContactsAsChecked(j);
                changeDisplayInContactIconSection(j); //in add_task.js -> same as if contact would have been clicked
                break
            }
        }
    }
}


//without that we cannot use .length  (Does not work on a Json Object)
function getAssignedContacts(column, ticket) {
    let assignedContacts = [];
    for (let i = 0; i < Object.keys(boardColumns[column][ticket]['team']).length; i++) {
        assignedContacts.push(boardColumns[column][ticket]['team'][i]);
    }
    return assignedContacts;
}


function displayAssignedContactsAsChecked(j) {
    document.getElementById('checkbox' + j).checked = true;
}


/////////////////// FINISH EDIT ////////////////////

function saveChanges(columm, ticket) {
    changeValuesForEditedTask(columm, ticket, 'title');
    changeValuesForEditedTask(columm, ticket, 'description');
    changeValuesForEditedTask(columm, ticket, 'due-date');
}


function changeValuesForEditedTask(column, ticket, identifier) {
    boardColumns[column][ticket][identifier] = document.getElementById(identifier).value; //input field id is equal to name of the attribute in the task
}


//clears the contacts array which is needed to know which contacts abbreviations should be displayed
function clearContactIconArray() {
    contactIconArray = [];
}



