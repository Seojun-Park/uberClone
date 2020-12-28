import styled from "styled-components";

interface IButton {
  bgColor: string;
}

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

export const RideHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatusTitle = styled.h3`
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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Button = styled.input`
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
  margin: 15px auto;
  height: auto;
  width: 100%;
`;

export const CancelButton = styled.input<IButton>`
  background-color: ${(props) =>
    props.bgColor === "green" ? (props) => props.theme.greenColor : "red"};
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
  /* position: absolute;
  bottom: 20px;
  left: 0;
  right: 0; */
  margin: 15px auto;
  height: auto;
  width: 100%;
`;
