window._ = require('underscore');
window.jquery = window.$ = window.jQuery = require('../bower_components/jquery/dist/jquery.min.js');

export default function init(){
    if(!localStorage.getItem('lang')) {
        localStorage.setItem('lang', 'ko');
    }
    let userLang = localStorage.getItem('lang');
    let userLnagScript = document.createElement('script');
    var {Lang} = require(`../bower_components/entryjs/extern/lang/${userLang}.js`);
    window.Lang = Lang;
    var {EntryStatic} = require('../bower_components/entryjs/extern/util/static_mini.js');
    window.EntryStatic = EntryStatic;
    window.Blockly = {
        Blocks: {}
    };
}
init();
