import { closeModal, getElement } from "../utils.js";
import { createProduct, updateProduct } from "../services/productsService.js";
const addProductForm = getElement("#add-product-form");
const closeBtn = getElement(".add-product-modal .close");

const editProductForm = getElement("#edit-product-form");
const closeEditModalBtn = getElement(".edit-product-modal .close");
const setupAddProductModal = (element) => {
  let modal = `
            <h3 class="title">Add Product</h3>
            <div class="form-field">
                <label for="">Name</label>
                <input type="text" id="name" required>
            </div>    
            <div class="form-field">
                <label for="">Description</label>
                <input type="text" id="description" required>
            </div>       
            <div class="form-field">
                <label for="">Price</label>
                <input type="number" id="price" required>
            </div>
            <div class="form-field">
                <label for="">Category</label>
                <input type="text" id="category" required>
            </div>
            <div class="modal-footer">
                <button class="btn add-product-btn" type="submit">Add</button>
            </div>`;
  element.innerHTML = modal;

  addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addProduct();
  });
  closeBtn.addEventListener("click", () => {
    closeModal(getElement(".modal.add-product-modal"));
  });
};

async function addProduct() {
  let formdata = {
    name: getElement("#name").value,
    description: getElement("#description").value,
    price: getElement("#price").value,
    category: getElement("#category").value,
  };
  let newProduct = await createProduct(formdata);
  if (newProduct.id) {
    alert("Product Created Successfully");
    location.reload();
  } else {
    alert(newProduct.error);
  }
}

const setupEditProductModal = (product, element) => {
  let modal = `
            <h3 class="title">Edit Product</h3>
            <div class="form-field">
                <label for="">Name</label>
                <input type="text" id="name" value=${product.name} required>
            </div>
            <div class="form-field">
                <label for="">Description</label>
                <input type="text" id="description" value=${product.description} required>
            </div>       
            <div class="form-field">
                <label for="">Price</label>
                <input type="number" id="price" value=${product.price} required>
            </div>
            <div class="form-field">
                <label for="">Category</label>
                <input type="text" id="category" value=${product.category} required>
            </div>
            <div class="modal-footer">
                <button class="btn add-product-btn" type="submit">Edit</button>
            </div>`;

  element.innerHTML = modal;

  editProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    editProduct(product.id);
  });
  closeEditModalBtn.addEventListener("click", () => {
    closeModal(getElement(".modal.edit-product-modal"));
  });
};

async function editProduct(productId) {
    let formdata = {
      name: getElement("#name").value,
      description: getElement("#description").value,
      price: getElement("#price").value,
      category: getElement("#category").value,
    };
    let newProduct = await updateProduct(productId, formdata);
    if (newProduct.message) {
      alert(newProduct.message);
      location.reload();
    } else {
      alert(newProduct.error);
    }
  }
  
export { setupEditProductModal, setupAddProductModal };
