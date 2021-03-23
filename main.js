let c1 = document.getElementById("c1");
let c = document.getElementById("c");

show_task();

let save_task = document.getElementById("save_task");
let task = document.getElementById("task");
let add_task = document.getElementById("add_task");


task.addEventListener("keyup",function(e){
    if(e.key=="Enter"){
        add_task1();
    }
    
    });


    // add_task.addEventListener("click",function add_task(){
    add_task.addEventListener("click",add_task1);
   function add_task1()
    {
    task_value = task.value;
    if (task_value != "") {
        storage_value = localStorage.getItem("key");
        if (storage_value == null) {
            arr = [];
        }
        else {
            arr = JSON.parse(storage_value);
        }
        arr.push(task_value);
        localStorage.setItem("key", JSON.stringify(arr));
        task.value = "";
        show_task();
    }
    else {
        alert("Please add a task");
    }
};

//    ||||||||show task function is defined here|||||||
function show_task() {
    let task_view = document.getElementById("task_view");
    storage_value = localStorage.getItem("key");


    if (storage_value == null) {
        arr = [];
    }
    else {
        arr = JSON.parse(storage_value);
    }
    let html = "";
    arr.forEach((element, index) => {
        html += `<div class="not-complete">
        <span class="spn">${index + 1}</span>
    <p>${element}</p>
    <div class="icon">
    <i class="fa fa-trash-o" onclick="delet(${index})"></i>
    <button onclick="edit(${index})">Edit</button>
    <i class="fa fa-check" onclick="done(${index})"></i>
   </div>
   </div>`;
        c.style.display = "block";
    });
    task_view.innerHTML = html;
    done();
}
//    ||||||||||delet fucction is defined here |||||||||

function delet(index) {
    
    storage_value = localStorage.getItem("key");
    arr = JSON.parse(storage_value);
   console.log(arr.splice(index, 1)); 

    localStorage.setItem("key", JSON.stringify(arr));
    if (arr.length == 0) {

        c.style.display = "none";
    }
    show_task();
}

function delet1(index) {
   
    local_storage1 = localStorage.getItem("key1");
    arr1 = JSON.parse(local_storage1);
    arr1.splice(index, 1);
    localStorage.setItem("key1", JSON.stringify(arr1));
    if (arr1.length == 0) {

        c1.style.display = "none";
    }
    show_done_task();
}
// ||||||| done function defined here |||||||||||

function done(index1) {
    storage_value = localStorage.getItem("key");
    arr = JSON.parse(storage_value);
    local_storage1 = localStorage.getItem("key1");
    if (local_storage1 == null) {
        arr1 = [];
    }
    else {
        arr1 = JSON.parse(local_storage1);
    }
    if (index1 != null) {
        arr1.push(arr[index1]);
        localStorage.setItem("key1", JSON.stringify(arr1));
        delet(index1);
    }
    show_done_task();
}
function show_done_task() {
    let done = document.getElementById("done");
    local_storage1 = localStorage.getItem("key1");
    arr1 = JSON.parse(local_storage1);
    let html1 = "";
    if (arr1 != null) {
        arr1.forEach((element, index) => {
            html1 += `<div class="complete1">
            <span class="spn">${index + 1}</span>
        <p>${[element]}</p>
        <div class="icon">
        <i class="fa fa-trash-o" onclick="delet1(${index})"></i>
     </div>
 </div>`;
            c1.style.display = "block";
        });
    }
    done.innerHTML = html1;
}
// ||||||| edit function defined here |||||||||||
let var1;
function edit(index) {
    storage_value = localStorage.getItem("key");
    arr = JSON.parse(storage_value);
    save_task.style.display = "block";
    add_task.style.display = "none";;
    task.value = arr[index];
    localStorage.setItem("key", JSON.stringify(arr));
    var1 = index;
}
save_task.addEventListener("click", function () {
    storage_value = localStorage.getItem("key");
    arr = JSON.parse(storage_value);
    arr[var1] = task.value;
    localStorage.setItem("key", JSON.stringify(arr));
    save_task.style.display = "none";
    add_task.style.display = "block";
    task.value = "";
    show_task();
});

// ||||||||||||||||| search to do ||||||||||||

let search = document.getElementById("search");
search.addEventListener("input", function () {
  

    let input_val = search.value.toUpperCase();
    let notcomplete = document.getElementsByClassName("not-complete");
    //   console.log(notcomplete[0].getElementsByTagName("p")[0]);


    Array.from(notcomplete).forEach(function (element,index){
       let searchtext=element.getElementsByTagName("p")[0].innerText.toUpperCase(); 
           if(searchtext.includes(input_val)){
               element.style.display="flex";
           }
           else{
            element.style.display="none";
           }
    });

});
// ||||||||| delet all button define here ||||||||||
let dlt_btn=document.getElementById("dltbtn");
dlt_btn.addEventListener("click",function(){
localStorage.clear();
c.style.display = "none";
c1.style.display = "none";
show_task();
show_done_task();
});
