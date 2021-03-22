import { useContext } from "react";
import { StateContext } from "./StateContext";

export function useStateContext() {
   return useContext(StateContext);
}
