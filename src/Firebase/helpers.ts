import { changeDatesToString } from "../helpers";
import { productsRef } from "./init";

export const setProduct = async (product: IProduct) => {
   const finalProduct = changeDatesToString(product);
   productsRef.child(product.id.toString()).set(finalProduct);
};

export const deleteProduct = async (productId: number) => {
   productsRef.child(productId.toString()).remove();
};
