/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./builds/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	$(document).ready(function () {
	    var initOption = {
	        type: 'workspace',
	        libDir: '../app/bower_components'
	    };
	    Entry.init(document.getElementById('workspace'), initOption);
	    Entry.enableArduino();
	    Entry.loadProject();
	});

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _router = __webpack_require__(2);
	
	var _router2 = _interopRequireDefault(_router);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Entry.HW = function () {
	    this.connectTrial = 0;
	    this.isFirstConnect = true;
	
	    // this.initSocket();
	
	    this.initRouter();
	
	    this.connected = false;
	    this.portData = {};
	    this.sendQueue = {};
	    this.outputQueue = {};
	    this.settingQueue = {};
	    this.selectedDevice = null;
	    this.hwModule = null;
	    this.socketType = null;
	
	    Entry.addEventListener('stop', this.setZero);
	
	    this.hwInfo = {
	        '11': Entry.Arduino,
	        '19': Entry.ArduinoExt,
	        '12': Entry.SensorBoard,
	        '13': Entry.CODEino,
	        '14': Entry.joystick,
	        '15': Entry.dplay,
	        '16': Entry.nemoino,
	        '17': Entry.Xbot,
	        '18': Entry.ardublock,
	        '24': Entry.Hamster,
	        '25': Entry.Albert,
	        '31': Entry.Bitbrick,
	        '42': Entry.Arduino,
	        '51': Entry.Neobot,
	        '71': Entry.Robotis_carCont,
	        '72': Entry.Robotis_openCM70,
	        '81': Entry.Arduino
	    };
	};
	
	Entry.HW.TRIAL_LIMIT = 1;
	
	var p = Entry.HW.prototype;
	
	p.initRouter = function () {
	    var _this = this;
	
	    // router.on('state', (data)=> {
	    //     console.log(data);
	    // })
	
	    _router2.default.on('local_data', function (data) {
	        _this.checkDevice(data);
	        _this.updatePortData(data);
	    });
	
	    _router2.default.init();
	};
	
	p.startRouter = function () {
	    this.initHardware();
	    var neobot = __webpack_require__(8);
	    _router2.default.startScan(neobot);
	};
	
	p.stopRouter = function () {
	    _router2.default.stopScan();
	};
	
	p.initSocket = function () {
	    try {
	        if (this.connectTrial >= Entry.HW.TRIAL_LIMIT) {
	            if (!this.isFirstConnect) Entry.toast.alert(Lang.Menus.connect_hw, Lang.Menus.connect_fail, false);
	            this.isFirstConnect = false;
	            return;
	        }
	        var hw = this;
	
	        var socket, socketSecurity;
	        var protocol = '';
	        this.connected = false;
	        this.connectTrial++;
	
	        if (location.protocol.indexOf('https') > -1) {
	            socketSecurity = new WebSocket("wss://hardware.play-entry.org:23518");
	        } else {
	            try {
	                socket = new WebSocket("ws://127.0.0.1:23518");
	                socket.binaryType = "arraybuffer";
	
	                socket.onopen = function () {
	                    hw.socketType = 'WebSocket';
	                    hw.initHardware(socket);
	                }.bind(this);
	
	                socket.onmessage = function (evt) {
	                    var data = JSON.parse(evt.data);
	                    hw.checkDevice(data);
	                    hw.updatePortData(data);
	                }.bind(this);
	
	                socket.onclose = function () {
	                    if (hw.socketType === 'WebSocket') {
	                        this.socket = null;
	                        hw.initSocket();
	                    }
	                };
	            } catch (e) {}
	            try {
	                socketSecurity = new WebSocket("wss://hardware.play-entry.org:23518");
	            } catch (e) {}
	        }
	        socketSecurity.binaryType = "arraybuffer";
	        socketSecurity.onopen = function () {
	            hw.socketType = 'WebSocketSecurity';
	            hw.initHardware(socketSecurity);
	        };
	
	        socketSecurity.onmessage = function (evt) {
	            var data = JSON.parse(evt.data);
	            hw.checkDevice(data);
	            hw.updatePortData(data);
	        };
	
	        socketSecurity.onclose = function () {
	            if (hw.socketType === 'WebSocketSecurity') {
	                this.socket = null;
	                hw.initSocket();
	            }
	        };
	
	        Entry.dispatchEvent("hwChanged");
	    } catch (e) {}
	};
	
	p.retryConnect = function () {
	    this.connectTrial = 0;
	    this.initSocket();
	};
	
	p.initHardware = function (socket) {
	    this.socket = socket;
	    this.connectTrial = 0;
	
	    this.connected = true;
	    Entry.dispatchEvent("hwChanged");
	    if (Entry.playground && Entry.playground.object) Entry.playground.setMenu(Entry.playground.object.objectType);
	};
	
	p.setDigitalPortValue = function (port, value) {
	    this.sendQueue[port] = value;
	    this.removePortReadable(port);
	};
	
	p.getAnalogPortValue = function (port) {
	    if (!this.connected) return 0;
	    return this.portData['a' + port];
	};
	
	p.getDigitalPortValue = function (port) {
	    if (!this.connected) return 0;
	    this.setPortReadable(port);
	    if (this.portData[port] !== undefined) {
	        return this.portData[port];
	    } else return 0;
	};
	
	p.setPortReadable = function (port) {
	    if (!this.sendQueue.readablePorts) this.sendQueue.readablePorts = [];
	
	    var isPass = false;
	    for (var i in this.sendQueue.readablePorts) {
	        if (this.sendQueue.readablePorts[i] == port) {
	            isPass = true;
	            break;
	        }
	    }
	
	    if (!isPass) {
	        this.sendQueue.readablePorts.push(port);
	    }
	};
	p.removePortReadable = function (port) {
	    if (!this.sendQueue.readablePorts && !Array.isArray(this.sendQueue.readablePorts)) return;
	    var target;
	    for (var i in this.sendQueue.readablePorts) {
	        if (this.sendQueue.readablePorts[i] == port) {
	            target = Number(i);
	            break;
	        }
	    }
	
	    if (target != undefined) {
	        this.sendQueue.readablePorts = this.sendQueue.readablePorts.slice(0, target).concat(this.sendQueue.readablePorts.slice(target + 1, this.sendQueue.readablePorts.length));
	    } else {
	        this.sendQueue.readablePorts = [];
	    }
	};
	
	p.update = function () {
	    // this.socket.send(JSON.stringify(this.sendQueue));
	    _router2.default.emit('remote_data', this.sendQueue);
	};
	
	p.updatePortData = function (data) {
	    this.portData = data;
	    if (this.hwMonitor && Entry.propertyPanel.selected == 'hw') {
	        this.hwMonitor.update();
	    }
	};
	
	p.closeConnection = function () {
	    if (this.socket) {
	        this.socket.close();
	    }
	};
	
	p.downloadConnector = function () {
	    var url = "http://download.play-entry.org/apps/Entry_HW_1.5.8_Setup.exe";
	    var win = window.open(url, '_blank');
	    win.focus();
	};
	
	p.downloadSource = function () {
	    var url = "http://play-entry.com/down/board.ino";
	    var win = window.open(url, '_blank');
	    win.focus();
	};
	
	p.setZero = function () {
	    if (!Entry.hw.hwModule) return;
	    Entry.hw.hwModule.setZero();
	};
	
	p.checkDevice = function (data) {
	    if (data.company === undefined) return;
	    var key = '' + data.company + data.model;
	    if (key == this.selectedDevice) return;
	    this.selectedDevice = key;
	    this.hwModule = this.hwInfo[key];
	    Entry.dispatchEvent("hwChanged");
	    Entry.toast.success("하드웨어 연결 성공",
	    /* Lang.Menus.connect_message.replace(
	        "%1",
	        Lang.Device[Entry.hw.hwModule.name]
	    ) +*/"하드웨어 아이콘을 더블클릭하면, 센서값만 확인할 수 있습니다.", true);
	    if (this.hwModule.monitorTemplate) {
	
	        if (!this.hwMonitor) {
	            this.hwMonitor = new Entry.HWMonitor(this.hwModule);
	        } else {
	            this.hwMonitor._hwModule = this.hwModule;
	            this.hwMonitor.initView();
	        }
	        Entry.propertyPanel.addMode("hw", this.hwMonitor);
	        var mt = this.hwModule.monitorTemplate;
	
	        if (mt.mode == "both") {
	            mt.mode = "list";
	            this.hwMonitor.generateListView();
	            mt.mode = "general";
	            this.hwMonitor.generateView();
	            mt.mode = "both";
	        } else if (mt.mode == "list") {
	            this.hwMonitor.generateListView();
	        } else {
	            this.hwMonitor.generateView();
	        }
	    }
	};
	
	p.banHW = function () {
	    var hwOptions = this.hwInfo;
	    for (var i in hwOptions) {
	        Entry.playground.mainWorkspace.blockMenu.banClass(hwOptions[i].name, true);
	    }
	};

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(3);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _events = __webpack_require__(4);
	
	var _serial = __webpack_require__(5);
	
	var _serial2 = _interopRequireDefault(_serial);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var router = function () {
	    function router() {
	        _classCallCheck(this, router);
	
	        _events.EventEmitter.call(this);
	        this.extension;
	        this.local_data = {};
	    }
	
	    _createClass(router, [{
	        key: 'init',
	        value: function init() {
	            var _this = this;
	
	            // this.emit('state', 'init');
	            _serial2.default.init(this);
	            this.on('state', function (data) {
	                console.log(data);
	            });
	            this.on('data', function (data) {
	                var valid = true;
	                if (_this.extension.validateLocalData) {
	                    valid = _this.extension.validateLocalData(data);
	                }
	                if (valid) {
	                    _this.extension.handleLocalData(data);
	                    _this.extension.requestRemoteData(_this.local_data);
	                    _this.emit('local_data', _this.local_data);
	                }
	                var bytes = _this.extension.requestLocalData();
	                _serial2.default.write(bytes);
	            });
	            this.on('remote_data', function (data) {
	                _this.extension.handleRemoteData(data);
	            });
	        }
	    }, {
	        key: 'setDefaultLocalData',
	        value: function setDefaultLocalData(config) {
	            var company = config.id.slice(0, 2);
	            var model = config.id.slice(2, 4);
	            var version = config.id.slice(4, 6);
	            this.local_data = {
	                company: parseInt(company, 16) & 0xff,
	                version: parseInt(version, 16) & 0xff,
	                model: parseInt(model, 16) & 0xff
	            };
	        }
	    }, {
	        key: 'startScan',
	        value: function startScan(config) {
	            this.extension = __webpack_require__(6)("./" + config.module);
	            this.setDefaultLocalData(config);
	            _serial2.default.startScan(this, this.extension, config);
	        }
	    }, {
	        key: 'stopScan',
	        value: function stopScan() {
	            _serial2.default.stopScan();
	        }
	    }]);
	
	    return router;
	}();
	
	_util2.default.inherits(router, _events.EventEmitter);
	
	exports.default = new router();

/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },

/***/ 4:
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _path = __webpack_require__(39);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _util = __webpack_require__(3);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _events = __webpack_require__(4);
	
	var _serialport = __webpack_require__(40);
	
	var _serialport2 = _interopRequireDefault(_serialport);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var serial = function () {
	    function serial() {
	        _classCallCheck(this, serial);
	
	        _events.EventEmitter.call(this);
	        this.device_list = {};
	        this.serialport_list = {};
	        this.emitter;
	        this.scanInterval;
	        this.extension;
	        this.i = 0;
	    }
	
	    _createClass(serial, [{
	        key: 'init',
	        value: function init(router) {
	            var _this = this;
	
	            this.emitter = router;
	            this.on('addDevice', function (device, options) {
	                _this.device_list[device.comName] = device;
	                _this.open(device, options);
	            });
	
	            this.on('openDevice', function (comName) {
	                _this.removeDevice(comName);
	                _this.sp = _this.serialport_list[comName];
	                _this.sp.on('data', function (data) {
	                    _this.emitter.emit('data', data);
	                });
	            });
	        }
	    }, {
	        key: 'removeDevice',
	        value: function removeDevice(comName) {
	            var _this2 = this;
	
	            clearInterval(this.scanInterval);
	            setTimeout(function () {
	                Object.keys(_this2.serialport_list).forEach(function (v) {
	                    var sp = _this2.serialport_list[v];
	                    if (comName !== v && sp.isOpen()) {
	                        sp.close();
	                    }
	                });
	                if (comName) {
	                    _this2.serialport_list = _defineProperty({}, comName, _this2.serialport_list[comName]);
	                    _this2.device_list = _defineProperty({}, comName, _this2.device_list[comName]);
	                } else {
	                    _this2.serialport_list = {};
	                    _this2.device_list = {};
	                }
	            }, 300);
	        }
	    }, {
	        key: 'write',
	        value: function write(bytes) {
	            var _this3 = this;
	
	            console.time(this.i);
	            if (this.sp && this.sp.isOpen() && bytes && !this.sp.isSending) {
	                this.sp.isSending = true;
	                this.sp.write(bytes, function () {
	                    _this3.sp.drain(function () {
	                        console.timeEnd(_this3.i++);
	                        _this3.sp.isSending = false;
	                    });
	                });
	            }
	        }
	    }, {
	        key: 'open',
	        value: function open(_ref, options, callback) {
	            var comName = _ref.comName;
	
	            var _this4 = this;
	
	            var _options = {};
	            _options.autoOpen = options.autoOpen || options.AutoOpen || false;
	            _options.baudRate = options.baudRate || options.baudrate || 9600;
	            _options.parity = options.parity || 'none';
	            _options.dataBits = options.dataBits || options.databits || 8;
	            _options.stopBits = options.stopBits || options.stopbits || 1;
	            _options.bufferSize = options.bufferSize || options.buffersize || 65536;
	            if (options.delimiter) {
	                _options.parser = _serialport2.default.parsers.readline(options.delimiter);
	            }
	            var flowcontrol = options.flowControl || options.flowcontrol;
	            if (flowcontrol === 'hardware') {
	                _options.flowControl = true;
	            } else if (flowcontrol === 'software') {
	                _options.flowControl = ['XON', 'XOFF'];
	            }
	
	            var sp = new _serialport2.default.SerialPort(comName, _options);
	            this.serialport_list[comName] = sp;
	            sp.on('open', function (e) {
	                console.log('open');
	            });
	
	            sp.on('data', function (data) {
	                if (_this4.extension.checkInitialData(data)) {
	                    console.log('success ' + comName);
	                    sp.removeAllListeners();
	                    _this4.emit('openDevice', comName);
	                } else {
	                    console.log(data);
	                    console.log('fail ' + comName);
	                }
	            });
	
	            sp.on('disconnect', function (e) {
	                delete _this4.serialport_list[comName];
	                delete _this4.device_list[comName];
	            });
	        }
	    }, {
	        key: 'startScan',
	        value: function startScan(router, extension, config) {
	            var _this5 = this;
	
	            this.extension = extension;
	            this.emitter.emit('state', 'start');
	            this.scanInterval = setInterval(function () {
	                console.log('scan');
	                _serialport2.default.list(function (e, devices) {
	                    if (e) {
	                        throw e;
	                    }
	
	                    var hardware = config.hardware;
	                    var _config$checkComPort = config.checkComPort;
	                    var checkComPort = _config$checkComPort === undefined ? false : _config$checkComPort;
	                    var myComPort = config.myComPort;
	                    var scanType = hardware.scanType;
	                    var vendor = hardware.vendor;
	                    var control = hardware.control;
	                    var duration = hardware.duration;
	                    var firmwarecheck = hardware.firmwarecheck;
	                    var pnpId = hardware.pnpId;
	                    var type = hardware.type;
	
	
	                    devices.forEach(function (device) {
	                        if (!_this5.device_list[device.comName]) {
	                            _this5.emit('addDevice', device, hardware);
	                        }
	                    });
	                });
	            }, 2000);
	        }
	    }, {
	        key: 'stopScan',
	        value: function stopScan() {
	            this.removeDevice();
	            delete this.sp;
	            console.log('stop');
	        }
	    }]);
	
	    return serial;
	}();
	
	_util2.default.inherits(serial, _events.EventEmitter);
	
	exports.default = new serial();

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./neobot": 7,
		"./neobot.js": 7,
		"./neobot.json": 8,
		"./neobot.png": 9
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 6;


/***/ },

/***/ 7:
/***/ function(module, exports) {

	function Module() {
		this.localBuffer = new Array(8);
		this.remoteBuffer = new Array(5);
	
		this.LOCAL_MAP = [
			'IN1',
			'IN2',
			'IN3',
			'IR',
			'BAT'
		];
	
		this.REMOTE_MAP = [
			'OUT1',
			'OUT2',
			'OUT3',
			'DCL',
			'DCR',
			'SND',
			'FND',
			'OPT'
		];
	}
	
	Module.prototype.init = function(handler, config) {
	};
	
	Module.prototype.requestInitialData = function() {
		return null;
	};
	
	Module.prototype.checkInitialData = function(data, config) {
		var state = false;
	
		for(var i = 0; i < data.length - 1; i++) {
			if(data[i] === 171 && data[i + 1] === 205 ) {
				var dataSet = data.slice(i, i + 8);
				var dataSum = dataSet.reduce(function (result, value, idx) {
					if(idx < 2 || idx >= dataSet.length-1) {
						return result;
					}
					return result + value;
				}, 0);
				if((dataSum & 255) === dataSet[dataSet.length-1]) {
					state = true;
				}
				break;
			}
		}
		
		return state;
	};
	
	Module.prototype.validateLocalData = function(data) {
		var state = false;
	
		for(var i = 0; i < data.length - 1; i++) {
			if(data[i] === 171 && data[i + 1] === 205 ) {
				var dataSet = data.slice(i, i + 8);
				var dataSum = dataSet.reduce(function (result, value, idx) {
					if(idx < 2 || idx >= dataSet.length-1) {
						return result;
					}
					return result + value;
				}, 0);
				if((dataSum & 255) === dataSet[dataSet.length-1]) {
					state = true;
				}
				break;
			}
		}
		
		return state;
	};
	
	//로컬 데이터 처리
	// data: Native Buffer
	Module.prototype.handleLocalData = function(data) {
		var buffer = this.remoteBuffer;
		for(var i = 0; i < data.length - 1; i++) {
			if(data[i] === 171 && data[i + 1] === 205 ) {
				var dataSet = data.slice(i + 2, i + 7);
	
				dataSet.forEach(function (value, idx) {
					buffer[idx] = value;
				});
	
				break;
			}
		}
	};
	
	//리모트 데이터 전송
	Module.prototype.requestRemoteData = function(handler) {
		var buffer = this.remoteBuffer;
		for(var i = 0; i < 5; i++) {
			handler[this.LOCAL_MAP[i]] = buffer[i];
		}
	};
	
	//리모트 데이처 처리
	Module.prototype.handleRemoteData = function(handler) {
		var buffer = this.localBuffer;
	
		this.REMOTE_MAP.forEach(function (key, idx) {
			buffer[idx] = handler[key];
		});
	};
	
	//로컬 데이터 전송
	Module.prototype.requestLocalData = function() {
		var requestData = [];
		var buffer = this.localBuffer;
	
		// 시작 바이트
		requestData.push(0xCD);
		requestData.push(0xAB);
	
		var checksum = 0;
		var isFnd = false;
		buffer.forEach(function (value, idx) {
			if(idx === 6 && value > 0) {
				isFnd = true;
			} else if(idx === 7 && isFnd) {
				value = value | 8;
			}
			requestData.push(value);
			checksum += value;
		});
	
		checksum = checksum & 255;
		//체크썸
		requestData.push(checksum);
	
		return requestData;
	};
	
	Module.prototype.reset = function() {
	};
	
	module.exports = new Module();


/***/ },

/***/ 8:
/***/ function(module, exports) {

	module.exports = {
		"id": "050101",
		"name": {
			"en": "Neo Bot",
			"ko": "네오봇"
		},
		"icon": "neobot.png",
		"module": "neobot.js",
		"url": "http://neobot.co.kr/",
		"email": "neobot@neobot.co.kr",
		"reconnect": true,
		"select_com_port": true,
		"entry": {
			"protocol": "json"
		},
		"hardware": {
			"pnpId": "PID",
			"type": "bluetooth",
			"control": "master",
			"vendor": "neobot",
			"baudRate": 115200
		}
	};

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "71aeeb52209fe808c25907af7f8d2131.png";

/***/ },

/***/ 39:
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },

/***/ 40:
/***/ function(module, exports) {

	module.exports = require("serialport");

/***/ }

/******/ });
//# sourceMappingURL=app.js.map