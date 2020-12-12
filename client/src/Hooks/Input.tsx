import React, { FC, ReactElement } from 'react';
import styled from 'styled-components'

const Container = styled.input`
  border: none;
  border-bottom: 2px solid ${props => props.theme.greyColor};
  font-size: 20px;
  width: 100%;
  padding-bottom: 10px;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    border-bottom-color: #2c3e50;
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    font-weight: 300;
  }
`;

type InputProps = {
  placeholder: string,
  type: string,
  required: boolean,
  value: any
}

const Input: FC<InputProps> = ({ placeholder, type, required, value }): ReactElement => <Container
  placeholder={placeholder}
  type={type}
  required={required}
  value={value}
/>;

export default Input