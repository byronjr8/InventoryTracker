import { createInventory , updateInventory} from "../services/inventoryService.js";
import { getElement, closeModal } from "../utils.js";
const createInventoryForm= getElement('#add-inventory-form');
const closeAddInventoryBtn= getElement('.add-inventory-modal .close');


const editInventoryForm = getElement("#edit-inventory-form");
const closeEditModalBtn = getElement(".edit-inventory-modal .close");


const setupAddInventoryModal = (products, locations, element) => {
    console.log(products)
    let modal = `
              <h3 class="title">Create Inventory</h3>
              <div class="form-field">
                  <label for="productId">Product</label>
                  <select name="productId" id="productId" required>
                      <option value="">--SELECT--</option>
                      ${products.map((product)=> '<option value="'+product.id+'">'+ product.name+ '</option>' )}
                  </select>
              </div>
              <div class="form-field">
                  <label for="quantity">Quantity</label>
                  <input type="number" id="quantity" required>
              </div>  
              <div class="form-field">
              <label for="locationId">Location</label>
              <select name="locationId" id="locationId" required>
                  <option value="">--SELECT--</option>
                  ${locations.map((location)=> '<option value="'+location.id+'">'+ location.name+ '</option>' )}
              </select>
          </div>           
              <div class="modal-footer">
                  <button class="btn add-product-btn" type="submit">Add</button>
              </div>`;
  
      element.innerHTML = modal;
  
      createInventoryForm.addEventListener('submit', (e)=>{
          e.preventDefault()
          createInventoryFunc();
      })
      closeAddInventoryBtn.addEventListener('click', ()=>{
          closeModal(getElement('.modal.add-inventory-modal'))
      })
      
  };
  
  async function createInventoryFunc(){
    let formdata={
      productId: getElement('#productId').value,
      quantity: getElement('#quantity').value,
      locationId: getElement('#locationId').value,
    }
    let newInventory= await createInventory(formdata);
    if(newInventory.id){
        alert("Inventory Added Successfully");
        location.reload();
    }else{
        alert(newInventory.error);
    }
  }
  const setupEditInventoryModal = (inventory, element) => {
    let modal = `
              <h3 class="title">Edit Inventory</h3>
              <div class="form-field">
                  <label for="name">Name</label>
                  <input type="text" id="name" value=${inventory.productName} required disabled>
              </div>
              <div class="form-field">
              <label for="location">Location</label>
              <input type="text" id="location" value=${inventory.locationName} required disabled>
          </div>
              <div class="form-field">
                  <label for="quantity">Quantity</label>
                <input type="text" id="quantity" value=${inventory.quantity} required>
              </div> 
              <div class="modal-footer">
                  <button class="btn add-inventory-btn" type="submit">Edit</button>
              </div>`;
  
    element.innerHTML = modal;
  
    editInventoryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      editInventory(inventory.id);
    });
    closeEditModalBtn.addEventListener("click", () => {
      closeModal(getElement(".modal.edit-inventory-modal"));
    });
  };
  
  async function editInventory(inventoryId) {
      let formdata = {
        quantity: getElement("#quantity").value
      };
      let newInventory = await updateInventory(inventoryId, formdata);
      if (newInventory.message) {
        alert(newInventory.message);
        location.reload();
      } else {
        alert(newInventory.error);
      }
    }
    
  export{
    setupAddInventoryModal,
    setupEditInventoryModal
  }