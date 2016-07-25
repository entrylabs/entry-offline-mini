'use strict';

import {EventEmitter} from 'events';
import Scanner from './scanner';

function init() {
    EventEmitter.call(this);
}

function startScan() {
    Scanner.startScan();
}

function stopScan() {
    Scanner.stopScan();
}

const Router = {
    init
}; 
export default Router;
