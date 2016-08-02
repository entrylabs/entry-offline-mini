"use strict";

import {ipcRenderer, remote } from 'electron';
import fs from 'fs';
import path from 'path';
import tar from 'tar-fs';
import zlib from 'zlib';
const {dialog} = remote;

class Util {
    constructor() {
        this.defExt = 'eno';
        this.beforeState = {
            state : 'new'
        };
        let parser = path.parse(__filename);
        this.appPath = ipcRenderer.sendSync('dirname');
        this.isSavingProject = false;
        this.defSavePath;
        this.recentSavePath = '';
        this.popupHelper;
        this.popupTitle;
        this.popupFailTitle;
        this.projectName = '';
    }

    setProjectName(name) {
        this.projectName = name;

    }

    getProjectName(name) {
        return this.projectName;
    }

    setDefaultPopup() {
        if(!this.popupHelper) {
            this.popupHelper = new Entry.popupHelper(true);
        }

        this.popupHelper.addPopup('workspaceSpinner', {
            type: 'spinner',
            setPopupLayout : (popup)=> {
                let popupDomList = [{
                    name: 'content',
                    tagName: 'div',
                    option: {
                        class: 'contentArea'
                    }
                }, {
                    name: 'title',
                    tagName: 'div',
                    text: Lang.Workspace.uploading_msg,
                    option: {
                        class : 'workspaceSpinnerTitle',
                        parent: 'content'
                    }
                }, {
                    name: 'circle',
                    tagName: 'div',
                    option: {
                        class : 'workspaceSpinnerCircle',
                        parent: 'content'
                    }
                }, {
                    name: 'inner1',
                    tagName: 'div',
                    option: {
                        class : 'inner1',
                        parent: 'circle'
                    }
                }, {
                    name: 'inner2',
                    tagName: 'div',
                    option: {
                        class : 'inner2',
                        parent: 'circle'
                    }
                }, {
                    name: 'inner3',
                    tagName: 'div',
                    option: {
                        class : 'inner3',
                        parent: 'circle'
                    }
                }, {
                    name: 'character',
                    tagName: 'div',
                    option: {
                        class : 'workspaceSpinnerCharacter',
                        parent: 'circle'
                    }
                }];

                const domList = this.doCreateDomByEntry(popupDomList);
                this.popupTitle = domList.title;
                popup.append(domList.content);
            }
        });

        this.popupHelper.addPopup('workspaceFailed', {
            setPopupLayout: (popup)=> {                
                let failPopupDomList = [{
                    name: 'content',
                    tagName: 'div',
                    option: {
                        class: 'contentArea'
                    }
                }, {
                    name: 'title',
                    tagName: 'div',
                    html: Lang.Workspace.upload_fail_msg,
                    option: {
                        class : 'workspaceFailedTitle',
                        parent: 'content'
                    }
                }, {
                    name: 'close',
                    tagName: 'div',
                    option: {
                        class : 'workspaceFailedCloseBtn',
                        parent: 'content'
                    },
                    event: {
                        type: 'click',
                        func: ()=> {
                            this.hidePopup();
                        }
                    }
                }, {
                    name: 'subTitle',
                    tagName: 'div',
                    html: Lang.Workspace.fail_contact_msg,
                    option: {
                        class : 'workspaceFailedSubTitle',
                        parent: 'content'
                    }
                }];

                const failDomList = this.doCreateDomByEntry(failPopupDomList);
                this.popupFailTitle = failDomList.title;
                popup.append(failDomList.content);
            }
        });

    }

    // 새 프로젝트 실행
    doStartNewProject() {
        let isLoadPossible = true;

        if(!Entry.stateManager.isSaved()) {
            isLoadPossible = confirm(Lang.Menus.save_dismiss);
        }

        if(isLoadPossible) {
            Entry.stateManager.addStamp();
            localStorage.removeItem('tempProject');
            this.beforeState = { state: 'new' };
            this.doInitProjectFolder(()=> {
                this.doReloadApplication();
            });
        }
    }

    doLoadProject() {
        this.showPopup({
            type: 'spinner',
            message: Lang.Workspace.loading_msg
        });

        let defPath = localStorage.getItem('defPath') || '';
        dialog.showOpenDialog({
            defaultPath: defPath,
            properties: [
                'openFile'
            ], filters: [
                { name: 'Entry Mini File', extensions: [this.defExt] }
            ]
        }, (pathArr)=> {
            try {
                if(Array.isArray(pathArr)) {
                    let projectPath = pathArr[0];
                    let parser = path.parse(projectPath);

                    if(parser.ext === `.${this.defExt}`) {
                        localStorage.getItem('defPath', projectPath);
                        this.doReadProjectFile(projectPath, (data)=> {
                            sessionStorage.setItem('loadProject', data);
                            this.doReloadApplication();
                        });
                    } else {
                        this.hidePopup();
                    }
                } else {
                    this.hidePopup();
                }
            } catch(e) {
                this.doFailProject({type:'load'});
            }
        });
    }

    // 프로젝트 저장하기
    doSaveProject({state}) {
        this.isSavingProject = true;
        this.showPopup({
            type: 'spinner',
            message: Lang.Workspace.saving_msg
        });

        const parser = path.parse(this.recentSavePath);
        try{
            if(state === 'save' && this.recentSavePath && parser.ext === `.${this.defExt}`) {
                this.doCreateProjectFile();
            } else {
                Entry.stateManager.cancelLastCommand();
                let self = this;
                this.doOpenSaveDialog((destPath)=> {
                    try{
                        if(destPath) {
                            self.doCreateProjectFile(destPath);
                        } else {
                            self.hidePopup();
                            self.isSavingProject = false;
                        }
                    } catch(e) {
                        this.doFailProject({type:'save'});
                    }
                });
            }
        } catch(e) {
            this.doFailProject({type:'save'});
        }
    }

    doFailProject({type}) {
        let message;
        switch(type) {
            case 'save': {
                message = Lang.Workspace.saving_fail_msg;
                break;
            }

            case 'load': {
                message = Lang.Workspace.loading_fail_msg;
                break;
            }
        }
        this.hidePopup();
        this.showPopup({
            type: 'fail',
            message: message
        });
    }

    doSuccessSaveProject(destPath) {
        Entry.stateManager.addStamp();
        this.recentSavePath = destPath;
        Entry.toast.success(Lang.Workspace.saved, `projectName ${Lang.Workspace.saved_msg}`);
        this.hidePopup();
    }

    doReadProjectFile(sourcePath, callback) {
        let destPath = path.resolve(this.appPath, 'temp');
        let fsReader = fs.createReadStream(sourcePath);
        var extract = tar.extract(destPath);

        extract.on('finish', ()=> {
            fs.readFile(path.resolve(this.appPath, 'temp', 'project.json'), 'utf8', (e, data)=> {
                try{
                    if(e) {
                        this.showPopup({
                            type: 'spinner',
                            messanmsg
                        });
                    } else {
                        if($.isFunction(callback)) {
                            callback(data);
                        }
                    }
                } catch(e) {
                    this.doFailProject({type:'load'});
                }
            });
        });

        fsReader.pipe(zlib.Gunzip())
            .pipe(extract);
    }

    doCreateProjectFile(destPath) {

        Entry.stage.handle.setVisible(false);
        Entry.stage.update();

        const projectObject = Entry.exportProject();
        projectObject.name = this.getProjectName();

        const stringProject = JSON.stringify(projectObject);
        const tempPath = path.resolve(this.appPath, 'temp');
        const projectJsonPath = path.resolve(tempPath, 'project.json');

        this.doMakeDir(tempPath, '0777', ()=> {
            fs.writeFile(projectJsonPath, stringProject, {encoding: 'utf8', mode: '0777'}, (e)=> {
                try {
                    if(e) {
                        this.doFailProject({type:'save'});
                    } else {
                        let pack = tar.pack(tempPath, {
                            mode: '0777',
                            type: 'directory'
                        });

                        const fsWriter = fs.createWriteStream(destPath);

                        fsWriter.on('close', ()=> {
                            Entry.toast.success(Lang.Workspace.saved, `project_name ${Lang.Workspace.saved_msg}`);
                            this.hidePopup();
                        })

                        pack.pipe(zlib.Gzip())
                            .pipe(fsWriter)
                    }
                } catch(e) {
                    this.doFailProject({type:'save'});
                }
            });
        });
    }

    // 저장 다이얼로그 열기
    doOpenSaveDialog(callback) {
        this.defSavePath = localStorage.getItem('defPath') || '';
        let savePath = this.doMakeExsistFileName(this.defSavePath);
        dialog.showSaveDialog({
            defaultPath: savePath,
            title: Lang.Workspace.file_save,
            filters: [
                {
                    name: 'Entry Mini File',
                    extensions: [this.defExt]
                }
            ]
        }, callback);

    }

    // 
    doMakeExsistFileName(target) {
        if(fs.existsSync(target)) {
            let parser = path.parse(target);
            let tester = RegExp(/\([0-9]*\)$/);
            if(tester.test(parser.name)) {
                parser.name = parser.name.replace(tester, (value)=> {
                    return value.replace(/\d/, (num)=> {
                        return ++num;
                    });
                });
            }

            return doMakeExsistFileName(path.resolve(parser.dir, parser.name, parser.ext));
        } else {
            return target;
        }
    }

    // doReloadApplication() 어플리케이션을 다시 로드 한다.
    doReloadApplication() {
        ipcRenderer.send('reload');
    }

    // 팝업을 띄운다.
    showPopup({type, message = ''}) {
        // this.hidePopup();
        switch(type) {
            case 'spinner': {
                this.popupTitle.text(message);
                this.popupHelper.show('workspaceSpinner');
                break;
            }

            case 'fail': {
                this.popupFailTitle.html(message);
                this.popupHelper.show('workspaceFailed');                
                break;
            }
        }
    }

    // 팝업을 안보이게 한다.
    hidePopup() {
        popupHelper.hide();
    }

    /**
    * createDomByEntry() 생성한 엘리먼트 배열을 리턴한다.
    * 
    * @param {Array} domList
    * @return {Array} elementList
    */
    doCreateDomByEntry(domList) {
        let elementList = [];
        domList.forEach(({name, tagName, text, html, value, option, event})=> {
            if(typeof option.parent === 'string') {
                option.parent = elementList[option.parent];
            }
            let $dom = Entry.Dom(tagName, option);

            if(text) {
                $dom.text(text);
            }

            if(html) {
                $dom.html(html);
            }

            if(value) {
                $dom.val(value);
            }

            if(event) {
                let {type, func} = event;
                $dom.on(type, func);
            }
            elementList[name] = $dom;
        });

        return elementList;
    }

    /**
    * doInitProjectFolder() 프로젝트 폴더를 초기화 한다.
    * 
    * @param {Function} callback
    */
    doInitProjectFolder(callback) {
        let tempPath = path.resolve(this.appPath, 'temp');
        this.doRemoveDir(tempPath);
        this.doMakeDir(tempPath, ()=> {
            if($.isFunction(callback)) {
                callback();
            };
        });
    };

    /**
    * doInitProjectFolder() 해당 폴더를 자식을 포함 통째로 삭제한다.
    * 
    * @param {String} target
    */
    doRemoveDir(target) {
        if(fs.existsSync(target)) {
            fs.readdirSync(target).forEach((file, index)=> {
                var curPath = path.resolve(target, file);
                if(fs.lstatSync(curPath).isDirectory()) {
                    this.doRemoveDir(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(target);
        }
    }

    /**
    * doMakeDir() 해당 폴더를 자식을 포함 통째로 삭제한다.
    * 
    * @param {String} target
    * @param {Function} callback
    */
    doMakeDir(...args) {
        let target;
        let callback;
        let mode = '0777'; 

        if(args.length == 2) {
            [target, callback] = args;
        } else {
            [target, mode, callback] = args;
        }

        if (!fs.existsSync(target)) {
            var parser = path.parse(target);
            this.doMakeDir(parser.dir);
            fs.mkdirSync(target, mode);
        }

        if($.isFunction(callback)) {
            callback();
        }
    }
}

export default new Util();