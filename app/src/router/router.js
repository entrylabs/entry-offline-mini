'use strict';

import util from 'util';
import {EventEmitter} from 'events';
import serial from './serial';

class router{
    constructor() {
        EventEmitter.call(this);
        this.extension;
        this.local_data = {};
    }

    init() {
        // this.emit('state', 'init');
        serial.init(this);
        this.on('state', (data)=> {
            console.log(data);
        });
        this.on('data', (data)=> {
            var valid = true;
            if(this.extension.validateLocalData) {
                valid = this.extension.validateLocalData(data);
            }
            if(valid) {
                this.extension.handleLocalData(data);
                this.extension.requestRemoteData(this.local_data);
                this.emit('local_data', this.local_data);
            }
            let bytes = this.extension.requestLocalData();
            serial.write(bytes);
        });
        this.on('remote_data', (data)=> {
            this.extension.handleRemoteData(data);
        });
    }

    setDefaultLocalData(config) {
        let company = config.id.slice(0, 2);
        let model = config.id.slice(2, 4);
        let version = config.id.slice(4, 6);
        this.local_data = {
            company: parseInt(company, 16) & 0xff,
            version: parseInt(version, 16) & 0xff,
            model: parseInt(model, 16) & 0xff
        }
    }

    startScan(config) {
        this.extension = require(`../../hw_modules/${config.module}`);
        this.setDefaultLocalData(config);
        serial.startScan(this, this.extension, config);
    }

    stopScan() {
        serial.stopScan();
    }
}

util.inherits(router, EventEmitter);

export default new router();
