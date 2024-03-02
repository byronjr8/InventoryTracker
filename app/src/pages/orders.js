import { deleteOrder, fetchOrders, updateOrder } from "../services/ordersService.js";
import { getElement, openModal } from "../utils.js";
import {setupAddOrderModal} from "../setups/orderSetup.js"
const createOrderModalBtn = getElement(".create-order-modal-btn");
const init = async () => {
  const loading = getElement(".page-loading");
  let orders = await fetchOrders();
  // orders=[
  //   {
  //     name:"Apple Watch",
  //     quantity:"100",
  //     status:"Arrived",
  //     price:"$4,232.00",
  //     date:"7/12/2001",
  //   },
  //   {
  //     name:"Apple Watch",
  //     quantity:"100",
  //     status:"Arrived",
  //     price:"$4,232.00",
  //     date:"7/12/2001",
  //   },
  //   {
  //     name:"Apple Watch",
  //     quantity:"100",
  //     status:"Arrived",
  //     price:"$4,232.00",
  //     date:"7/12/2001",
  //   }
  // ]
  console.log(orders);
  if (orders) {
    displayOrders(orders, getElement(".orders table tbody"));
  } else {
    //displayOrders([], getElement('.orders'));
  }
  createOrderModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    setupAddOrderModal(getElement('.modal.create-order-modal .modal-center'))
    openModal(getElement(".modal.create-order-modal"));
  });

  loading.style.display = "none";
};

const displayOrders = (orders, element, filters) => {
  console.log("displaying..");
  renderOrderDataInTheTable(orders, element);

    element.addEventListener("click", function (e) {
      const target = e.target;
      if (target.classList.contains("remove-order-btn")) {
        console.log(target.dataset.id, "delete")
        deleteOrder(target.dataset.id);
      }
    });
};

const renderOrderDataInTheTable = (data, element) => {
  element.innerHTML=""
  data.forEach((item) => {
    let newRow = document.createElement("tr");
    Object.values(item).forEach((value, index) => {
      let cell = document.createElement("td");
      cell.innerText = value;
      newRow.appendChild(cell);
      if (Object.values(item).length == index + 1) {
        let editbutton = `<button class="btn remove-order-btn" data-id="${item.id}">
            Remove</i>
          </button>`;
        let celledit = document.createElement("td");
        celledit.innerHTML = editbutton;
        newRow.appendChild(celledit);

      }
    });
    element.appendChild(newRow);
  });
};

window.addEventListener("DOMContentLoaded", init);
