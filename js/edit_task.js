//colors the priority which is chosen in the task opened to edit
function selectPrioInEditContainer(column, ticket) {
    let id = boardColumns[column][ticket]['prior']['name'];
    let button = document.getElementById(id);
    let index = boardColumns[column][ticket]['prior']['prio-index']
    changePrioImageToWhite(button);
    changePrioBtnColors(button, index)    
}


function saveChanges(columm, ticket) {
    changeValuesForEditedTask(columm, ticket, 'title');
    changeValuesForEditedTask(columm, ticket, 'description');
    changeValuesForEditedTask(columm, ticket, 'due-date');
}


function changeValuesForEditedTask(column, ticket, identifier) {
    boardColumns[column][ticket][identifier] = document.getElementById(identifier).value; //input field id is equal to name of the attribute in the task
}