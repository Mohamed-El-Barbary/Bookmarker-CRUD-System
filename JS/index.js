/////////////
/////////////
/////////////
var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");

bookmarkerList = [];

if (localStorage.getItem("BookmarkerContainer") !== null) {
  bookmarkerList = JSON.parse(localStorage.getItem("BookmarkerContainer"));
}
displayBookmarker();

// Function To Add
function addBookmarker() {
  if (
    validationInputs(bookmarkNameInput) &&
    validationInputs(bookmarkUrlInput)
  ) {
    var bookMarker = {
      name: bookmarkNameInput.value,
      url: bookmarkUrlInput.value,
    };
    bookmarkerList.push(bookMarker);
    localStorage.setItem("BookmarkerContainer", JSON.stringify(bookmarkerList));
    displayBookmarker();
    clearBookmarker();
  }
}

// Function To Clear
function clearBookmarker() {
  bookmarkNameInput.value = null;
  bookmarkUrlInput.value = null;

  bookmarkNameInput.classList.remove("valid-input");
  bookmarkNameInput.classList.remove("is-valid");
  bookmarkNameInput.classList.remove("is-invalid");
  bookmarkUrlInput.classList.remove("valid-input");
  bookmarkUrlInput.classList.remove("is-valid");
  bookmarkUrlInput.classList.remove("is-invalid");
}

// Function To Display
function displayBookmarker() {
  var bookmarkerTable = "";

  for (var i = 0; i < bookmarkerList.length; i++) {
    bookmarkerTable += `<tr>
                <th scope="row">${i + 1}</th>
                <td>${bookmarkerList[i].name}</td>
                <td>
                  <button type="button" id="btnVisit" class="btn btn-success">
                    <a class="text-white text-decoration-none" target="_blank" href="${
                      bookmarkerList[i].url
                    }">
                    <i class="fa-regular fa-eye me-1"></i> Visit
                    </a>
                  </button>
                </td>
                <td>
                  <button onclick="deleteBookmarker(${i})" type="button" id="btnDelete" class="btn btn-danger">
                    <i class="fa-solid fa-trash-can me-1"></i>
                    Delete
                  </button>
                </td>
              </tr>`;
  }
  document.getElementById("tBodyContent").innerHTML = bookmarkerTable;
}

// Function To Delete
function deleteBookmarker(index) {
  bookmarkerList.splice(index, 1);
  localStorage.setItem("BookmarkerContainer", JSON.stringify(bookmarkerList));
  displayBookmarker();
}

// Validation Inputs

function validationInputs(element) {
  var regex = {
    bookmarkName:
      /^[a-zA-Z0-9]{3,}([-_][a-zA-Z0-9]{3,})*(\s[a-zA-Z0-9]{3,}([-_][a-zA-Z0-9]{3,})*)?$/,
    bookmarkUrl: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
  };
  var text = element.value;

  if (regex[element.id].test(text)) {
    element.classList.add("valid-input");
    element.classList.remove("invalid-input");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("invalid-input");
    element.classList.remove("valid-input");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

//^ Popup Validation

var popup = document.getElementById("validationPopup");
var closePopup = document.getElementById("closePopup");

// Function to show the popup

function showPopup() {
  popup.classList.remove("hidden");
}

// Function to hide the popup
function hidePopup() {
  popup.classList.add("hidden");
}

// Close popup when clicking the close button
closePopup.addEventListener("click", () => {
  hidePopup();

  clearBookmarker();
});

document.getElementById("submitInfo").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission

  const isNameValid = validationInputs(bookmarkNameInput); // Validate the site name
  const isUrlValid = validationInputs(bookmarkUrlInput); // Validate the URL

  // Only show the popup if any input is invalid
  if (!isNameValid || !isUrlValid) {
    showPopup(); // Show popup if either the site name or URL is invalid
  } else {
    addBookmarker(); // Proceed with adding the bookmark if both are valid
  }
});
