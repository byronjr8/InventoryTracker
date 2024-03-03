import { createOrder } from "../services/ordersService.js";
import { getElement, closeModal } from "../utils.js";
const createOrderForm= getElement('#create-order-form');
const closeAddOrderBtn= getElement('.create-order-modal .close');


const setupAddOrderModal = ( element, products) => {
    console.log(products)
    let modal = `
              <h3 class="title">Create Order</h3>
              <div class="form-field">
                  <label for="productId">Product ID</label>
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
              <label for="status">Product ID</label>
              <select name="status" id="status" required>
                  <option value="Pending">Pending</option>
                  <option value="Arrived">Arrived</option>
                  <option value="In Production">In Prodcution</option>
                  <option value="Order Sent">-Order Sent</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Shipping">Shipping</option>
              </select>
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
      productId: getElement('#productId').value,
      quantity: getElement('#quantity').value,
      status: getElement('#status').value,
    }
    let newProduct= await createOrder(formdata);
    if(newProduct.message){
        alert(newProduct.message);
        location.reload();
    }else{
        alert(newProduct.error);
    }
  }

  export{
    setupAddOrderModal
  }