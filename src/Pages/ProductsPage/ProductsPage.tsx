import styled from "styled-components";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useStateContext } from "../../Context/useStateContext";
import Pagination from "./Pagination";
import ProductsPageHeader from "./ProductsPageHeader";

const ProductsPageWrapper = styled.div`
   padding: 20px;
`;
const ProductsList = styled.div`
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-gap: 20px;
`;

const ProductsPage: React.FC = () => {
   const [
      { cardsPerPage, products, pageNo, sortType },
      dispatch,
   ] = useStateContext();

   let sortedProducts = [...products];
   if (sortType === "createDate") {
      sortedProducts.sort(
         (a, b) => b.createDate.getTime() - a.createDate.getTime()
      );
   }
   if (sortType === "category") {
      sortedProducts.sort((a, b) => a.category.id - b.category.id);
   }
   if (sortType === "id") {
      sortedProducts.sort((a, b) => a.id - b.id);
   }
   if (sortType === "name") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
   }
   return (
      <ProductsPageWrapper>
         <ProductsPageHeader></ProductsPageHeader>
         <Pagination></Pagination>
         <ProductsList>
            {sortedProducts
               .slice(
                  pageNo * cardsPerPage,
                  pageNo * cardsPerPage + cardsPerPage
               )
               .map((data) => (
                  <ProductCard key={data.id} {...data} />
               ))}
         </ProductsList>
      </ProductsPageWrapper>
   );
};

export default ProductsPage;
