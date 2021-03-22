import styled from "styled-components";
import Button from "../Button";

import { useHistory } from "react-router-dom";
import { deleteProduct } from "../../Firebase/helpers";

const ProductCardWrapper = styled.div`
   background: white;
   box-shadow: 2px 2px 5px #d6d6d6;
   position: relative;
   display: flex;
   flex-direction: column;
   border: 1px solid #d3d3d373;
`;

const ProductName = styled.div`
   font-size: 25px;
   color: #181818;
   font-weight: 600;
   text-align: center;
   margin-bottom: 15px;
`;

const ProductDescription = styled.div`
   font-size: 14px;
   color: #363636;
   text-align: center;
`;

const ProductDateContainer = styled.div`
   display: flex;
   flex-direction: column;
   padding: 10px;
   justify-content: center;
   align-items: center;
   background-color: whitesmoke;
`;

const ProductCardHeader = styled.div`
   display: flex;
   padding: 15px;
   align-items: center;
   flex-direction: column;
`;
const Date = styled.div`
   font-size: 12px;
   color: #555555;
`;

const CardFooter = styled.div`
   display: flex;
   flex-direction: column;
   height: 100%;
   justify-content: flex-end;
`;

const ButtonContainer = styled.div`
   display: flex;
   width: 100%;
   margin-top: 20px;
   /* position: absolute; */
   /* bottom: 0px; */
`;

const ProductCategory = styled.div`
   margin-bottom: 10px;
   font-size: 17px;
   color: #2c2c2c;
`;

const ProductCard: React.FC<IProduct> = ({
   category,
   createDate,
   description,
   id,
   name,
   purchaseDate,
   updateDate,
}) => {
   const history = useHistory();
   const onUpdateButtonClick = () => {
      history.push(`/update/${id}`);
   };

   const onDeleteButtonClick = () => {
      deleteProduct(id);
   };
   return (
      <ProductCardWrapper>
         <ProductCardHeader>
            <ProductName>{name}</ProductName>
            <ProductCategory>{category.name}</ProductCategory>
            <ProductDescription>{description}</ProductDescription>
         </ProductCardHeader>
         <CardFooter>
            <ProductDateContainer>
               <Date>
                  <b>Created at: </b>
                  {createDate.toDateString()}
               </Date>
               <Date>
                  <b>Updated at: </b>
                  {updateDate.toDateString()}
               </Date>
               <Date>
                  <b>Purchased at: </b>
                  {purchaseDate.toDateString()}
               </Date>
            </ProductDateContainer>
            <ButtonContainer>
               <Button onClick={onUpdateButtonClick}>Update</Button>
               <Button color="#d90000" onClick={onDeleteButtonClick}>
                  Delete
               </Button>
            </ButtonContainer>
         </CardFooter>
      </ProductCardWrapper>
   );
};

export default ProductCard;
