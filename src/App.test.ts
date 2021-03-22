import { deleteProduct, setProduct } from "./Firebase/helpers";
import { productsRef } from "./Firebase/init";

describe("Test the firebase apis", () => {
   it("Adds the new product", () => {
      setProduct({
         category: { id: 1, name: "Kitchen" },
         createDate: new Date(),
         description: "",
         id: 55,
         name: "Test item",
         purchaseDate: new Date(),
         updateDate: new Date(),
      }).then(() => {
         productsRef.child("55").once("value", (snapshot) => {
            const newProduct = snapshot.val();
            expect(newProduct.id).toBe(55);
         });
      });
   });
   it("Deletes the product", () => {
      deleteProduct(55).then(() => {
         productsRef.child("55").once("value", (snapshot) => {
            const newProduct = snapshot.val();
            expect(newProduct).toBeNull();
         });
      });
   });
});

export const x = 3;
