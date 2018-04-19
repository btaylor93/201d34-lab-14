/* global Product, Cart */

'use strict';

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var newOption = document.createElement('option');
    var optionValue = Product.allProducts[i].name;
    newOption.value = optionValue;
    newOption.textContent = optionValue;
    selectElement.appendChild(newOption);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  saveCartToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  var selectElement = document.getElementById('items');
  var selectValue = selectElement.value;
  for (var i of Product.allProducts) {
    if (selectValue === i.name) {
      var selectedItem = i;
    }
  }
  // TODO: get the quantity
  var inputElement = document.getElementById('quantity');
  var inputValue = parseInt(inputElement.value);
  if (isNaN(inputValue)){
    return;
  }
  // TODO: using those, create a new Cart item instance
  for (i of Cart.allItems){
    if (selectValue === i.item.name){
      i.quantity += inputValue;
      return;
    }
  }
  new Cart(selectedItem, inputValue);
}

// TODO: Save the contents of the cart to Local Storage
function saveCartToLocalStorage() {
  localStorage.setItem('cart',JSON.stringify(Cart.allItems));
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var spanElement = document.getElementById('itemCount');
  var totalItems = 0;
  for (var i of Cart.allItems) {
    totalItems += i.quantity;
  }
  spanElement.textContent = ' ' + totalItems + ' Items in cart.';
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {

  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  var cartContentDiv = document.getElementById('cartContents');
  while (cartContentDiv.hasChildNodes()){
    cartContentDiv.removeChild(cartContentDiv.firstChild);
  }
  for (var i of Cart.allItems) {
    var newElement = document.createElement('p');
    newElement.textContent = i.quantity + ' ' + i.item.name + '(s)';
    cartContentDiv.appendChild(newElement);
  }
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
