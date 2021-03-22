import styled, { css } from "styled-components";
import { useStateContext } from "../../Context/useStateContext";

const PaginationWrapper = styled.div`
   display: flex;
   justify-content: center;
   width: 100%;
   margin: 20px 0px;
`;

const PaginationItem = styled.div<{ active?: boolean }>`
   height: 40px;
   width: 40px;
   display: flex;
   justify-content: center;
   align-items: center;
   border: 1px solid lightgray;
   box-shadow: 1px 1px 5px lightgray;
   margin-right: 10px;
   cursor: pointer;
   transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
   &:hover {
      background-color: #0077ff;
      color: white;
   }
   ${(p) =>
      p.active
         ? css`
              background-color: #0077ff;
              color: white;
           `
         : ""};
`;

const Pagination: React.FC = () => {
   const [state, dispatch] = useStateContext();
   const totalPages = Math.ceil(state.products.length / state.cardsPerPage);
   return (
      <PaginationWrapper>
         {Array(totalPages)
            .fill(0)
            .map((x, i) => (
               <PaginationItem
                  key={i}
                  onClick={() => dispatch({ "set-page-no": i })}
                  active={i === state.pageNo}
               >
                  {i}
               </PaginationItem>
            ))}
      </PaginationWrapper>
   );
};

export default Pagination;
