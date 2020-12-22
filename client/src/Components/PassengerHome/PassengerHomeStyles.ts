import styled from "styled-components";

export const Contaier = styled.div``;

export const Center = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 2;
  font-size: 30px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const RequestButton = styled.button`
  background-color: black;
  color: white;
  text-transform: uppercase;
  padding: 15px 0;
  font-size: 16px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  &:active,
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.8;
  }
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  height: auto;
  width: 80%;
`;

export const Form = styled.form`
  width: 100%;
  height: 50px;
  position: absolute;
  z-index: 1;
`;
