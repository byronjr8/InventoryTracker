import { fetchInventorys , fetchInventory, deleteInventory} from "../services/inventoryService.js";
import { fetchLocations } from "../services/locationService.js";
import { fetchProducts } from "../services/productsService.js";
import { setupAddInventoryModal, setupEditInventoryModal } from "../setups/inventorySetup.js";
import { getElement, openModal, customAlert } from "../utils.js";

const addInventoryModalBtn = getElement(".add-inventory-modal-btn");

const init = async () => {
  const loading = getElement(".page-loading");
  const Inventory= await fetchInventorys();
  console.log(Inventory)
  if(Inventory) {
     await displayInventorys(Inventory, getElement('.inventory.table table tbody'));
  }
  await addInventoryModalBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("button click");
    const products = await fetchProducts();
    const locations = await fetchLocations();
    setupAddInventoryModal(products, locations, getElement('.modal.add-inventory-modal .modal-center'));
    openModal(getElement(".modal.add-inventory-modal"));
  });
  loading.style.display = "none";
};

const displayInventorys = async (Inventorys, element) => {
  renderInventoryDataInTheTable(Inventorys, element);
  await element.addEventListener("click", async function (e) {
    const parent = e.target;
    if (parent.classList.contains("edit-inventory-btn")) {
      //get a single inventory , populate
      let inventory= await fetchInventory(parent.dataset.id);
      
      setupEditInventoryModal(inventory, getElement('.modal.edit-inventory-modal .modal-center'));
      openModal(getElement(".modal.edit-inventory-modal"));
    }
    else if (parent.classList.contains("remove-inventory-btn")) {
      //get a single inventory , populate
      let isDeleted= await deleteInventory(parent.dataset.id);
      if (isDeleted.message) {
        customAlert(isDeleted.message);
      } else {
        customAlert(isDeleted.error);
      }
    }
  });
};


const renderInventoryDataInTheTable = (data, element) => {
  data.forEach((item, index) => {
    let newRow = document.createElement("tr");
    let s_noCell = document.createElement("td");
    s_noCell.innerText = index +1;
    newRow.appendChild(s_noCell);

    let productName = document.createElement("td");
    productName.innerText = item.productName;
    newRow.appendChild(productName);

    let quantity = document.createElement("td");
    quantity.innerText = item.quantity
    newRow.appendChild(quantity);

    //Name 	Quatity 	Restock 	Unit Price 	Total Price 	Location 	Date Updated 	Action

    let priceCell = document.createElement("td");
    priceCell.innerText = item.quantity> 10 ? "In Stock" : "Restock";
    newRow.appendChild(priceCell);

    let unitPrice = document.createElement("td");
    unitPrice.innerText = item.unitPrice
    newRow.appendChild(unitPrice);

    let totalPrice = document.createElement("td");
    totalPrice.innerText = item.totalPrice
    newRow.appendChild(totalPrice);

    let locationName = document.createElement("td");
    locationName.innerText = item.locationName
    newRow.appendChild(locationName);


    let lastUpdated = document.createElement("td");
    lastUpdated.innerText = item.lastUpdated
    newRow.appendChild(lastUpdated);


    let actionButtons = `<button class="btn primary-bg edit-inventory-btn" data-id="${item.id}">
    Edit</i>
  </button> <button class="btn remove-inventory-btn danger-bg" data-id="${item.id}">
  Remove</i>
</button>`;

    let actionCell = document.createElement("td");
    actionCell.innerHTML = actionButtons;


    newRow.appendChild(actionCell);


    element.appendChild(newRow); 
  });
};

window.addEventListener("DOMContentLoaded", init);
