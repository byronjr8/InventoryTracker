import { closeModal, getElement } from "../utils.js";
import {createProduct} from "../services/productsService.js"
import {fetchManufacturers} from "../services/manufactureService.js"
const addProductForm= getElement('#add-product-form');
const closeBtn= getElement('.add-product-modal .close')

const editProductForm= getElement('#edit-product-form');
const closeEditModalBtn= getElement('.edit-product-modal .close')
const setupAddProductModal = ( element) => {
  let modal = `
            <h3 class="title">Add Product</h3>
            <div class="form-field">
                <label for="">Name</label>
                <input type="text" id="name" required>
            </div>
            <div class="form-field">
                <label for="type">Category/Type</label>
                <select name="type" id="type" required>
                    <option value="Accessories">Accessories</option>
                    <option value="Desktop-PC">Desktop-PC</option>
                    <option value="Head Phones">Head Phones</option>
                    <option value="Keyboard">Keyboard</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Mouse">Mouse</option>
                    <option value="Smart Phone">Smart Phone</option>
                    <option value="Tablet">Tablet</option>
                </select>
            </div>
            <div class="form-field">
                <label for="">Manufacturer</label>
                <select name="" id="manufacturer" >
                    <option value="">---select----</option>
                    ${manufacturerOptions()}
                </select>
            </div>
          
            <div class="form-field">
                <label for="">Price</label>
                <input type="number" id="price" required>
            </div>
            <div class="form-field">
                <label for="">Quantity</label>
                <input type="number" id="quantity" required>
            </div>
            <div class="modal-footer">
                <button class="btn add-product-btn" type="submit">Add</button>
            </div>`;

    element.innerHTML = modal;

    addProductForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        addProduct();
    })
    closeBtn.addEventListener('click', ()=>{
        closeModal(getElement('.modal.add-product-modal'))
    })
    
};

async function addProduct(){
  let formdata={
    name: getElement('#name').value,
    type: getElement('#type').value,
    manufacturer: getElement('#manufacturer').value,
    price: getElement('#price').value,
    quantity: getElement('#quantity').value,
  }
  console.log(formdata);
  newProduct= await createProduct(formdata)
}

const manufacturerOptions= async ()=>{
    const manufacturers= await fetchManufacturers();
    let optionElement;
    if(manufacturers){
        optionElement= manufacturers.map(manufacturer=>{
            option= document.createElement('option');
            option.value= manufacturer.id
            option.textContent= manufacturer.name
            return option
        }).join('');
    }
    
    return optionElement
    
}
const setupEditProductModal = (prouct, element) => {
    
  let modal = `
            <h3 class="title">Edit Product</h3>
            <div class="form-field">
                <label for="">Name</label>
                <input type="text">
            </div>
            <div class="form-field">
                <label for="">Category/Type</label>
                <select name="" id="">
                    <option value="Status">Status</option>
                </select>
            </div>
            <div class="form-field">
            <label for="status">Status</label>
            <select name="status" id="status">
                <option value="Arrived">Arrived</option>
                <option value="In Production">Status</option>
                <option value="Order Sent">Status</option>
                <option value="Packaging">Packaging</option>
                <option value="Shipping">Shipping</option>
            </select>
        </div>
            <div class="form-field">
                <label for="">Price</label>
                <input type="number">
            </div>
            <div class="form-field">
                <label for="">Quantity</label>
                <input type="number">
            </div>
            <div class="modal-footer">
                <button class="btn add-product-btn" type="submit">Edit</button>
            </div>`;





  element.innerHTML = modal;

  editProductForm.addEventListener('submit', (e)=>{
      e.preventDefault()
      editProduct();
  })
  closeEditModalBtn.addEventListener('click', ()=>{
      closeModal(getElement('.modal.add-product-modal'))
  })
};
const editProduct=()=>{
    console.log("editproduct")
}

export { setupEditProductModal , setupAddProductModal};
