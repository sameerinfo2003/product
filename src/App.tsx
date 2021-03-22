import React, { useEffect } from "react";
import { StateContextProvider } from "./Context/StateContext";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreatePage from "./Pages/CreatePage/CreatePage";
import { db, productsRef } from "./Firebase/init";
import UpdatePage from "./Pages/UpdatePage/UpdatePage";
import {
   changeDatesToString,
   changeStringsToDate,
   getProductsFromData,
} from "./helpers";
import { useStateContext } from "./Context/useStateContext";
import StatsPage from "./Pages/StatsPage/StatsPage";
import Papa from "papaparse";
// import "./products.csv";
import productsPath from "./data/products.csv";
function App() {
   const [state, dispatch] = useStateContext();
   useEffect(() => {
      async function getData() {
         const response = await fetch(productsPath);
         if (response.body) {
            const reader = response.body.getReader();
            const result = await reader.read(); // raw array
            const decoder = new TextDecoder("utf-8");
            const csv = decoder.decode(result.value); // the csv text
            const rows = getProductsFromData(csv);
            return rows;
         } else {
            return [];
         }
      }
      const products = productsRef.once("value", (snapshot) => {
         if (!snapshot.val()) {
            getData().then((initialProducts) => {
               initialProducts.forEach((x) => {
                  const product = {
                     ...x,
                     createDate: x.createDate.toString(),
                     updateDate: x.updateDate.toString(),
                     purchaseDate: x.purchaseDate.toString(),
                  };
                  productsRef.child(x.id.toString()).set(product);
               });
            });
         }
      });
   }, []);
   useEffect(() => {
      productsRef.on("value", (snapshot) => {
         if (snapshot.val()) {
            const data = Object.values(snapshot.val()) as IProduct[];
            const finalData = Object.values(
               data.map((x) => changeStringsToDate(x))
            );
            finalData.forEach((x) => {
               if (x.purchaseDate.getTime() < x.createDate.getTime()) {
                  console.warn(
                     `Purchase date(${x.purchaseDate.toString()}) can't be less then create date(${x.createDate.toString()})`
                  );
               }
            });
            dispatch({ "set-procucts": Object.values(finalData) });
         }
      });
   }, []);
   return (
      <Router>
         <Switch>
            <Route path="/" exact>
               <ProductsPage></ProductsPage>
            </Route>
            <Route path="/create">
               <CreatePage></CreatePage>
            </Route>
            <Route path="/update/:id">
               <UpdatePage></UpdatePage>
            </Route>
            <Route path="/stats">
               <StatsPage></StatsPage>
            </Route>
         </Switch>
      </Router>
   );
}

export default App;
