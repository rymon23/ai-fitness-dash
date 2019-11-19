const REQUEST_INIT = "INIT";
const REQUEST_GET = "GET";
const REQUEST_CREATE = "CREATE";
const REQUEST_UPDATE = "UPDATE";
const REQUEST_DESTROY = "DELETE";


class AFDDataBase {
    constructor() {
        this.dataBaseName = "AFBDataBase"

        this.requestPromise = this.requestPromise.bind(this);
        this.action = this.action.bind(this);
        this.init = this.init.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }

    action(actionType, data = null, callBack) {
        //actionType: create, get, update
        debugger

        const doDbTransaction = (actionType, data, cb) => {
            const openRequest = window.indexedDB.open(this.dataBaseName);
            let db;

            openRequest.onerror = function (e) {
                alert("Open Request error");
                console.log("There was an error: " + e.target.errorCode);
            };

            openRequest.onupgradeneeded = function (e) {
                alert("request upgrade called");
                db = e.target.result;
                db.createObjectStore("data", { keyPath: "gen" });
                // store.createIndex("gen", "gen", { unique: false });
            };

            openRequest.onsuccess = function (e) {
             //   alert("Open Request Successful");
                db = e.target.result;
                db.onerror = function (e) {
                    console.log("ERROR" + e.target.errorCode);
                };

                const openAction = (actionType, newData, cb) => {
                    debugger
                    let myRecord = null;
                    const tx = db.transaction("data", "readwrite");
                    const store = tx.objectStore("data");
                    let objectStoreRequest;

                    if (actionType === "INIT" 
                        || actionType === "GET" 
                        || actionType === "UPDATE" ){

                        objectStoreRequest = store.getAll();

                    }else if (actionType === "CREATE"){
                        objectStoreRequest = store.add(newData);

                    }else if (actionType === "DELETE"){
                        objectStoreRequest = store.clear();
                    };

                    tx.oncomplete = function (event) {
                        console.log("Transaction Completed");
                        cb(myRecord);
                    };
                    tx.onerror = function (event) {
                        alert("Transaction Error:" + event.target.errorCode)
                    };
                    objectStoreRequest.onsuccess = function (event) {
                        console.log("object store request successful");
                        debugger
                        let requestUpdate = {};
                        
                        if (actionType === "UPDATE") {
                            let currentData = objectStoreRequest.result;
                            currentData.gen = newData.gen;
                            currentData.bots = newData.bots;
                            currentData.settings = newData.settings;
                            requestUpdate = store.put(currentData);
                        }else{
                            myRecord = objectStoreRequest.result; 
                        }
                        requestUpdate.onerror = function (event) {
                            alert("Transaction Error:" + event.target.errorCode);
                        };
                        requestUpdate.onsuccess = function (event) {
                            console.log("update request successful");
                            myRecord = requestUpdate.result;
                        };
                    };
                }

                let result = { actionType, resultData: null };

                if (!actionType) {
                    cd(result);

                }else {
                    const actionPromise = new Promise(function (resolve, reject) {
                        const myRecord = openAction(actionType, data, (record) => {
                            debugger
                            resolve(record);
                        });
                    })

                    result.actionType = actionType;
                    actionPromise.then((resultData) => {
                        debugger
                        console.log(`${actionType}: ${resultData} / ${!resultData}`);
                        result.resultData = resultData;
                        cb(result);
                    })
                }
            }
        };

        const doAction = new Promise(function (resolve, reject) {
            const myTransaction = doDbTransaction(actionType, data, (thisTransaction) => {
                debugger
                resolve(thisTransaction);
            });
        });

        doAction.then((result) => {
            debugger
            if (!result) return null;

            let { actionType, resultData } = result;
            callBack(resultData);
        });
    }

    init(cb) {
        return this.requestPromise(REQUEST_INIT, null, cb);
        // const that = this;
        // return new Promise(function (resolve, reject) {
        //     const myResult = that.action(REQUEST_INIT, cb, (response) => {
        //         debugger
        //         resolve(response)
        //     });
        // })
        // this.action(REQUEST_INIT);
    }

    get(data, cb) {
        return this.requestPromise(REQUEST_GET, null, cb);
    }
    create(data, cb) {
        return this.requestPromise(REQUEST_CREATE, data, cb);
    }

    update(data, cb) {
        return this.requestPromise(REQUEST_UPDATE, data, cb);
    }

    destroy(cb) {
        return this.requestPromise(REQUEST_DESTROY, null, cb);
    }

    requestPromise(requestType = null, data = null, cb){
        const that = this;
        return new Promise(function (resolve, reject) {
            const myResult = that.action(requestType, data, (response) => {
                debugger
                resolve(response);
            });
        })        
    }
}

export default AFDDataBase;