//selects the priority which is selected by the task which should be edited
function connectCurrentTaskAndTask(column, ticket) {
    task = boardColumns[column][ticket];
}

function selectPrioInEditContainer(column, ticket) {
    let id = boardColumns[column][ticket]['prior']['name'];
    let button = document.getElementById(id);
    let index = boardColumns[column][ticket]['prior']['prio-index']
    changePrioImageToWhite(button);
    changePrioBtnColors(button, index)    
}


