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


// const renderDataInTheTable = (data, element) => {
//   data.forEach((item) => {
//     let newRow = document.createElement("tr");
//     Object.values(item).forEach((value, index) => {
//       let cell = document.createElement("td");
//       cell.innerText = value;
//       newRow.appendChild(cell);
//       if (Object.values(item).length == index + 1) {
//         let editbutton = `<button class="btn edit-order-btn" data-id="${item.id}">
//             Edit</i>
//           </button>`;
//         let celledit = document.createElement("td");
//         celledit.innerHTML = editbutton;
//         newRow.appendChild(celledit);
//       }
//     });
//     element.appendChild(newRow);
//   });
// };

export { getElement, formatPrice , openModal, closeModal};
