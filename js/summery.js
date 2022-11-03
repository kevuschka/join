/**
 * This function renders informations about the number of tasks in the categories
 * 
 * 
 */
function renderSummary() {
    document.getElementById('task-count1').innerHTML = `${todo.length}`;
    document.getElementById('task-count2').innerHTML = `${inProgress.length}`;
    document.getElementById('task-count3').innerHTML = `${feedback.length}`;

    document.getElementById('task-info-count').innerHTML = `${todo.length}`;
    document.getElementById('task-info-count2').innerHTML = `${done.length}`;

    

    // if (task[0]['prior']=='assets/img/green.png') {
    //     document.getElementById('priority-Icon').src = 'assets/img/summary-arrow-up-icon.png';
    // }      
}