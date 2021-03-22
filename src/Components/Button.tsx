import styled from "styled-components";

export default styled.div<{ color?: string }>`
   width: 100%;
   border: none;
   outline: none;
   border-radius: 2px;
   background-color: ${(p) => p.color || "#0077ff"};
   color: white;
   transition: all 0.25s ease-out;
   padding: 10px 25px;
   height: fit-content;
   text-align: center;
   box-shadow: 2px 2px 5px gray;
   cursor: pointer;
   &:hover {
      background-color: white;
      color: ${(p) => p.color || "#0077ff"};
   }
`;
