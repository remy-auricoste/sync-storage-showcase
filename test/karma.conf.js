module.exports = function(config){
  config.set({

    basePath : '..',

    files : [
      'build/bindWorkaround.js',
      'dist/browserified/tests.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};