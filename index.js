"use strict";

(function init() {
    var data = [
        {
            name: 'Praca',
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

    function saveTabState(tabId) {
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
        if (editTask) {
            input.value = editTask.innerText;
        }

        $(form).show();
        $('#shadow').show();
    }
    

    function bindEvents() {
        var addTabBtn = document.getElementById('tab_add');
        addTabBtn.addEventListener("click", function () {

            $("button.delete").hide();
            showTableEditor();
        });

        var addTaskBtn = document.getElementById('tasks_add');
        addTaskBtn.addEventListener("click", function () {

            $("button.delete").hide();
            showTaskEditor();
        });

        $(".tasks li").dblclick(function() {
            editTask = this;
            $("button.delete").show();
            showTaskEditor();
        });

        var tabBtns = document.getElementsByClassName('tab');
        [].forEach.call(tabBtns, function (btn) {

            btn.addEventListener("dblclick", function () {
                editTab = this;
                showTableEditor();
            });

            btn.addEventListener("click", function (event, btn) {
                deactivateTabs();
                this.setAttribute("data-active", "yes");
                setTabState(this.innerText);
            });


        });

        $(".popup .exit").click(function () {
            var popup = $(".popup");
            popup.hide();
            $('#shadow').hide();
            $(".popup input").val("");
        });

        $("#table_editor button.save").click(function (e) {
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
                tabs.appendChild(li);
                li.addEventListener("click", function (event, btn) {
                    deactivateTabs();
                    this.setAttribute("data-active", "yes");
                    setTabState(this.innerText);
                });
                
            }
            input.value = '';
            $('#shadow').hide();
            $(form).hide();
        });

        $("#task_editor button.save").click(function (e) {
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
                    editTask = this;
                    showTaskEditor();
                });
                
            }
            input.value = '';
            $('#shadow').hide();
            $(form).hide();
            saveTabState(getCurrentTabId());
        });

        $("#task_editor button.delete").click(function (e) {
            var form = document.getElementById("task_editor");
            $(editTask).remove();
            $(form).hide();
            saveTabState(getCurrentTabId());
        });

        $(".tasks").sortable({
            connectWith: ".tasks",
            stop: function (event, ui) {
                console.log("stop");
                saveTabState(getCurrentTabId());
                console.log(data);
            }
        }).disableSelection();
    }

    
    setTabState(getCurrentTabId());
    bindEvents();
    
})();