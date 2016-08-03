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
        this.localData = {};
        this.isConnectState = false;
        this.lostTimer;
        this.received = false;
        this.isSendState = false;
    }

    init() {
        serial.init(this);
        this.on('state', ({state}) => {
            console.log(state);
            switch(state) {
                case 'connectDevice': {
                    this.setConnect(true);
                    clearInterval(this.slaveTimer);
                    let {control, duration} = this.hardware;
                    if(control !== 'master' && duration) {
                        this.slaveTimer = setInterval(()=> {
                            if(this.isSendState) {
                                let data = this.extension.requestLocalData();
                                serial.write(data);
                            }
                        }, duration);
                    }

                    this.lostTimer = setInterval(()=> {
                        if(this.isConnect()) {
                            if(this.received == false) {
                                this.setConnect(false);
                                this.emit('state', { state : 'lostDevice' });
                                serial.removeDevice(serial.sp.path);
                                this.startScan(this.config);
                            }
                            this.received = false;
                        }
                    }, 1000);

                    break;
                }

                case 'disconnectDevice': {
                    this.setConnect(false);
                    clearInterval(this.slaveTimer);
                    clearInterval(this.lostTimer);
                    break;
                }

                case 'lostDevice': {
                    this.setConnect(false);
                    break;
                }
            }
        });
        this.on('data', data => {
            var valid = true;
            if(this.extension.validateLocalData) {
                valid = this.extension.validateLocalData(data);
            }
            if(valid) {
                this.received = true;
                this.extension.handleLocalData(data);
                this.extension.requestRemoteData(this.localData);
                this.emit('localData', this.localData);
            }
            if(this.hardware.control === 'master') {
                if(this.isSendState) {
                    let data = this.extension.requestLocalData();
                    serial.write(data);
                }
            }
        });
        this.on('remoteData', (data)=> {
            this.extension.handleRemoteData(data);
        });
    }

    isConnect() {
        return this.isConnectState;
    }

    setConnect(state = false) {
        this.isConnectState = state;
    }

    setDefaultLocalData(config) {
        let company = config.id.slice(0, 2);
        let model = config.id.slice(2, 4);
        let version = config.id.slice(4, 6);
        this.localData = {
            company: parseInt(company, 16) & 0xff,
            version: parseInt(version, 16) & 0xff,
            model: parseInt(model, 16) & 0xff
        }
    }

    startScan(config) {
        if(!this.extension || (this.config && this.config.module !== config.module)) {
            this.extension = require(`../../hw_modules/${config.module}`);
            this.config = config;
            this.hardware = config.hardware;
            this.setDefaultLocalData(config);
        }
        serial.startScan(this, this.extension, config);
    }

    stopScan() {
        serial.stopScan();
    }
}

export default new router();
