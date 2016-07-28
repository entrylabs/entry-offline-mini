$(document).ready(() => {

    var container = $('#header');

    var logoDiv = Entry.Dom('div', {
        parent: container,
        class: 'logoDiv'
    });

    var titleDiv = Entry.Dom('div', {
        parent: container,
        class: 'titleDiv'
    });

    var titleInput = Entry.Dom('input', {
        parent: titleDiv,
        class: 'titleInput'
    });

    var hwDiv = Entry.Dom('div', {
        parent: container,
        class: 'hwDiv'
    });

    var hwConnectBtn = Entry.Dom('button', {
        parent: hwDiv,
        class: 'hwConnectBtn'
    });
    hwConnectBtn.text('하드웨어 연결하기');

    // 버튼 텍스트를 '연결하기,연결중,연결끊기'로 해도 좋을듯.
    // 버튼색상을 상태에 따라 신호등으로 바꾸는것도. 일단, 공간 확보.
    var hwStatusDiv = Entry.Dom('div', {
        parent: hwDiv,
        class: 'hwStatusDiv'
    });

    var toolbarDiv = Entry.Dom('div', {
        parent: container,
        class: 'toolbarDiv'
    });

    // New Menu
    var newMenu = Entry.Dom('div', {
        parent: toolbarDiv,
        class: 'dropdown'
    });

    var newButton = Entry.Dom('button', {
        parent: newMenu,
        id: 'newButton',
        class: 'dropbtn'
    });
    newButton.click(function() {
        document.getElementById("newMenuListDiv").classList.toggle("show");
        document.getElementById("saveMenuListDiv").classList.remove("show");
    });

    var newMenuListDiv = Entry.Dom('div', {
        parent: newMenu,
        id: 'newMenuListDiv',
        class: 'dropdown-content'
    });
    var newMenuItemInit = Entry.Dom('a', {
        parent: newMenuListDiv,
        class: 'link-item'
    });
    newMenuItemInit.html("새로 만들기");
    newMenuItemInit.click(function() {
        console.log('TODO: 새로만들기 클릭!');
    });
    var newMenuItemOpen = Entry.Dom('a', {
        parent: newMenuListDiv,
        class: 'link-item'
    });
    newMenuItemOpen.html("불러 오기");
    newMenuItemOpen.click(function() {
        console.log('TODO: 불러오기 클릭!');
    });


    // Save Menu
    var saveMenu = Entry.Dom('div', {
        parent: toolbarDiv,
        class: 'dropdown'
    });

    var saveButton = Entry.Dom('button', {
        parent: saveMenu,
        id: 'saveButton',
        class: 'dropbtn'
    });
    saveButton.click(function() {
        document.getElementById("newMenuListDiv").classList.remove("show");
        document.getElementById("saveMenuListDiv").classList.toggle("show");
    });
    var saveMenuListDiv = Entry.Dom('div', {
        parent: newMenu,
        id: 'saveMenuListDiv',
        class: 'dropdown-content'
    });
    var saveMenuItemSave = Entry.Dom('a', {
        parent: saveMenuListDiv,
        class: 'link-item'
    });
    saveMenuItemSave.html("저장하기");
    saveMenuItemSave.click(function() {
        console.log('TODO: 저장하기 클릭!');
    });
    var saveMenuItemSaveAs = Entry.Dom('a', {
        parent: saveMenuListDiv,
        class: 'link-item'
    });
    saveMenuItemSaveAs.html("복사본으로 저장하기");
    saveMenuItemSaveAs.click(function() {
        console.log('TODO: 복사본으로 저장하기 클릭!');
    });

    // Undo & Redo
    var undoButton = Entry.Dom('button', {
        parent: toolbarDiv,
        id: 'undoButton',
        class: 'toolbarIconButton'
    });
    undoButton.click(function() {
        console.log('TODO: UNDO 클릭!');
    });

    var redoButton = Entry.Dom('button', {
        parent: toolbarDiv,
        id: 'redoButton',
        class: 'toolbarIconButton'
    });
    redoButton.click(function() {
        console.log('TODO: REDO 클릭!');
    });

    // remove dropdown menu on click
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

});
