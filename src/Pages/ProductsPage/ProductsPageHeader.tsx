import styled from "styled-components";
import Select, { OptionTypeBase } from "react-select";
import { StateContextProvider } from "../../Context/StateContext";
import { useStateContext } from "../../Context/useStateContext";
import { useHistory } from "react-router-dom";
import Button from "../../Components/Button";
const HeaderWrapper = styled.div`
   display: flex;
   /* justify-content: flex-end; */
   align-items: center;
   width: 100%;
`;

export const SelectWrapper = styled.div`
   min-width: 200px;
   vertical-align: text-bottom;
`;

export const SelectContainer = styled.div`
   padding: 10px;
   display: flex;
   align-items: center;
`;

export const SelectLabel = styled.div`
   font-size: 15px;
   margin-right: 15px;
   font-weight: bold;
`;

const sortOptions: { label: string; value: SortType }[] = [
   { label: "Created at", value: "createDate" },
   { label: "Name", value: "name" },
   { label: "Category", value: "category" },
   { label: "Id", value: "id" },
];
const prodoctsPerPageOptions: { label: string; value: string }[] = [
   { label: "5", value: "5" },
   { label: "10", value: "10" },
   { label: "20", value: "20" },
];
const ProductsPageHeader: React.FC = () => {
   const [state, dispatch] = useStateContext();
   const history = useHistory();
   return (
      <HeaderWrapper>
         <SelectContainer>
            <SelectLabel>No of products per page: </SelectLabel>
            <SelectWrapper>
               <Select
                  options={prodoctsPerPageOptions}
                  value={prodoctsPerPageOptions.find(
                     (x) => x.value === state.cardsPerPage.toString()
                  )}
                  onChange={(val) =>
                     dispatch({ "set-cards-per-page": Number(val?.value) || 5 })
                  }
               ></Select>
            </SelectWrapper>
         </SelectContainer>
         <SelectContainer>
            <SelectLabel>Sort by: </SelectLabel>
            <SelectWrapper>
               <Select
                  options={sortOptions}
                  value={sortOptions.find(
                     (x) => x.value === state.sortType.toString()
                  )}
                  onChange={(val) =>
                     dispatch({ "sort-by": (val?.value as SortType) || "id" })
                  }
               ></Select>
            </SelectWrapper>
         </SelectContainer>
         <div style={{ marginLeft: "auto", display: "flex" }}>
            <Button
               color="#1fbe1f"
               onClick={() => history.push("/stats")}
               style={{ width: "fit-content", marginRight: 20 }}
            >
               Show Stats
            </Button>
            <Button
               onClick={() => history.push("/create")}
               style={{ width: "fit-content", marginLeft: "auto" }}
            >
               Create new product
            </Button>
         </div>
      </HeaderWrapper>
   );
};

export default ProductsPageHeader;
