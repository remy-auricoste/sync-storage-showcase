/* import SyncStorage */ var SyncStorage = window.SyncStorage;

var storage = new SyncStorage.constructor("todos", SyncStorage.storage.IndexedDbStorage, ["done", "deleted", "title"])
storage.promise = storage.init().fail(function(err) {
    console.log(err);
});

module.exports = storage;
