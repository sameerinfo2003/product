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
import { useHistory } from "react-router-dom";

export const PageWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;
`;

export const FormWrapper = styled.div`
   display: flex;
   padding: 20px;
   flex-direction: column;
   width: 50%;
   border: 1px solid lightgray;
   box-shadow: 1px 1px 5px lightgray;
`;

export const FormFooter = styled.div`
   display: flex;
   margin-top: 30px;
`;
export const FormHeading = styled.h2`
   text-align: center;
   margin-bottom: 30px;
   font-family: Arial;
   color: rgb(60, 60, 60);
`;

const categoryOptions: {
   label: string;
   value: string;
}[] = categories.map((x) => ({ label: x.name, value: x.name }));

const CreatePage: React.FC = () => {
   const [state] = useStateContext();
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [category, setCategory] = useState(categoryOptions[0].value);
   const history = useHistory();
   const onSaveButtonClick = () => {
      const newProduct: IProduct = {
         category: categories.find((x) => x.name === category) as ICategory,
         description,
         name,
         id: Math.max(...state.products.map((x) => x.id)) + 1,
         createDate: new Date(),
         updateDate: new Date(),
         purchaseDate: new Date(),
      };

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
            <SelectContainer>
               <SelectLabel>Category:</SelectLabel>
               <SelectWrapper>
                  <Select
                     options={categoryOptions}
                     value={categoryOptions.find((x) => x.value === category)}
                     onChange={(val) => setCategory(val!.value)}
                  ></Select>
               </SelectWrapper>
            </SelectContainer>
            <FormFooter>
               <Button onClick={onSaveButtonClick}>Save</Button>
            </FormFooter>
         </FormWrapper>
      </PageWrapper>
   );
};

export default CreatePage;
