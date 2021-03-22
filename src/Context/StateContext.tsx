import * as React from "react";
import { initialProducts } from "./initialProducts";

export interface IState {
   products: IProduct[];
   sortType: SortType;
   cardsPerPage: number;
   pageNo: number;
}
export const initialState: IState = {
   products: [],
   sortType: "name",
   cardsPerPage: 5,
   pageNo: 1,
};
type ActionType = {
   "set-procucts": IProduct[];
   "sort-by": SortType;
   "set-cards-per-page": number;
   "set-page-no": number;
};

type ActionName = keyof ActionType;

export const functions: {
   [k in ActionName]: (state: IState, data: ActionType[k]) => IState;
} = {
   "set-procucts": (state, products) => ({ ...state, products: [...products] }),
   "sort-by": (state, sortType) => {
      return { ...state, sortType };
   },
   "set-cards-per-page": (state, cardsPerPage) => {
      let pageNo = state.pageNo;
      let totalPages = Math.ceil(state.products.length / cardsPerPage);
      if (pageNo > totalPages - 1) {
         pageNo = totalPages - 1;
      }
      return { ...state, pageNo, cardsPerPage };
   },
   "set-page-no": (state, pageNo) => ({ ...state, pageNo }),
};

const reducer = (state: IState, data: Partial<ActionType>): IState => {
   let tempState: IState = state;
   for (let key in data) {
      key = key as ActionName;
      const func = functions[key as ActionName];
      const dataToPass = (data as any)[key];
      tempState = func(tempState, dataToPass as never);
   }
   return tempState;
};

type IStateContext = [IState, React.Dispatch<Partial<ActionType>>];
const initialContext: IStateContext = [initialState, () => {}];
export const StateContext = React.createContext(initialContext);
export const StateContextProvider: React.FC = ({ children }) => {
   const [state, dispatch] = React.useReducer(reducer, initialState);
   return (
      <StateContext.Provider value={[state, dispatch]}>
         {children}
      </StateContext.Provider>
   );
};
export const x = 3;
