//created an array. if local storage is emply it returns an empty array, if not it returns the tasks from local storage to be displayed
function getList() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}
//created an array for time. if local storage is emply it returns an empty array, if not it returns the tasks from local storage to be displayed
function getTime() {
    var time = new Array;
    var time_str = localStorage.getItem('timelist');
    if (time_str !== null) {
        time = JSON.parse(time_str);
    }
    return time;
}
//click even on keypress enter, retrieves the two array lists then adds/pushes the clicked time and input into there respective array. Then sets
// the arrays into local storage
//Also resets the input value to empty, for user to type again
document.getElementById('input').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    var date = new Date().toLocaleString();
    if (key === 13) {
        var task = document.getElementById('input').value;
        if (task) {
            var todos = getList();
            var time = getTime();
            todos.push(task);
            time.push(date);
            localStorage.setItem('todo', JSON.stringify(todos));
            localStorage.setItem('timelist', JSON.stringify(time));
            document.getElementById('input').value = "";
            show();
        }
    }
});
//click even on keypress enter, retrieves the two array lists then adds/pushes the clicked time and input into there respective array. Then sets
// the arrays into local storage
//Also resets the input value to empty, for user to type again
document.getElementById('addBtn').addEventListener('click', function () {
    var task = document.getElementById('input').value;
    var date = new Date().toLocaleString();
    if (task) {
        var todos = getList();
        var time = getTime();
        todos.push(task);
        time.push(date);
        console.log(time);
        localStorage.setItem('todo', JSON.stringify(todos));
        localStorage.setItem('timelist', JSON.stringify(time));
        document.getElementById('input').value = "";
        show();
    }
});
//function first retreives the latest array data, then loops through both and the iterated values or inserted into chuck of code which represents each but of hard coded list. then is inserted into unordered list containing the id 'unchecked'.
function show() {
    var todos = getList();
    var time = getTime();
    var html = '';
    for (var i = 0, j = 0; i < todos.length, j < time.length; i++, j++) {
        html += '<li  contenteditable="true" class="addedItem"><div draggable="true" ondragstart="dragStarted(event)" ondragover="draggingOver(event)" ondrop="dropped(event)">' + todos[i] + '</div><span contenteditable="false" class="time">' + time[j] + '</span><select class="select"><option value="one">High Priority</option>  <option value="two">Medium Priority</option><option value="three">Low Priority</option></select><div class="btnGroup" contenteditable="false"> <button class="delete"id="' + i + '"><i class="material-icons" id="delete">delete</i></button><button class="done" id="done"><i class="material-icons" id="done">check_circle</i></button></div></li>';
    };
    document.getElementById('unchecked').innerHTML = html;
    deleteButton();
    checkedButton()
}

function deleteButton() {
    var deleteButton = document.getElementsByClassName('delete');
    for (var i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', remove);
    };
}

function checkedButton() {
    var checkedButton = document.getElementsByClassName('done');
    for (var i = 0; i < checkedButton.length; i++) {
        checkedButton[i].addEventListener('click', checked);
    };
}

function checked() {
    var item = this.parentNode.parentNode;
    item.classList.toggle("checked");
}

function remove() {
    var id = this.id;
    var id2 = this.id;
    var todos = getList();
    var time = getTime();
    todos.splice(id, 1);
    time.splice(id2, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
    localStorage.setItem('timelist', JSON.stringify(time));
    show();
}



//click eventlistener to clear all list
document.getElementById('clear').addEventListener('click', function () {
    if (confirm("Are you sure you want to clear the whole list?")) {
        document.getElementById("unchecked").innerHTML = "";
        localStorage.clear();
        localStorage.setItem('todo', JSON.stringify(todos));
    }
});
show();
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("info");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
btn.onclick = function () {
        modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
span.onclick = function () {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
document.getElementById('print').addEventListener('click', function () {
    window.print();
});





var source;

function dragStarted(evt){
    source = evt.target;
    evt.dataTransfer.setData("text/plain", evt.target.innerHTML);
    evt.dataTransfer.effectAllowed = "move";
}

function draggingOver(evt){
//drag over
evt.preventDefault();
//specify operation
evt.dataTransfer.dropEffect = "move";
}

function dropped(evt){
//drop
evt.preventDefault();
evt.stopPropagation();
//update text in dragged item
source.innerHTML = evt.target.innerHTML;
//update text in drop target
evt.target.innerHTML = evt.dataTransfer.getData("text/plain");
}




