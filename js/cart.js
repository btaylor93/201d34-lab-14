'use strict';

var Cart = [];

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  Cart = JSON.parse(localStorage.getItem('cart')) || [];
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  console.log(table.firstChild.nextSibling.nextSibling.nextSibling);
  var tbody = table.firstChild.nextSibling.nextSibling.nextSibling;
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var tbody = table.firstChild.nextSibling.nextSibling.nextSibling;
  // TODO: Iterate over the items in the cart
  for (var i of Cart) {
    // TODO: Create a TR
    var newRow = document.createElement('tr');
    // TODO: Create a TD for the delete link, quantity,  and the item
    var deleteLink = document.createElement('td');
    deleteLink.textContent = 'X';
    var quantityCell = document.createElement('td');
    quantityCell.textContent = i.quantity;
    var itemCell = document.createElement('td');
    itemCell.textContent = i.item.name;
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    newRow.appendChild(deleteLink);
    newRow.appendChild(quantityCell);
    newRow.appendChild(itemCell);
    tbody.appendChild(newRow);
  }
}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, rebuild the Cart array without that item
  var clickedCell = event.target;
  if (clickedCell.parentNode.parentNode.tagName === 'THEAD') {
    return;
  }
  if (clickedCell.previousSibling !== null) {
    return;
  }
  console.log(clickedCell.parentNode.lastChild.textContent);
  var removedItem = clickedCell.parentNode.lastChild.textContent;
  for (var i in Cart) {
    if (Cart[i].item.name === removedItem) {

      Cart.splice(i, 1);
    }
  }
  // TODO: Save the cart back to local storage
  localStorage.setItem('cart', JSON.stringify(Cart));
  // TODO: Re-draw the cart table
  clearCart();
  showCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
