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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	$(document).ready(function () {
	        var initOption = {
	                type: 'workspace',
	                libDir: '../app/bower_components',
	                objectaddable: false,
	                objecteditable: false,
	                soundeditable: false,
	                pictureeditable: false,
	                sceneeditable: false,
	                hasvariablemanager: false
	        };
	
	        Entry.createDom = function (container, option) {
	                var that = this;
	                Entry.documentMousedown.attach(that, that.cancelObjectEdit);
	
	                var sceneView = Entry.createElement('div');
	                container.appendChild(sceneView);
	                /** @type {!Element} */
	                this.sceneView = sceneView;
	                this.sceneView.style.display = "none";
	                this.scene.generateView(this.sceneView, option);
	
	                var stateManagerView = Entry.createElement('div');
	                this.sceneView.appendChild(stateManagerView);
	                /** @type {!Element} */
	                this.stateManagerView = stateManagerView;
	                this.stateManager.generateView(this.stateManagerView, option);
	
	                var engineView = Entry.createElement('div');
	                container.appendChild(engineView);
	                /** @type {!Element} */
	                this.engineView = engineView;
	                this.engine.generateView(this.engineView, option);
	
	                var canvas = Entry.createElement('canvas');
	                canvas.addClass('entryCanvasWorkspace');
	                canvas.id = 'entryCanvas';
	                engineView.insertBefore(canvas, this.engine.addButton);
	
	                /** @type {!Element} */
	                this.canvas_ = canvas;
	                this.stage.initStage(this.canvas_);
	
	                var containerView = Entry.createElement('div');
	                container.appendChild(containerView);
	                this.propertyPanel.generateView(container, option);
	                //this.propertyPanel._view.css({display: "none"});
	                /** @type {!Element} */
	                //this.containerView = containerView;
	                //this.container.generateView(this.containerView, option);
	                //this.propertyPanel.addMode("object", this.container);
	
	                this.helper.generateView(this.engineView, option);
	                //this.propertyPanel.addMode("helper" , this.helper);
	
	                var playgroundView = Entry.createElement('div');
	                container.appendChild(playgroundView);
	                /** @type {!Element} */
	                this.playgroundView = playgroundView;
	                this.playground.generateView(this.playgroundView, option);
	
	                //this.propertyPanel.select("object");
	                this.helper.bindWorkspace(this.playground.mainWorkspace);
	                this.helper.visible = true;
	        };
	
	        Entry.init(document.getElementById('workspace'), initOption);
	
	        Entry.enableArduino();
	        Entry.loadProject();
	});

/***/ },
/* 1 */
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
	    var neobot = __webpack_require__(9);
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
	    if (this.hwMonitor) {
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _events = __webpack_require__(3);
	
	var _serial = __webpack_require__(4);
	
	var _serial2 = _interopRequireDefault(_serial);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var router = function (_EventEmitter) {
	    _inherits(router, _EventEmitter);
	
	    function router() {
	        _classCallCheck(this, router);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(router).call(this));
	
	        _this.extension;
	        _this.config;
	        _this.hardware;
	        _this.slaveTimer;
	        _this.local_data = {};
	        return _this;
	    }
	
	    _createClass(router, [{
	        key: 'init',
	        value: function init() {
	            var _this2 = this;
	
	            _serial2.default.init(this);
	            this.on('state', function (state) {
	                console.log(state);
	                switch (state) {
	                    case 'connectDevice':
	                        {
	                            clearInterval(_this2.slaveTimer);
	                            var _hardware = _this2.hardware;
	                            var control = _hardware.control;
	                            var duration = _hardware.duration;
	
	                            if (control !== 'master' && duration) {
	                                _this2.slaveTimer = setInterval(function () {
	                                    var data = _this2.extension.requestLocalData();
	                                    _serial2.default.write(data);
	                                }, duration);
	                            }
	                            break;
	                        }
	                    case 'disconnect':
	                        {
	                            clearInterval(_this2.slaveTimer);
	                        }
	                }
	            });
	            this.on('data', function (data) {
	                var valid = true;
	                if (_this2.extension.validateLocalData) {
	                    valid = _this2.extension.validateLocalData(data);
	                }
	                if (valid) {
	                    _this2.extension.handleLocalData(data);
	                    _this2.extension.requestRemoteData(_this2.local_data);
	                    _this2.emit('local_data', _this2.local_data);
	                }
	                if (_this2.hardware.control === 'master') {
	                    var _data = _this2.extension.requestLocalData();
	                    _serial2.default.write(_data);
	                }
	            });
	            this.on('remote_data', function (data) {
	                _this2.extension.handleRemoteData(data);
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
	            this.extension = __webpack_require__(7)("./" + config.module);
	            this.config = config;
	            this.hardware = config.hardware;
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
	}(_events.EventEmitter);
	
	exports.default = new router();

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _path = __webpack_require__(5);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _events = __webpack_require__(3);
	
	var _serialport = __webpack_require__(6);
	
	var _serialport2 = _interopRequireDefault(_serialport);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var serial = function (_EventEmitter) {
	    _inherits(serial, _EventEmitter);
	
	    function serial() {
	        _classCallCheck(this, serial);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(serial).call(this));
	
	        _this.device_list = {};
	        _this.serialport_list = {};
	        _this.emitter;
	        _this.scanInterval;
	        _this.extension;
	        return _this;
	    }
	
	    _createClass(serial, [{
	        key: 'init',
	        value: function init(router) {
	            var _this2 = this;
	
	            this.emitter = router;
	            this.on('addDevice', function (device, options) {
	                _this2.emitter.emit('state', 'addDevice');
	                _this2.device_list[device.comName] = device;
	                _this2.open(device, options);
	            });
	
	            this.on('connectDevice', function (comName) {
	                clearInterval(_this2.scanInterval);
	                _this2.emitter.emit('state', 'connectDevice');
	                _this2.removeDevice(comName, true);
	                _this2.sp = _this2.serialport_list[comName];
	                _this2.sp.on('data', function (data) {
	                    console.log(data);
	                    _this2.emitter.emit('data', data);
	                });
	            });
	        }
	    }, {
	        key: 'removeDevice',
	        value: function removeDevice(comName, isExclude) {
	            var _this3 = this;
	
	            setTimeout(function () {
	                Object.keys(_this3.serialport_list).forEach(function (v) {
	                    var sp = _this3.serialport_list[v];
	                    var isClose = true;
	
	                    if (!comName) {
	                        isClose = true;
	                    } else if (isExclude && comName === v) {
	                        isClose = false;
	                    } else if (!isExclude && comName !== v) {
	                        isClose = false;
	                    }
	
	                    if (isClose && sp.isOpen()) {
	                        sp.close();
	                    }
	                });
	                if (comName && isExclude) {
	                    _this3.serialport_list = _defineProperty({}, comName, _this3.serialport_list[comName]);
	                    _this3.device_list = _defineProperty({}, comName, _this3.device_list[comName]);
	                } else if (comName) {
	                    delete _this3.serialport_list[comName];
	                    delete _this3.device_list[comName];
	                } else {
	                    _this3.serialport_list = {};
	                    _this3.device_list = {};
	                }
	            }, 150);
	        }
	    }, {
	        key: 'write',
	        value: function write(data) {
	            var _this4 = this;
	
	            if (this.sp && this.sp.isOpen() && data && !this.sp.isSending) {
	                this.sp.isSending = true;
	                this.sp.write(data, function () {
	                    if (_this4.sp) {
	                        _this4.sp.drain(function () {
	                            if (_this4.sp) _this4.sp.isSending = false;
	                        });
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'open',
	        value: function open(_ref, options, callback) {
	            var comName = _ref.comName;
	
	            var _this5 = this;
	
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
	
	            sp.on('error', function (e) {
	                console.log('error');
	                _this5.removeDevice(comName);
	            });
	
	            sp.on('data', function (data) {
	                if (_this5.extension.checkInitialData(data)) {
	                    sp.removeAllListeners();
	                    _this5.emit('connectDevice', comName);
	                }
	            });
	
	            sp.on('disconnect', function (e) {
	                // delete this.serialport_list[comName];
	                // delete this.device_list[comName];
	                _this5.removeDevice(comName);
	            });
	        }
	    }, {
	        key: 'startScan',
	        value: function startScan(router, extension, config) {
	            var _this6 = this;
	
	            this.extension = extension;
	            this.emitter.emit('state', 'start');
	            this.scanInterval = setInterval(function () {
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
	                        if (!_this6.device_list[device.comName]) {
	                            _this6.emit('addDevice', device, hardware);
	                        }
	                    });
	                });
	            }, 1000);
	        }
	    }, {
	        key: 'stopScan',
	        value: function stopScan() {
	            clearInterval(this.scanInterval);
	            this.removeDevice();
	            delete this.sp;
	        }
	    }]);
	
	    return serial;
	}(_events.EventEmitter);
	
	exports.default = new serial();

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("serialport");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./neobot": 8,
		"./neobot.js": 8,
		"./neobot.json": 9,
		"./neobot.png": 10
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
	webpackContext.id = 7;


/***/ },
/* 8 */
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
		buffer.forEach((value = 0, idx)=> {
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
	
		if(requestData.length === 2) {
			return null;
		}
		return requestData;
	};
	
	Module.prototype.reset = function() {
	};
	
	module.exports = new Module();


/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "71aeeb52209fe808c25907af7f8d2131.png";

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map