/**
 * @file scripts/index.js - Handles the new employee form and employees list.
 * @author Chet Gray <chet.gray@waystar.com>
 */

const form = document.getElementById("employeeForm");
const messageBlock = document.getElementById("messageBlock");
const list = document.getElementById("employeesList");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (formIsComplete(form)) {
    const empName = form.elements["empName"].value;
    const empId = form.elements["empId"].value;
    const empDateOfBirth = form.elements["empDateOfBirth"].value;
    const empDepartment = form.elements["empDepartment"].value;
    const empManager = form.elements["empManager"].value;

    setMessage(
      `New Employee Information for ${empName}, ID ${empId} accepted.`,
      "success"
    );
    form.reset();
    const newEmpLi = document.createElement("li");
    newEmpLi.innerText = `${empName} (${empId}), DOB: ${empDateOfBirth}, Dep: ${empDepartment}, Mgr: ${empManager}`;
    list.appendChild(newEmpLi);
  } else {
    setMessage("Please fill out all fields.", "error");
  }
});

/**
 * Returns true if all the specified form fields are not-empty, and false otherwise. If
 * fields are not specified, all fields are checked.
 *
 * @param {HTMLFormElement} form - The form element.
 * @param {?string[]} [fieldNames] - Names of fields to check. If `undefined` or `null`,
 * all fields will be checked.
 * @returns {boolean} True if all the checked fields are not-empty, and false otherwise.
 */
function formIsComplete(form, fieldNames) {
  if (fieldNames === undefined || fieldNames === null) {
    // `HTMLFormControlsCollection` is an array-like object, so we can call the
    // `Array.prototype.every()` method with it.
    // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every#calling_every_on_non-array_objects)
    // I would prefer to shallow-copy it into an array with `Array.from()`, but that is
    // not supported in IE. (https://caniuse.com/mdn-javascript_builtins_array_from)
    const isComplete = Array.prototype.every.call(
      form.elements,
      (field) => field.value !== ""
    );
    return isComplete;
  } else {
    const isComplete = fieldNames.every(
      (fieldName) => form.elements[fieldName].value !== ""
    );
    return isComplete;
  }
}

/**
 * Sets the message block to display a message, and clears it after a timeout.
 *
 * @param {string} message - The message to display.
 * @param {string} [type="info"] - The type of message. (Default: "info")
 * @param {number} [timeout=3000] - The number of milliseconds to display the message. (Default: 3000)
 */
function setMessage(message, type = "info", timeout = 3000) {
  console.debug(`setting ${type} message`);
  messageBlock.innerText = message;
  messageBlock.classList.add("message--" + type);
  messageBlock.hidden = false;
  const timeoutId = setTimeout(function () {
    console.debug(`timeout ${timeoutId} fired, clearing ${type} message`);
    messageBlock.hidden = true;
    messageBlock.innerText = "";
    messageBlock.classList.remove("message--" + type);
  }, timeout);
  console.debug(`timeout ${timeoutId} set for ${type} message`);
}
