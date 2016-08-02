"use strict";

$(document).ready(() => {
    let initOption = {
        type: 'workspace',
        libDir: './bower_components',
        objectaddable: false,
        objecteditable: false,
        soundeditable: false,
        pictureeditable: false,
        sceneeditable: false,
        hasvariablemanager: false,
    }

    Entry.createDom = function(container, option) {
        var that = this;
        Entry.documentMousedown.attach(
            that, that.cancelObjectEdit
        );

        var sceneView = Entry.createElement('div');
        container.appendChild(sceneView);
        /** @type {!Element} */
        this.sceneView = sceneView;
        this.sceneView.style.display = "none"
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

    Entry.init(document.getElementById('workspace'), initOption)
    
    Entry.enableArduino();

    let project = sessionStorage.getItem('loadProject') || localStorage.getItem('localStorageProject');
    if(project) {
        project = JSON.parse(project);
        sessionStorage.removeItem('loadProject');
        localStorage.removeItem('localStorageProject');
        util.setProjectName(project.name);
    } else {
        project = Entry.getStartProject(Entry.mediaFilePath);
        project.objects[0].script[0].pop();
        project.objects[0].script[0][0].type = "neobot_when_run_button_click";
    }
    Entry.loadProject(project);

    window.onbeforeunload = (e)=> {
        let hardClose = true;
        if(util.isSavingProject) {
            hardClose = confirm(`${Lang.Workspace.quit_stop_msg} 그래도 종료하시겠습니까?`);
            if(!hardClose) {
                e.preventDefault();
                e.returnValue = false;
                return;
            }
        }

        if(!Entry.stateManager.isSaved()) {
            hardClose = confirm(Lang.Menus.save_dismiss);
        }

        if(hardClose) {
            Entry.plugin.closeAboutPage();
            Entry.plugin.closeHwGuidePage();
        } else {
            util.hidePopup();
            e.preventDefault();
            e.returnValue = false;
            return;
        }
    }
});
