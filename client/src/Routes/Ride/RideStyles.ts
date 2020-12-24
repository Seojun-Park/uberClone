import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
`;

export const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

export const Data = styled.span`
  color: ${(props) => props.theme.blueColor};
`;

export const Img = styled.img`
  border-radius: 50%;
  margin-right: 20px;
  max-width: 50px;
  height: 50px;
`;

export const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Buttons = styled.div`
  margin: 30px 0px;
`;

export const Button = styled.button`
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