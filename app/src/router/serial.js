'use strict';
import path from 'path';
import {EventEmitter} from 'events';
import serialport from 'serialport';

class serial extends EventEmitter{
    constructor() {
        super();
        this.device_list = {};
        this.serialport_list = {};
        this.emitter;
        this.scanInterval;
        this.extension;
    }

    init(router) {
        this.emitter = router;
        this.on('addDevice', (device, options)=> {
            this.emitter.emit('state', { state : 'addDevice' });
            this.device_list[device.comName] = device;
            this.open(device, options);
        });

        this.on('connectDevice', comName => {
            clearInterval(this.scanInterval);
            this.emitter.emit('state', { state: 'connectDevice' });
            this.removeDevice(comName, true);
            this.sp = this.serialport_list[comName];
            this.sp.on('data', data => {
                // console.log(data);
                this.emitter.emit('data', data);
            });
        });
    }

    removeDevice(comName, isExclude) {
        setTimeout(() => {
            Object.keys(this.serialport_list).forEach((v)=> {
                let sp = this.serialport_list[v];
                let isClose = true;

                if(!comName) {
                    isClose = true;
                } else if(isExclude && comName === v) {
                    isClose = false;
                } else if(!isExclude && comName !== v) {
                    isClose = false;
                }

                if(isClose && sp.isOpen()) {
                    sp.close();
                }
            });
            if(comName && isExclude) {
                this.serialport_list = {[comName]:this.serialport_list[comName]};
                this.device_list = {[comName]:this.device_list[comName]};
            } else if(comName) {
                delete this.serialport_list[comName];
                delete this.device_list[comName];
            } else {
                this.serialport_list = {};
                this.device_list = {};
            }
        }, 150);
    }

    write(data) {
        if(this.sp && this.sp.isOpen() && data && !this.sp.isSending) {
            this.sp.isSending = true;
            // console.log(data);
            this.sp.write(data, ()=> {
                if(this.sp) {
                    this.sp.drain(()=> {
                        if(this.sp) this.sp.isSending = false;
                    });
                }
            });
        } else {
            // console.log('draing');
        }
    }

    open({comName}, options, callback) {
        var _options = {};
        _options.autoOpen = options.autoOpen || options.AutoOpen || false;
        _options.baudRate = options.baudRate || options.baudrate || 9600;
        _options.parity = options.parity || 'none';
        _options.dataBits = options.dataBits || options.databits || 8;
        _options.stopBits = options.stopBits || options.stopbits || 1;
        _options.bufferSize = options.bufferSize || options.buffersize || 65536;
        if(options.delimiter) {
            _options.parser = serialport.parsers.readline(options.delimiter);
        }
        var flowcontrol = options.flowControl || options.flowcontrol;
        if(flowcontrol === 'hardware') {
            _options.flowControl = true;
        } else if(flowcontrol === 'software') {
            _options.flowControl = ['XON', 'XOFF'];
        }

        let sp = new serialport.SerialPort(comName, _options);
        this.serialport_list[comName] = sp;
        sp.on('open', (e)=> {
            console.log('open');
        });

        sp.on('error', (e)=> {
            console.log('error');
            this.removeDevice(comName);
        });

        sp.on('data', (data)=> {
            if(this.extension.checkInitialData(data)) {
                sp.removeAllListeners();
                this.emit('connectDevice', comName);
            }
        });

        sp.on('disconnectDevice', (e)=> {
            this.removeDevice(comName);
        });
    }

    startScan(router, extension, config) {
        this.extension = extension;
        this.emitter.emit('state', { state : 'start' });
        this.scanInterval = setInterval(()=> {
            serialport.list((e, devices)=> {
                if(e) {
                    throw e;
                }

                const {hardware, checkComPort = false, myComPort} = config;
                const {scanType, vendor, control, duration, firmwarecheck, pnpId, type} = hardware;
                
                devices.forEach((device)=> {
                    if(!this.device_list[device.comName]) {
                        this.emit('addDevice', device, hardware);
                    }
                });            
            }); 
        }, 1000);
        
    }

    stopScan() {
        clearInterval(this.scanInterval);
        this.removeDevice();
        this.emitter.emit('state', { state: 'disconnectDevice' });
        delete this.sp;
    }
}

export default new serial();