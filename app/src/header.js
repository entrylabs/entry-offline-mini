"use strict";
require('./hw.js');

$(document).ready(() => {
    var container = $('#header');
    var domList;
    var headerDomList = [{
        name: 'logoDiv',
        tagName: 'div',
        option: {
            parent: container,
            class: 'logoDiv'
        }
    }, {
        name: 'titleDiv',
        tagName: 'div',
        option: {
            parent: container,
            class: 'titleDiv'
        }
    }, {
        name: 'titleInput',
        tagName: 'input',
        value: util.getProjectName(),
        option: {
            parent: 'titleDiv',
            class: 'titleInput'
        },
        event: {
            type: 'blur',
            func: ()=> {
                util.setProjectName(domList.titleInput.val());
            }
        }
    }, {
        name: 'toolbarDiv',
        tagName: 'div',
        option: {
            parent: container,
            class: 'toolbarDiv'
        }
    }, {
        name: 'hwDiv',
        tagName: 'div',
        option: {
            parent: 'toolbarDiv',
            class: 'hwDiv'
        }
    },  {
        name: 'hwStatusDiv',
        tagName: 'div',
        option: {
            parent: 'hwDiv',
            classes: ['hwStatusDiv', 'red']
        }
    }, {
        name: 'hwConnectBtn',
        tagName: 'span',
        option: {
            parent: 'hwDiv',
            class: 'hwConnectBtn',
        },
        text: '하드웨어 연결하기',
        event: {
            type: 'click',
            func: (e) => {
                const hwStatusDiv = domList['hwStatusDiv'];
                const hwConnectBtn = domList['hwConnectBtn'];
                hwStatusDiv.removeClass('red green');
                hwStatusDiv.addClass('yellow');
                if(!Entry.hw.connected) {
                    hwConnectBtn.text('하드웨어 연결하는중');
                    Entry.hw.startRouter();
                } else {
                    hwConnectBtn.text('하드웨어 종료하는중');            
                    Entry.hw.stopRouter();
                }
            }
        }
    }, {
        name: 'menuDiv',
        tagName: 'div',
        option: {
            parent: 'toolbarDiv',
            class: 'menuDiv'
        }
    }, {
        name: 'newMenu',
        tagName: 'div',
        option: {
            parent: 'toolbarDiv',
            class: 'dropdown'
        }
    }, {
        name: 'newButton',
        tagName: 'button',
        option: {
            parent: 'newMenu',
            id: 'newButton',
            class: 'dropbtn'
        },
        event: {
            type: 'click',
            func: ()=> {
                document.getElementById("newMenuListDiv").classList.toggle("show");
                document.getElementById("saveMenuListDiv").classList.remove("show");
            }
        }
    }, {
        name: 'newMenuListDiv',
        tagName: 'div',
        option: {
            parent: 'newMenu',
            id: 'newMenuListDiv',
            class: 'dropdown-content'
        }
    }, {
        name: 'newMenuItemInit',
        tagName: 'a',
        text: '새로 만들기',
        option: {
            parent: 'newMenuListDiv',
            class: 'link-item'
        },
        event: {
            type: 'click',
            func: ()=> {
                util.doStartNewProject();
            }
        }
    }, {
        name: 'newMenuItemOpen',
        tagName: 'a',
        text: '불러 오기',
        option: {
            parent: 'newMenuListDiv',
            class: 'link-item'
        },
        event: {
            type: 'click',
            func: ()=> {
                util.doLoadProject();
            }
        }
    }, {
        name: 'saveMenu',
        tagName: 'div',
        option: {
            parent: 'toolbarDiv',
            class: 'dropdown'
        }
    }, {
        name: 'saveButton',
        tagName: 'button',
        option: {
            parent: 'saveMenu',
            id: 'saveButton',
            class: 'dropbtn'
        },
        event: {
            type: 'click',
            func: ()=> {
                document.getElementById("newMenuListDiv").classList.remove("show");
                document.getElementById("saveMenuListDiv").classList.toggle("show");
            }
        }
    }, {
        name: 'saveMenuListDiv',
        tagName: 'div',
        option: {
            parent: 'newMenu',
            id: 'saveMenuListDiv',
            class: 'dropdown-content'
        }
    }, {
        name: 'saveMenuItemSave',
        tagName: 'a',
        text: '저장하기',
        option: {
            parent: 'saveMenuListDiv',
            class: 'link-item'
        },
        event: {
            type: 'click',
            func: ()=> {
                util.doSaveProject({ state: 'save' });
            }
        }
    }, {
        name: 'saveMenuItemSaveAs',
        tagName: 'a',
        text: '복사본으로 저장하기',
        option: {
            parent: 'saveMenuListDiv',
            class: 'link-item'
        },
        event: {
            type: 'click',
            func: ()=> {
                util.doSaveProject({ state: 'saveAs' });
            }
        }
    }, {
        name: 'undoButton',
        tagName: 'button',
        option: {
            parent: 'toolbarDiv',
            id: 'undoButton',
            class: 'toolbarIconButton'
        },
        event: {
            type: 'click',
            func: ()=> {
                Entry.dispatchEvent('undo');
            }
        }
    }, {
        name: 'redoButton',
        tagName: 'button',
        option: {
            parent: 'toolbarDiv',
            id: 'redoButton',
            class: 'toolbarIconButton'
        },
        event: {
            type: 'click',
            func: ()=> {
                Entry.dispatchEvent('redo');
            }
        }
    }]

    // window.util = util;
    util.setDefaultPopup();

    domList = util.doCreateDomByEntry(headerDomList);
    let $dropdowns = $(".dropdown-content");
    // remove dropdown menu on click
    $(document).on('click', (e)=> {
        if(!$(e.target).is('.dropbtn')) {
            $dropdowns.removeClass('show');
        }
    });
});


