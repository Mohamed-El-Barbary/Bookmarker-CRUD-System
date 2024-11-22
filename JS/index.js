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
  if (validationSiteName() && validationSiteUrl()) {
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


// Function To Validation SiteName
function validationSiteName() {
  var regex =
    /^[a-zA-Z]{3,}([-_][a-zA-Z]{3,})*(\s[a-zA-Z]{3,}([-_][a-zA-Z]{3,})*)?$/;
  var text = bookmarkNameInput.value;

  if (regex.test(text)) {
    bookmarkNameInput.classList.add("valid-input");
    bookmarkNameInput.classList.remove("invalid-input");
    bookmarkNameInput.classList.add("is-valid");
    bookmarkNameInput.classList.remove("is-invalid");
    return true;
    
  } else {
    bookmarkNameInput.classList.add("invalid-input");
    bookmarkNameInput.classList.remove("valid-input");
    bookmarkNameInput.classList.add("is-invalid");
    bookmarkNameInput.classList.remove("is-valid");
    return false;
  }
}

// Function To Validation SiteUrl
function validationSiteUrl() {
  var regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  var text = bookmarkUrlInput.value;

  if (regex.test(text)) {
    bookmarkUrlInput.classList.add("valid-input");
    bookmarkUrlInput.classList.remove("invalid-input");
    bookmarkUrlInput.classList.add("is-valid");
    bookmarkUrlInput.classList.remove("is-invalid");
    return true;

  } else {
    bookmarkUrlInput.classList.add("invalid-input");
    bookmarkUrlInput.classList.remove("valid-input");
    bookmarkUrlInput.classList.add("is-invalid");
    bookmarkUrlInput.classList.remove("is-valid");
    return false;
  }
}

//^ Popup Validation

var popup = document.getElementById("validationPopup");
var closePopup = document.getElementById("closePopup"); // Input field for URL validation

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
});

// Add event listener to the Submit button For validationSiteName
document.getElementById("submitInfo").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission

  const isNameValid = validationSiteName(); // Validate the site name

  if (!isNameValid) {
    showPopup(); // Show popup if the site name is invalid
  }
});

// Add event listener to the submit button For validationSiteUrl
document.getElementById("submitInfo").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission

  const isUrlValid = validationSiteUrl(); // Validate the site name

  if (!isUrlValid) {
    showPopup(); // Show popup if the site name is invalid
  }
});
