/* import myApp */ var myApp = require('./myApp');

'use strict';

var firstCapital = function(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
}

var object = {
    addTemplate: function(name, params, linkFct) {
        var directiveName = "d"+firstCapital(name);
        //logger.debug("add directive " + directiveName);
        myApp.directive(directiveName, function() {
            var result = {
                scope: params,
                templateUrl: "js/component/"+name+".html",
                transclude: params.transclude === true
            };
            if (params.transclude) {
                delete params.transclude;
            }
            if (linkFct) {
                result.link = linkFct;
            }
            return result;
        });
    }
}


module.exports = object;
