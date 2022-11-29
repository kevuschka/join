
function connectCurrentTaskAndTask(column, ticket) {
    task = boardColumns[column][ticket];
}


//colors the priority which is chosen in the task opened to edit
function selectPrioInEditContainer(column, ticket) {
    let id = boardColumns[column][ticket]['prior']['name'];
    let button = document.getElementById(id);
    let index = boardColumns[column][ticket]['prior']['prio-index']
    changePrioImageToWhite(button);
    changePrioBtnColors(button, index)    
}


