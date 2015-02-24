module.exports = {
    name: "showcase",
    sourceDir: "app/js",
    sourceFile: "app/js/main",
    deps: {
        Meta: "../meta-js/dist/browserified/Meta.js",
        angular: "node_modules/angular/angular.js",
        angularRoute: "node_modules/angular-route/angular-route.js",
        SyncStorage: "../sync-storage-js/dist/browserified/SyncStorage.js"
    }
};