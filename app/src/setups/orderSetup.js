import { getElement, closeModal } from "../utils.js";
const createOrderForm= getElement('#create-order-form');
const closeAddOrderBtn= getElement('.create-order-modal .close');


const setupAddOrderModal = ( element, product) => {
    let modal = `
              <h3 class="title">Create Order</h3>
              <div class="form-field">
                  <label for="productId">Product ID</label>
                  <select name="productId" id="productId" required>
                      <option value="">--SELECT--</option>
                  </select>
              </div>
              <div class="form-field">
                  <label for="quantity">Quantity</label>
                  <input type="number" id="quantity" required>
              </div>              
              <div class="modal-footer">
                  <button class="btn add-product-btn" type="submit">Add</button>
              </div>`;
  
      element.innerHTML = modal;
  
      createOrderForm.addEventListener('submit', (e)=>{
          e.preventDefault()
          createOrderFunc();
      })
      closeAddOrderBtn.addEventListener('click', ()=>{
          closeModal(getElement('.modal.create-order-modal'))
      })
      
  };
  
  async function createOrderFunc(){
    let formdata={
      name: getElement('#productId').value,
      quantity: getElement('#quantity').value,
    }
    console.log(formdata);
    newProduct= await createOrder(formdata);
  }

  export{
    setupAddOrderModal
  }