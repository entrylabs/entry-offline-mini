'use strict';
import path from 'path';
import util from 'util';
import {EventEmitter} from 'events';
import serialport from 'serialport';

class serial {
    constructor() {
        EventEmitter.call(this);
        this.device_list = {};
        this.serialport_list = {};
        this.emitter;
        this.scanInterval;
        this.extension;
        this.i = 0;
    }

    init(router) {
        this.emitter = router;
        this.on('addDevice', (device, options)=> {
            this.device_list[device.comName] = device;
            this.open(device, options);
        });

        this.on('openDevice', (comName)=> {
            this.removeDevice(comName);
            this.sp = this.serialport_list[comName];
            this.sp.on('data', (data)=> {
                this.emitter.emit('data', data);
            });
        });
    }

    removeDevice(comName) {
        clearInterval(this.scanInterval);
        setTimeout(() => {
            Object.keys(this.serialport_list).forEach((v)=> {
                let sp = this.serialport_list[v];
                if(comName !== v && sp.isOpen()) {
                    sp.close();
                }
            });
            if(comName) {
                this.serialport_list = {[comName]:this.serialport_list[comName]};
                this.device_list = {[comName]:this.device_list[comName]};
            } else {
                this.serialport_list = {};
                this.device_list = {};
            }
        }, 300);
    }

    write(bytes) {
        console.time(this.i);
        if(this.sp && this.sp.isOpen() && bytes && !this.sp.isSending) {
            this.sp.isSending = true;
            this.sp.write(bytes, ()=> {
                this.sp.drain(()=> {
                    console.timeEnd(this.i++);
                    this.sp.isSending = false;
                });
            });
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

        sp.on('data', (data)=> {
            if(this.extension.checkInitialData(data)) {
                console.log(`success ${comName}`);
                sp.removeAllListeners();
                this.emit('openDevice', comName);
            } else {
                console.log(data);
                console.log(`fail ${comName}`);
            }
        });

        sp.on('disconnect', (e)=> {
            delete this.serialport_list[comName];
            delete this.device_list[comName];
        });
    }

    startScan(router, extension, config) {
        this.extension = extension;
        this.emitter.emit('state', 'start');
        this.scanInterval = setInterval(()=> {
            console.log('scan');
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
        }, 2000);
        
    }

    stopScan() {
        this.removeDevice();
        delete this.sp;
        console.log('stop');
    }
}

util.inherits(serial, EventEmitter);

export default new serial();