/**
 * @file scripts/index.js - Handles the new employee form and employees list.
 * @author Chet Gray <chet.gray@waystar.com>
 */

const form = document.getElementById("employeeForm");

form.elements["randomizeBtn"].addEventListener("click", function () {
  form.elements["empName"].value = "John Doe";
  form.elements["empId"].value = "123456789";
  form.elements["empDateOfBirth"].value = "1990-01-01";
  form.elements["empDepartment"].value = "Sales";
  form.elements["empManager"].value = "Jane Smith";
});

/**
 *
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
