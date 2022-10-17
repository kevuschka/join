let selectedNavItem = 0;


function doNotClose(event) {
    event.stopPropagation();
}

function selectNavItem(n) {
    unselectAllNAvItems();
    selectedNavItem = n;
    document.getElementById(`${n}`).classList.add('selected-nav-item');  
}

function selectPreviewsNavItem() {
    document.getElementById(`${n}`).classList.add('selected-nav-item'); 
}


function unselectAllNAvItems() {
    for (let i = 1; i < 5; i++) document.getElementById(`${i}`).classList.remove('selected-nav-item');
}
