require('./hw.js');

$(document).ready(() => {
    let initOption = {
        type: 'workspace',
        libDir: '../app/bower_components',
    }
    Entry.init(
        document.getElementById('workspace'),
        initOption
    );
    Entry.enableArduino();
    Entry.loadProject();
});
