import { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { categories } from "../../Context/initialProducts";
import { StateContextProvider } from "../../Context/StateContext";
import { useStateContext } from "../../Context/useStateContext";
import { setProduct } from "../../Firebase/helpers";
import { productsRef } from "../../Firebase/init";
import { changeDatesToString } from "../../helpers";
import {
   SelectContainer,
   SelectLabel,
   SelectWrapper,
} from "../ProductsPage/ProductsPageHeader";
import { useHistory, useParams } from "react-router-dom";
import {
   FormFooter,
   FormHeading,
   FormWrapper,
   PageWrapper,
} from "../CreatePage/CreatePage";

const categoryOptions: {
   label: string;
   value: string;
}[] = categories.map((x) => ({ label: x.name, value: x.name }));

const UpdatePage: React.FC = () => {
   const [state] = useStateContext();
   const params = useParams<{ id: string }>();
   const history = useHistory();
   const id = Number(params.id);
   const product = state.products.filter((x) => x.id === id)[0];
   const [description, setDescription] = useState(product.description);
   const [name, setName] = useState(product.name);
   const onSaveButtonClick = () => {
      const newProduct: IProduct = {
         ...product,
         updateDate: new Date(),
         name,
         description,
      };
      console.log(newProduct);
      setProduct(newProduct);
      history.push("/");
   };
   return (
      <PageWrapper>
         <FormWrapper>
            <FormHeading>Add new product</FormHeading>
            <Input
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder="Enter the name of product"
            ></Input>
            <Input
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               placeholder="Enter the description"
            ></Input>
            <FormFooter>
               <Button onClick={onSaveButtonClick}>Save</Button>
            </FormFooter>
         </FormWrapper>
      </PageWrapper>
   );
};

export default UpdatePage;
