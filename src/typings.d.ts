interface ICategory {
   id: number;
   name: string;
}

interface IProduct {
   id: number;
   name: string;
   description: string;
   category: ICategory;
   createDate: Date;
   updateDate: Date;
   purchaseDate: Date;
}

type SortType = "createDate" | "name" | "category" | "id";

declare module "canvasjs-react-charts";
declare module "*.csv";
