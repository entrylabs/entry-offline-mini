import initializer from './initializer.js'
import entry from '../bower_components/entryjs/dist/entry.js'

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
