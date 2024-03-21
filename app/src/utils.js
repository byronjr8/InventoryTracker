const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return formattedPrice;
};
const openModal=(element)=>{
  element.classList.add('show');
}
const closeModal=(element)=>{
  element.classList.remove('show');
}


function customAlert(message) {
  // Create a div element for the backdrop
  const backdrop = document.createElement('div');
  backdrop.classList.add('custom-alert-backdrop');
  
  // Create a div element for the modal
  const modal = document.createElement('div');
  modal.classList.add('custom-alert-modal');

  // Create a paragraph element for the message
  const messageParagraph = document.createElement('p');
  messageParagraph.textContent = message;
  
  // Create a close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
      location.reload();
  });
  
  modal.appendChild(messageParagraph);
  modal.appendChild(closeButton);
  document.body.appendChild(modal);
  document.body.appendChild(backdrop);
}

// Example usage:
// customAlert('Inventory added successfully.');

export { getElement, formatPrice , openModal, closeModal, customAlert};
