let tempTask = 0;
let completeTasksarr = [];
let incompleteTasks = [];
let totalTasks = 0;
let addButton = document.getElementById("add-button");

addButton.addEventListener('click',addTask);
document.getElementById('incomplete').addEventListener('click',allincommplete);
document.getElementById('complete').addEventListener('click',allcommplete);
document.getElementById('all').addEventListener('click',allelement);
document.getElementById('clear-complete').addEventListener('click',allCompleteClear);
document.getElementById('all-done').addEventListener('click',doAllComplete);

function doAllComplete(){
    for(let elem of incompleteTasks){
        elem.children[0].innerHTML = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>&nbsp&nbsp';
        elem.setAttribute('checked','1');
        elem.style.backgroundColor = 'lightblue';
        completeTasksarr.push(elem);
    }
    totalTasks-=incompleteTasks.length;
    incompleteTasks = [];
    allcommplete();
}

function allCompleteClear(){
    completeTasksarr = [];
    totalTasks-=completeTasksarr.length;
    allincommplete();
}

function allincommplete(){
    let listBlock = document.querySelector('#task-list ul');
    listBlock.innerHTML="";
    for(let elem of incompleteTasks){
        listBlock.appendChild(elem);
    }
    $('#task-count').html(incompleteTasks.length);
}

function allcommplete(){
    let listBlock = document.querySelector('#task-list ul');
    listBlock.innerHTML="";
    for(let elem of completeTasksarr){
        listBlock.appendChild(elem);
    }
    $('#task-count').html(completeTasksarr.length);
}

function allelement(){
    let listBlock = document.querySelector('#task-list ul');
    listBlock.innerHTML="";
    for(let elem of completeTasksarr){
        listBlock.appendChild(elem);
    }
    for(let elem of incompleteTasks){
        listBlock.appendChild(elem);
    }
    $('#task-count').html(completeTasksarr.length+incompleteTasks.length);
}

function addTask(){
    let text = document.getElementById('task-input');
    if(text.value.length==0){
        return;
    }

    let listBlock = document.querySelector('#task-list ul');
    let listElement = document.createElement('li');

    let iconComplete = document.createElement('div');
    iconComplete.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>&nbsp&nbsp';
    listElement.appendChild(iconComplete);

    let textVal = document.createElement('span');
    textVal.innerHTML = text.value;
    listElement.appendChild(textVal);
    listElement.style.listStyle = "none";
    listElement.style.position = "relative";

    
    let removeButton = document.createElement('div');
    removeButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    // removeButton.style.display="flex";
    removeButton.style.position = "absolute";
    removeButton.style.right = "25px";
    removeButton.style.justifyContent="flex-end";

    
    listElement.style.display="flex";
    listElement.appendChild(removeButton);
    listElement.setAttribute('checked','0');

    listBlock.appendChild(listElement);

    incompleteTasks.push(listElement);

    listElement.addEventListener('click',completeTask.bind(listElement));

    removeButton.addEventListener('click',removeTask.bind(removeButton));
    totalTasks+=1;
    $('#task-count').html(totalTasks);
    text.value="";

    function removeTask(temp1){
        // console.log(temp1.target.parentElement.parentElement);
        temp1.target.parentElement.parentElement.remove();

        totalTasks-=1;
        $('#task-count').html(totalTasks);
        temp1.stopPropagation();

    }

    function completeTask(element){
        
        if(element.target.getAttribute('checked') === '0'){
            element.target.children[0].innerHTML = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>&nbsp&nbsp';
            element.target.setAttribute('checked','1');
            element.target.style.backgroundColor = 'lightblue';
            completeTasksarr.push(element.target);
            console.log(element.target);
            let index=0;
            for(let elem of incompleteTasks){
                if(element.target==elem){
                    incompleteTasks.splice(index,1);
                    break;
                }
                index+=1;
            }
        }
        else if(element.target.getAttribute('checked') === '1'){
            element.target.children[0].innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>&nbsp&nbsp';
            element.target.style.backgroundColor = 'white';
            element.target.setAttribute('checked','0');
            incompleteTasks.push(element.target);
            // completeTasksarr.pop();
            let index=0;
            for(let elem of completeTasksarr){
                if(element.target==elem){
                    completeTasksarr.splice(index,1);
                    break;
                }
                index+=1;
            }
            console.log(element.target);
        }
        
    }
}