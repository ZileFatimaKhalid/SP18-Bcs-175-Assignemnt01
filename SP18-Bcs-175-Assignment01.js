var selectedRow = null;

var updateIndex = -1;

function onFormUpdate() {
  var formData = readFormData();
  console.log(formData);
  insertNewRecord(formData);
}

function setUpdateDisabled(disabled) {
  document.getElementById("update").disabled = disabled;
  document.getElementById("add").disabled = !disabled;
}

var add = document.getElementById("add");
add.addEventListener("click", insertNewRecord);

var update = document.getElementById("update");
update.addEventListener("click", updateFormValues);

let selectElement = document.getElementById("city");
let valueSelected = selectElement.options[selectElement.selectedIndex].value; // get selected option value
var citySelected = selectElement.options[selectElement.selectedIndex].text;
document.getElementById("city").value= citySelected;

function handlevalues(params) {
  document.getElementById("Name").value = null;
  document.getElementById("Age").value = null;
  document.getElementById("male").checked = true;
  document.getElementById("city").value='Lahore';   
   
}

function readFormData() {
    var formData = {};
    formData["Name"] = document.getElementById("Name").value;
    formData["Gender"] = document.getElementById("male").checked
        ? "male"
        : "female";
    formData["Age"] = document.getElementById("Age").value;  
    citydata = document.getElementById("city");
    formData["City"] = citydata.options[selectElement.selectedIndex].text;

  return formData;
}

function insertNewRecord() {
  const data = readFormData();

  var table = document.getElementById("studentlist").getElementsByTagName("tbody")[0];
  
  var rows = table.rows.length;
  var newRow = table.insertRow(rows);

  var cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.Name;

  var cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.Gender;

  var cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.Age;

  var cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.City;

  var cell5 = newRow.insertCell(4);
  cell5.innerHTML = `<a onclick="onUpdate(${rows})">Update/</a>
                       <a onclick= "onRemove(this)">Remove</a>`;
}

function onUpdate(index) {
  
  setUpdateDisabled(false);
  var table = document.getElementById("studentlist");
  selectedRow = table.rows[index + 1];
  
  updateIndex = index + 1;
  document.getElementById("Name").value = selectedRow.cells[0].innerHTML;
  var genderId = selectedRow.cells[1].innerHTML;
  document.getElementById(genderId).checked = true;
  document.getElementById("Age").value = selectedRow.cells[2].innerHTML;
  document.getElementById("city").value = selectedRow.cells[3].innerHTML;
  
}

function updateFormValues() {
    if (updateIndex === -1) {
    return;
  }
var data = readFormData();
var table = document.getElementById("studentlist").getElementsByTagName("tbody")[0];
  
console.log(updateIndex);

selectedRow.cells[0].innerHTML = document.getElementById("Name").value;
selectedRow.cells[1].innerHTML = data.Gender;
selectedRow.cells[2].innerHTML = document.getElementById("Age").value;
selectedRow.cells[3].innerHTML = document.getElementById("city").value;
  
updateIndex = -1;
setUpdateDisabled(true);
}

function onRemove(index) {
  var row = index.parentElement.parentElement;
  row.parentElement.removeChild(row);
}
