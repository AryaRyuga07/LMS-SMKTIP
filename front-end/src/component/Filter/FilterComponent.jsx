import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";

const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
}))`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 32px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: blue;
  color: white;
  transition-property: color, background-color;
  transition-duration: 300ms;
  &:hover {
    background-color: lightblue;
    color: black;
  }
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
      <Input
        id="search"
        type="text"
        placeholder="Search..."
        autoComplete="off"
        value={filterText}
        onChange={onFilter}
      />
    <ClearButton onClick={onClear}>X</ClearButton>
  </>
);

export default FilterComponent;
