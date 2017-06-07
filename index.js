"use strict";

(function init() {

    var colors = ["#89609E", "#519839", "#CD5A91", "#4BBF6B","#00AECC"];
    var data = [
        {
            name: 'Praca',
            color: '#0079BF',
            lists: {
                tasksTodo: [
                    "Napisać testy do modułu Wiadomości",
                    "Utworzyć helper dla Zamówień",
                    "Zrefaktoryzować kod",
                    "Poprawić funkcję drukowania"
                ],
                tasksCurrent: [
                    "Poprawić literówki w module A",
                    "Spotkanie z klientem",
                    "Wysłać maila po podwyżke"
                ],
                tasksDone: [
                    "Przeczytać książke o JS",
                    "Zrobić repozytorium"
                ]
            }
        },
        {
            name: 'Szkoła',
            color: '#D29034',
            lists: {
                tasksTodo: [
                    "Zrobić sprawozdanie z matematyki",
                    "Opracować materiał do kolosa"
                ],
                tasksCurrent: [
                    "Nauczyć się na egzamin"
                ],
                tasksDone: [
                    "Przeczytać książke o JS",
                    "Zaliczyć programowanie"
                ]
            }
        },
        {
            name: 'Dom',
            color: '#B04632',
            lists: {
                tasksTodo: [
                    "Zrobić pranie",
                    "Kupić wodę mineralną",
                    "Wymienić zamek w drzwiach",
                    "Naoliwić krzesło",
                    "Opłacić rachunki"
                ],
                tasksCurrent: [
                    "Posprzątać",
                    "Zmienić pościel"
                ],
                tasksDone: [
                    "Kupić kwiaty",
                    "Ugotować obiad",
                    "Wyprowadzić psa"
                ]
            }
        },
    ];

    
    

    

    function deactivateTabs() {
        var tabBtns = document.getElementsByClassName('tab');
        [].forEach.call(tabBtns, function (btn) {
            btn.setAttribute("data-active", "no")
        });
    }

    function getTabData(tabId) {
        var result = null;
        [].forEach.call(data, function (tabData) {
            if (tabData.name === tabId) {
                result = tabData;
            }
        });
        return result;
    }

    function hideEditors() {
        var popup = $(".popup");
        popup.hide();
        $('#shadow').hide();
        $(".popup input").val("");
        $("button.delete").hide();
        editTab = null;
        editTask = null;
    }

    function saveTabState() {
        var tabId = getCurrentTabId();
        var tabData = getTabData(tabId);
        if (tabData === null) {
            tabData = {
                name: tabId,
                lists: {}
            };
            data.push(tabData);
        }
        var taskLists = document.querySelectorAll('.list .tasks');
        [].forEach.call(taskLists, function (taskList) {
            var listId = taskList.getAttribute("data-id");
            tabData.lists[listId] = [];

            var tasks = taskList.querySelectorAll('li');

            [].forEach.call(tasks, function (task) {
                tabData.lists[listId].push(task.innerText);
            });
        });
        
    }

    function setTabState(tabId) {
        var tabData = getTabData(tabId);
        var taskLists = document.querySelectorAll('.list .tasks');
        var color = "";
        if (tabData && tabData.color) {
            color = tabData.color;
        } else {
            color = $(getCurrentTab()).css('background-color');
        }

        $(content).css("background-color", color);

        [].forEach.call(taskLists, function (taskList) {
            var listId = taskList.getAttribute("data-id");
            var tasks = taskList.querySelectorAll('li');


            taskList.innerHTML = "";

            if (tabData && tabData.lists) {
                [].forEach.call(tabData.lists[listId], function (task) {
                    let li = document.createElement("li");
                    li.innerText = task;
                    taskList.appendChild(li);
                })
            }
        });
    }

    function getCurrentTabId() {
        var tab = document.querySelector(".tab[data-active='yes']");
        return tab.innerText;
    }

    function getCurrentTab() {
        var tab = document.querySelector(".tab[data-active='yes']");
        return tab;
    }

    function setTabsColor() {
        var tabs = document.querySelectorAll('#tabs .tab');
        [].forEach.call(tabs, function (tab) {
            var tabData = getTabData(tab.innerText);
            $(tab).css("background-color", tabData.color);
        });
    }

    var editTab = null;
    var editTask = null;

    function showTableEditor() {
        var form = document.getElementById("table_editor");
        var input = form.querySelector("input");
        if (editTab) {
            input.value = editTab.innerText;
        }

        $(form).show();
        $('#shadow').show();
    }

    function showTaskEditor() {
        var form = document.getElementById("task_editor");
        var input = form.querySelector("input");
        $("button.delete").hide();
        if (editTask) {
            input.value = editTask.innerText;
            $("button.delete").show();
        }

        $(form).show();
        $('#shadow').show();
    }

    function activateTab(tab) {
        deactivateTabs();
        tab.setAttribute("data-active", "yes");
        setTabState(tab.innerText);
        $(".tasks li").dblclick(function () {
            editTaskName(this);
        });
    }

    function editTabName(tab) {
        editTab = tab;
        showTableEditor();
    }

    function editTaskName(task) {
        editTask = task;
        $("button.delete").show();
        showTaskEditor();
    }

    function saveTask() {
        var form = document.getElementById("task_editor");
        var input = form.querySelector("input");
        if (input.value.trim().length === 0) {
            alert("Nie wprowadzono wartości!");
            return;
        }

        if (input.value.trim().length > 50) {
            alert("Max 50 znaków");
            return;
        }
        var tasks = document.querySelector(".tasks[data-id='tasksTodo']");
        if (editTask) {
            editTask.innerText = input.value.trim();
            editTask = null;
        }
        else {

            var li = document.createElement("li");
            li.innerText = input.value.trim();
            tasks.appendChild(li);
            li.addEventListener("dblclick", function () {
                editTaskName(this);
            });

        }
        input.value = '';
        hideEditors();
        saveTabState();
    }

    function saveTab() {
        var form = document.getElementById("table_editor");
        var input = form.querySelector("input");
        if (input.value.trim().length === 0) {
            alert("Nie wprowadzono wartości!");
            return;
        }

        if (input.value.trim().length > 20) {
            alert("Max 20 znaków");
            return;
        }
        var tabs = document.getElementById("tabs");
        if (editTab) {
            editTab.innerText = input.value;
            editTab = null;
        }
        else {
            var li = document.createElement("li");
            li.setAttribute("class", "tab");
            li.innerText = input.value.trim();
            $(li).css("background-color", colors[0]);
            colors = colors.splice(1);
            tabs.appendChild(li);
            li.addEventListener("click", function () {
                activateTab(this);
            });

            li.addEventListener("dblclick", function () {
                editTabName(this);
            });

        }
        input.value = '';
        hideEditors();
    }

    function deleteTask() {
        var form = document.getElementById("task_editor");
        $(editTask).remove();
        hideEditors();
        saveTabState();
    }
    

    function bindEvents() {
        var addTabBtn = document.getElementById('tab_add');
        addTabBtn.addEventListener("click", function () {
            showTableEditor();
        });

        var addTaskBtn = document.getElementById('tasks_add');
        addTaskBtn.addEventListener("click", function () {
            showTaskEditor();
        });

        $(".tasks li").dblclick(function () {
            editTaskName(this);
        });

        var tabBtns = document.getElementsByClassName('tab');
        [].forEach.call(tabBtns, function (btn) {

            btn.addEventListener("dblclick", function () {
                editTabName(this);
            });

            btn.addEventListener("click", function () {
                activateTab(this);
            });
        });

        $(".popup .exit").click(function () {
            hideEditors();
        });

        $("#table_editor button.save").click(function (e) {
            saveTab();
        });

        $("#task_editor button.save").click(function (e) {
            saveTask();
        });

        $("#task_editor button.delete").click(function (e) {
            deleteTask();
        });

        $(".tasks").sortable({
            connectWith: ".tasks",
            stop: function (event, ui) {
                console.log("stop");
                saveTabState();
                console.log(data);
            }
        }).disableSelection();
    }

    setTabsColor();
    setTabState(getCurrentTabId());
    bindEvents();
    
})();