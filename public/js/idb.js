//CREATE A VAR TO HOLD THE DB CONNECTION
let db;
//ESTABLISH A CONNECTION TO INDEXEDDB CALLED 'KEEP_BUDGET' AND SET TO VERSION 1
const request = indexedDB.open('keep_budget', 1);

//THIS EVENT WILL EMIT IF THE DB VERSION CHANGES
request.onupgradeneeded = function (event) {
    //SAVE A REFERENCE TO THE DATABASE
    const db = event.target.result;
    //CREATE AN OBJECT STORE(TABLE) CALLED 'NEW_BUDGET', SET TO HAVE A SIM SQL AUTO INCREMENTING PRIMARY KEY
    db.createObjectStore('new_budget', { autoIncrement: true });
};

//ADDITIONAL EVENT LISTENERS
//UPON SUCCESS
request.onsuccess = function (event) {
    //WHEN DB IS OK - CREATED W OBJECT STORE - OR - EST. A CONNECTION = SAVE A REF TO THE DB IN  GLOBAL VAR
    db = event.target.result;

    //CHECK IF APP IS ONLINE --> IF YOU RUN UPLOADBUDGET() AND SEND ALL LOCAL DB DATA TO API
    if (navigator.online) {
        //ADD FUNCTION TO UPLOADBUDGET();
        uploadBudget();
    }
};

request.onerror = function (event) {
    //LOG ERR HERE
    console.log(event.target.errorCode);
};

//NO INTERNET CONNECTION
function saveRecord(record) {
    //OPEN A NEW TRANSACTION W THE DB W READ AND WRITE PERMISSIONS
    const transaction = db.transaction(['new_budget'], 'readwrite');

    //ACCESS THE OBJECT STORE FOR `NEW_BUDGET`
    const budgetObjectStore = transaction.objectStore('new_budget');

    //ADD RECORD TO YOUR STORE W ADD METHOD
    budgetObjectStore.add(record);
}


function uploadBudget() {
    //OPEN A TRANSACTION ON YOUR DB
    const transaction = db.transaction(['new_budget'], 'readwrite');

    //ACCESS THE OBJECT STORE
    const budgetObjectStore = transaction.objectStore('new_budget');

    //SET ALL RECORDS TO A VARIABLE
    const getAll = budgetObjectStore.getAll();

    getAll.onsuccess = function () {
        //SEND LOCALLY STORED DATA FROM INDEXEDDB'S STORE TO THE API'S SERVER USING A FETCH()
        if (getAll.result.length > 0) {
            fetch('/api/transactions/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }
                    //OPEN ONE MORE TRANSACTION
                    const transaction = db.transaction(['new_transaction'], 'readwrite');
                    const budgetObjectStore = transaction.objectStore('new_budget');
                    //CLEAR-OUT STORE
                    budgetObjectStore.clear();

                    alert('All saved budget has been submitted!');
                })
                .catch(err => {
                    //REDIRECT REFERENCE
                    console.log(err);
                });
        }
    };
}

//LISTEN FOR APP TO COME BACK ONLINE
window.addEventListener('online', uploadBudget);
