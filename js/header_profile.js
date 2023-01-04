/** That object is important to store data for displaying the user-profil in the top right corner on the header (not important if guest-login used)
 * Familiar functions: setCurrentUserHeaderData(user) (access.js), getCurrentUserHeaderData()
*/
let currentUserHeaderData = {
    'abbreviation': '',
    'color': '',
};


let guestUser = false;


/**
 * Data to load on every page the header-profile, if user is registered
 * @param {JSON} user - json object/user info, that is registered.
 */
function setCurrentUserHeaderData(user) {
    currentUserHeaderData['abbreviation'] = user['abbreviation'];
    currentUserHeaderData['color'] = user['color'];
    localStorage.setItem('currentUserHeaderData', JSON.stringify(currentUserHeaderData));
}


function getCurrentUserHeaderData() {
    let currentUserHeaderDataAsText = localStorage.getItem('currentUserHeaderData') || '';
    if(currentUserHeaderDataAsText) {
        currentUserHeaderData['abbreviation'] = JSON.parse(currentUserHeaderDataAsText).abbreviation;
        currentUserHeaderData['color'] = JSON.parse(currentUserHeaderDataAsText).color;
        return true;
    } else return false;
}


function setGuestUser() {
    guestUser = true;
    localStorage.setItem('guestUser', JSON.stringify(guestUser));
    window.location.href = 'summary.html';
}


// function getGuestUser() {
//     let guestUserAsText = localStorage.getItem('guestUser', JSON.stringify(guestUser)) || '';
//     if(guestUserAsText) {
//         guestUser = JSON.parse(guestUserAsText);
//         return true;
//     } else return false;
// }


function isGuestUser() {
    guestUser = localStorage.getItem('guestUser') || '';
    if(guestUser) return true;
    else return false;
}