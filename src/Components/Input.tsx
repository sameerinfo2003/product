import styled from "styled-components";

export default styled.input`
   font-size: 18px;
   width: 100%;
   padding: 10px 20px;
   border: none;
   outline: none;
   border: 1px solid lightgray;
   border-width: 0;
   border-bottom-width: 1px;
   color: rgb(60, 60, 60);
   margin-bottom: 20px;
   &::placeholder {
      color: #cccccc;
   }
   &:focus {
      border-bottom-color: #0077ff;
      /* box-shadow: 2px 0px 1px #0077ff; */
      outline: none;
   }
`;
