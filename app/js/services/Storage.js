/* import SyncStorage */ var SyncStorage = window.SyncStorage;
var storageFactory = function(name) {
    var storage = new SyncStorage.constructor(name, SyncStorage.storage.IndexedDbStorage, ["done", "deleted", "title"])
    storage.promise = storage.init().fail(function(err) {
        console.log(err);
    });
    return storage;
}
module.exports = storageFactory;
