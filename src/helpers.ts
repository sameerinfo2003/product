import { categories } from "./Context/initialProducts";

export const changeDatesToString = (product: IProduct) => {
   const newProduct = {
      ...product,
      createDate: product.createDate.toString(),
      updateDate: product.updateDate.toString(),
      purchaseDate: product.purchaseDate.toString(),
   };
   return newProduct;
};

export const changeStringsToDate = (product: IProduct) => {
   const newProduct = {
      ...product,
      createDate: new Date(product.createDate),
      updateDate: new Date(product.updateDate),
      purchaseDate: new Date(product.purchaseDate),
   };
   return newProduct;
};

export const getProductsFromData = (data: string) => {
   return data
      .split("\n")
      .slice(1)
      .map((x) => x.match(/\s*(?:"[^"]*"|\([^)]*\)|[^,]+)/g) as string[])
      .map(
         ([
            id,
            name,
            description,
            categoryId,
            createDate,
            updateDate,
            purchaseDate,
         ]) => ({
            id: Number(id),
            name,
            description: description.replaceAll('"', ""),
            category: categories.find(
               (x) => x.id === Number(categoryId)
            ) as ICategory,
            createDate: new Date(createDate),
            purchaseDate: new Date(purchaseDate),
            updateDate: new Date(updateDate),
         })
      );
};
