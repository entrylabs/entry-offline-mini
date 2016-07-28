'use strict';

import {EventEmitter} from 'events';
import serial from './serial';

class router extends EventEmitter{
    constructor() {
        super();
        this.extension;
        this.config;
        this.hardware;
        this.slaveTimer;
        this.local_data = {};
    }

    init() {
        serial.init(this);
        this.on('state', state => {
            console.log(state);
            switch(state) {
                case 'connectDevice': {
                    clearInterval(this.slaveTimer);
                    let {control, duration} = this.hardware;
                    if(control !== 'master' && duration) {
                        this.slaveTimer = setInterval(()=> {
                            let data = this.extension.requestLocalData();
                            serial.write(data);
                        }, duration);
                    }
                    break;
                }
                case 'disconnect': {
                    clearInterval(this.slaveTimer);
                }
            }
        });
        this.on('data', data => {
            var valid = true;
            if(this.extension.validateLocalData) {
                valid = this.extension.validateLocalData(data);
            }
            if(valid) {
                this.extension.handleLocalData(data);
                this.extension.requestRemoteData(this.local_data);
                this.emit('local_data', this.local_data);
            }
            if(this.hardware.control === 'master') {
                let data = this.extension.requestLocalData();
                serial.write(data);
            }
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
        this.config = config;
        this.hardware = config.hardware;
        this.setDefaultLocalData(config);
        serial.startScan(this, this.extension, config);
    }

    stopScan() {
        serial.stopScan();
    }
}

export default new router();
