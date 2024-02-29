import { fetchManufacturers } from "../services/ManufacturersService";
import { getElement } from "../utils"

const init= async ()=>{
    const loading = getElement('.page-loading');
    const Manufacturers= await fetchManufacturers();
    if(!Manufacturers) return;
    displayManufacturers(Manufacturers, getElement('.Manufacturers'));
    loading.style.display='none';
}
window.addEventListener('DOMContentLoaded', init);