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




    var addTabBtn = document.getElementById('tab_add');
    addTabBtn.addEventListener("click", function () {
        var tabs = document.getElementById("tabs");
        var li = document.createElement("li");
        li.setAttribute("class", "tab");
        li.innerText = "Test tab";
        tabs.appendChild(li);
        li.addEventListener("click", function (event, btn) {
            deactivateTabs();
            this.setAttribute("data-active", "yes");
            setTabState(this.innerText);
        });
        alert("Add tab");
    });

    var addTaskBtn = document.getElementById('tasks_add');
    addTaskBtn.addEventListener("click", function () {
        var tasks = document.querySelector(".tasks[data-id='tasksTodo']");
        var li = document.createElement("li");
        li.innerText = "Test";
        tasks.appendChild(li);
        saveTabState(getCurrentTabId());
    });

    var tabBtns = document.getElementsByClassName('tab');
    [].forEach.call(tabBtns, function (btn) {
        btn.addEventListener("click", function (event, btn) {
            deactivateTabs();
            this.setAttribute("data-active", "yes");
            setTabState(this.innerText);
        });
    });

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

    $(".tasks").sortable({
        connectWith: ".tasks",
        stop: function (event, ui) {
            console.log("stop");
            saveTabState(getCurrentTabId());
            console.log(data);
        }
    }).disableSelection();

    setTabState(getCurrentTabId());
})();