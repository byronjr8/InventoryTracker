import { Selector } from "testcafe";
import { appBaseUrl } from "./test.enviroment.variables";

fixture("Inventory").page(`${appBaseUrl}app/index.html`);

test("inventory test", async (t) => {
  await t.click(Selector("nav").find("a").withText("Inventory"));
  // // test add/create feature
  await t.expect(Selector(".add-inventory-modal-btn").exists).ok();
  await t.click(".add-inventory-modal-btn");
  await t.expect(Selector(".add-inventory-modal.show").exists).ok();
  await t
    .click("#productId")
    .click(Selector("option").withAttribute("value", "1"));
  await t.typeText("#quantity", "20");
  await t.typeText("#locationId", "2");
  await t.click(".add-inventory-modal .close");
  // // test edit feature
  await t.click(
    Selector("table").find("tr").nth(1).find("button").withText("EDIT")
  );
  await t.expect(Selector(".edit-inventory-modal.show").exists).ok();
  await t.typeText("#quantity", "50", { replace: true });
  await t.click(".edit-inventory-modal .close");
  // // Click on the remove button of the first inventory record
  await t.click(
    Selector("table").find("tr").nth(1).find("button").withText("REMOVE")
  );
  await t
    .expect(Selector(".custom-alert-modal").innerText)
    .contains("deleted successfully");
  await t.click(Selector(".custom-alert-modal button").withText("Close"));
});

fixture("Product").page(`${appBaseUrl}app/products.html`);

test("Product page test", async (t) => {
  await t.click(Selector("nav").find("a").withText("Products"));
  // // test add/create feature
  await t.expect(Selector(".add-product-modal-btn").exists).ok();
  await t.click(".add-product-modal-btn");
  await t.expect(Selector(".add-product-modal.show").exists).ok();
  await t.typeText("#name", "test product");
  await t.typeText("#description", "item for test");
  await t.typeText("#price", "200");
  await t.typeText("#category", "test");
  await t.click(".add-product-btn");
  await t
    .expect(Selector(".custom-alert-modal").innerText)
    .contains("Product Created Successfully");
  await t.click(Selector(".custom-alert-modal button").withText("Close"));
  // await t.click('.add-product-modal .close');
  // // test edit feature
  await t.click(
    Selector("table").find("tr").nth(1).find("button").withText("EDIT")
  );
  await t.expect(Selector(".edit-product-modal.show").exists).ok();
  await t.typeText("#name", "test product edit", { replace: true });
  await t.typeText("#description", "item for test edit", { replace: true });
  await t.typeText("#price", "201", { replace: true });
  await t.typeText("#category", "test eddit", { replace: true });
  await t.click(Selector(".edit-product-modal button").withText("EDIT"));
  await t
    .expect(Selector(".custom-alert-modal").innerText)
    .contains("updated successfully");
  await t.click(Selector(".custom-alert-modal button").withText("Close"));
});

fixture("Location").page(`${appBaseUrl}app/location.html`);

test("Location page test", async (t) => {
  await t.click(Selector("nav").find("a").withText("Locations"));
  // // test add/create feature
  await t.expect(Selector(".add-location-modal-btn").exists).ok();
  await t.click(".add-location-modal-btn");
  // await t.expect(Selector('.add-location-modal.show').exists).ok();
  await t.typeText("#name", "test location");
  await t.typeText("#description", "item for test");
  await t.click(".add-location-btn");
  await t
    .expect(Selector(".custom-alert-modal").innerText)
    .contains("Location Created Successfully");
  await t.click(Selector(".custom-alert-modal button").withText("Close"));

  //  // // test edit feature
  await t.click(
    Selector("table").find("tr").nth(1).find("button").withText("EDIT")
  );
  await t.expect(Selector(".edit-location-modal.show").exists).ok();
  await t.typeText("#name", "test location edit", { replace: true });
  await t.typeText("#description", "location test edit", { replace: true });

  await t.click(Selector(".edit-location-modal button").withText("EDIT"));
  await t
    .expect(Selector(".custom-alert-modal").innerText)
    .contains("updated successfully");
  await t.click(Selector(".custom-alert-modal button").withText("Close"));
});
