import styled from "styled-components";
export const PopUpContainer = styled.div`
  background-color: white;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80%;
  height: 70%;
  z-index: 5;
  padding: 50px 20px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
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
  margin-left: 5px;
  color: ${(props) => props.theme.blueColor};
`;

export const Img = styled.img`
  border-radius: 50%;
  margin-right: 20px;
`;

export const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Header = styled.div`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  word-spacing: 50px;
  font-size: 25px;
  margin: 0 0 20px 0;
  letter-spacing: 10px;
`;

export const ButtonContainer = styled.div`
  /* display: flex; */
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
  align-items: center;
  justify-content: center;
`;

export const ButtonOnCancel = styled.input`
  width: 100%;
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
  margin: 5px 0;
  background-color: red;
`;

export const ButtonOnAccept = styled.input`
  width: 100%;
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
  margin: 5px 0;
  background-color: ${(props) => props.theme.greenColor};
`;
