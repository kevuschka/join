async function initAddTask() {
    await renderResponsiveHeaderTitle(); //in script.js
    await includeHTML();
    clearTask();
    renderAddTask();  //in add_task.js
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "assets/templates/task_form.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML += await resp.text();
        } else {
            element.innerHTML += 'Page not found';
        }
    }
}

//basic task structure
function clearTask() {
    task = { 
        'category': '',
        'title': '',
        'description': '',
        'process': 0,
        'subtasks': 0,
        'team': [],
        'prior': '',
        'board': 0,
        'due-date': '',
    };
}