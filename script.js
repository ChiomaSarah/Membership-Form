window.onload = function () {
  //create the dropdown list for the age input
  for (var i = 1; i <= 100; i++) {
    var option = document.createElement("OPTION");
    option.innerHTML = i;
    option.value = i;
    age.appendChild(option);
  }

  //addEventListener to the register button to create a records table
  let register = document.getElementById("add");
  register.addEventListener("click", addDetails);

  // store club members in an array and create a uniqueID
  let clubMembers = [];
  let memberID = 1;

  function addDetails() {
    let firstname = document.getElementById("fname").value;
    let surname = document.getElementById("sname").value;
    let age = document.getElementById("age").value;
    let level = document.getElementById("level").value;
    let club = document.getElementById("club").value;

    // form validation
    if (!firstname || !surname || !age || !level || !club) {
      alert("All fields are required.");
      return;
    }
    // upon validation, push input values into the array created above.For each member registered, the member's ID increases.
    else {
      clubMembers.push({
        memberID,
        firstname,
        surname,
        age,
        level,
        club,
      });
      memberID++;

      //save all the stored data in localStorage
      let members_serialized = JSON.stringify(clubMembers);
      localStorage.setItem("club members", members_serialized);

      //the records table is styled to be hidden, but onclick of the register button, the table should become visible, showing all the received data.
      var showTable = document.getElementById("tbl");
      showTable.style.visibility = "visible";

      // insert cells (td) into the table
      let tableDetails = document.getElementById("tbl");
      let row = tableDetails.insertRow();
      let cellA = row.insertCell(0);
      let cellB = row.insertCell(1);
      let cellC = row.insertCell(2);
      let cellD = row.insertCell(3);
      let cellE = row.insertCell(4);
      let cellF = row.insertCell(5);

      cellA.innerHTML = firstname;
      cellB.innerHTML = surname;
      cellC.innerHTML = age;
      cellD.innerHTML = level;
      cellE.innerHTML = club;
      cellF.innerHTML = '<button class="deleteRow">Remove</button>';
      //the last line appends a delete column to the table on display.
    }
    alert("Record saved succesfully!");
    // reset the form to update it.
    form.reset();
  }

  // addEventListener to delete a row from the table
  let table = document.querySelector("table");
  table.addEventListener("click", onDeleteRow);

  function onDeleteRow(e) {
    //   check if our target button has a class of deleteRow
    if (!e.target.classList.contains("deleteRow")) {
      return;
    }
    // drop a confirmation message before deleting
    let verify = confirm(
      "Are you sure you want to delete this record?\n\nThis action cannot be undone."
    );
    if (!verify === true) {
      return;
    } else {
      const btn = e.target;
      btn.closest("tr").remove();

      //  upon confirmation and delete, update the localStorage as well
      let members = JSON.parse(localStorage.getItem("club members"));
      members.forEach(function (index) {
        members.splice(index, 1);
      });
      localStorage.setItem("club members", JSON.stringify(members));
    }
    alert("Record has been succesfully deleted!");
    var hideTable = document.getElementById("tbl");
    hideTable.style.visibility = "hidden";
  }
  form.reset();
};
