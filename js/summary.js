// #### SUMMARY ####
let months = ['January','February','March','April','May','Jun','Jul','August','September','October','November','December'];


function greet() {
    
    let today = new Date();
    let hour = today.getHours();

    if(guestUser) {
        document.getElementById('user').innerHTML = `Guest`;
        document.getElementById('user2').innerHTML = `Guest`;
    } else {
        document.getElementById('user').innerHTML = getUserName();
        document.getElementById('user2').innerHTML = getUserName();
    }
    
    if (hour < 11 && hour >= 07) {
        document.getElementById('greet').innerHTML = `Good morning,`;
        document.getElementById('greet2').innerHTML = `Good morning,`;
    } else if (hour >= 11 && hour < 18) {
        document.getElementById('greet').innerHTML = `Good day,`;
        document.getElementById('greet2').innerHTML = `Good day,`;
    } else if(hour >= 18) {
        document.getElementById('greet').innerHTML = `Good evening,`;
        document.getElementById('greet2').innerHTML = `Good evening,`;
    }
}


function getUserName() {
    return usersContact[indexOfCurrentUser]['name'];
}


/**
 * This function renders informations about the number of tasks in the categories */
function renderSummary() {
    document.getElementById('task-count1').innerHTML = `${boardColumns[0].length}`;
    document.getElementById('task-count2').innerHTML = `${boardColumns[1].length}`;
    document.getElementById('task-count3').innerHTML = `${boardColumns[2].length}`;

    document.getElementById('task-info-count').innerHTML = `${boardColumns[0].length}`;
    document.getElementById('task-info-count2').innerHTML = `${boardColumns[3].length}`;
    

    // if (task[0]['prior']=='assets/img/green.png') {
    //     document.getElementById('priority-Icon').src = 'assets/img/summary-arrow-up-icon.png';
    // }      

filterPriorities();


}


let urgent = 0;
let mid = 0;
let low = 0;
let upcomingDeadline = 0;


function filterPriorities() {
    if(filterPrios('Urgent')) filterDate('Urgent');
    else if(filterPrios('Medium') > filterPrios('Low')) filterDate('Medium');
    else filterDate('Low');
    renderPriorityContainer(upcomingDeadline);
}


function filterPrios(prio) {
    for (let i = 0; i < boardColumns.length; i++) {
        if(boardColumns[i].length > 0) {
            for (let j = 0; j < boardColumns[i].length; j++) {
                if(boardColumns[i][j]['prior']['name'] == prio) {
                    if(prio == 'Urgent') urgent++;
                    else if(prio == 'Medium') mid++;
                    else if(prio == 'Low') low++;
                }
            }
        }
    }
    if(prio == 'Urgent') return urgent;
    else if(prio == 'Medium') return mid;
    else if(prio == 'Low') return low;
}


// function filterMid() {
//     let mid = 0;
//     for (let i = 0; i < boardColumns.length; i++) {
//         if(boardColumns[i].length > 0) {
//             for (let j = 0; j < boardColumns[i].length; j++) {
//                 if(boardColumns[i][j]['prior']['name'] == 'Medium') mid++;
//             }
//         }
//     }
//     return mid;
// }


// function filterLow() {
//     let low = 0;
//     for (let i = 0; i < boardColumns.length; i++) {
//         if(boardColumns[i].length > 0) {
//             for (let j = 0; j < boardColumns[i].length; j++) {
//                 if(boardColumns[i][j]['prior']['name'] == 'Low') low++;
//             }
//         }
//     }
//     return mid;
// }


function filterDate(prio) {
    let dates = [];
    for (let i = 0; i < boardColumns.length; i++) {
        if(boardColumns[i].length > 0) {
            for (let j = 0; j < boardColumns[i].length; j++) {
                if(boardColumns[i][j]['prior']['name'] == prio) dates.push(boardColumns[i][j]['due-date'].toString());
            }
        }
    }
    if(dates.length > 1) upcomingDeadline = getUpcomingDate(dates);
    else upcomingDeadline = dates[0].split('-');
}


function getUpcomingDate(dates) {
    let splittedDates = [];
    for (let i = 0; i < dates.length; i++) splittedDates.push(dates[i].split('-'));
    return orderDates(splittedDates);
}


function orderDates(dates) {
    let currentDate = dates[0];
    for (let i = 1; i < dates.length; i++) {
        if(currentDate[0] > dates[i][0]) currentDate = dates[i];
        else if(currentDate[0] == dates[i][0]) currentDate = checkMonth(i, dates, currentDate);
    }
    return currentDate;
}


function checkMonth(i, dates, currentDate) {
    if(currentDate[1] > dates[i][1]) currentDate = dates[i];
    else if(currentDate[1] == dates[i][1]) currentDate = checkDay(i, dates, currentDate);
    return currentDate;
}


function checkDay(i, dates, currentDate) {
    if(currentDate[2] > dates[i][2]) currentDate = dates[i];
    return currentDate;
}


function renderPriorityContainer(j) {
    if(urgent >= 1) {
        document.getElementById('priority-Icon').src = 'assets/img/red.png';
        document.getElementById('priority-Icon').classList.add('priority-Icon');
        document.getElementById('priorities-radius').classList.remove('priorities-radius-mid');
        document.getElementById('priorities-radius').classList.remove('priorities-radius-low');
        document.getElementById('priorities-radius').classList.add('priorities-radius-urgent');
        document.getElementById('priority-count').innerHTML = `${urgent}`;
        document.getElementById('priority-text').innerHTML = `Urgent`;
        document.getElementById('date').innerHTML = `${months[parseInt(j[1])-1]} ${j[2]}, ${j[0]}`;
    }
        
    else if(mid > low) {
        document.getElementById('priority-Icon').src = 'assets/img/orange.png';
        document.getElementById('priority-Icon').classList.add('priority-Icon');
        document.getElementById('priorities-radius').classList.remove('priorities-radius-urgent');
        document.getElementById('priorities-radius').classList.remove('priorities-radius-low');
        document.getElementById('priorities-radius').classList.add('priorities-radius-mid');
        document.getElementById('priority-count').innerHTML = `${mid}`;
        document.getElementById('priority-text').innerHTML = 'Mid';
    } else if(low > mid) {
        document.getElementById('priority-Icon').src = 'assets/img/green.png';
        document.getElementById('priority-Icon').classList.add('priorities-Color');
        document.getElementById('priorities-radius').classList.remove('priorities-radius-urgent');
        document.getElementById('priorities-radius').classList.remove('priorities-radius-mid');
        document.getElementById('priorities-radius').classList.add('priorities-radius-low');
        document.getElementById('priority-count').innerHTML = `${low}`;
        document.getElementById('priority-text').innerHTML = 'Low';
    }
}