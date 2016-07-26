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
/***/ function(module, exports) {

	'use strict';
	
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
	    };
	
	    Entry.init(document.getElementById('workspace'), initOption);
	
	    Entry.enableArduino();
	    Entry.loadProject();
	});

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map