console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title : addTitle.value,
    text : addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addTxt.value = "";
//   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem; box-shadow: 4px 4px 3px grey; background-image:linear-gradient(white,rgb(240,240,240));">
                    <div class="card-body">
                        <h5 class="card-title"> ${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" style="border:black;" class="btn btn-primary">Delete</button>
                        <button id="${index}"onclick="editNote(this.id)" style="border:black;" class="btn btn-primary">Update</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);
   let confirmDel = confirm("Are you sure to delete!")
   
   if(confirmDel == true){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
   }
 
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//Function to edit notes

function editNote(index){
  let notes = localStorage.getItem("notes");
  if(addTitle.value !== "" || addTxt.value !== ""){
    return alert("Please clear the form before editting a note");
  }
  if(notes == null){
    notesObj = [];
  }else {
    notesObj = JSON.parse(notes);
  }
  notesObj.findIndex((element, index) => {
    addTitle.value = element.title;
    addTxt.value = element.text;
  }) 
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

const btn = document.querySelector(".submit-rating");
const thanksmsg = document.querySelector(".thanks-msg");
const starRating = document.querySelector(".star-input");
// Success msg show/hide
btn.onclick = () => {
    starRating.style.display = "none";
    thanksmsg.style.display = "table";
    return false;
};
/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/