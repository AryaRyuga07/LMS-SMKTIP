// import Password from "../../component/Password/Password";
import { useState } from "react";

import React from "react";
import styled from "styled-components";

const Input = styled.input.attrs((props) => ({
  size: props.small ? 5 : undefined,
}))`
  height: 3rem;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
`;

const EyeButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 3rem;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  transition-property: color, background-color;
  transition-duration: 300ms;
  &:hover {
    background-color: gray;
    color: black;
  }
`;

const PasswordInput = ({ value, onChange, onClick, eyes, type }) => (
  <>
    <Input
      id="search"
      type={type}
      placeholder="Password"
      autoComplete="off"
      value={value}
      name="password"
      onChange={onChange}
    />
    <EyeButton onClick={onClick}>{eyes}</EyeButton>
  </>
);

const Password = ({onChange, value}) => {
  const [click, setClick] = useState(true);
  const [type, setType] = useState("password");

  const eyeOpen = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const eyeClose = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );

  const handleClick = () => {
    click ? setClick(false) : setClick(true);
    click ? setType("text") : setType("password");
  };

  return (
    <div className="flex">
          <PasswordInput
            type={type}
            onClick={handleClick}
            onChange={onChange}
            value={value}
            eyes={click ? eyeClose : eyeOpen}
          />
    </div>
  );
};

export default Password;
