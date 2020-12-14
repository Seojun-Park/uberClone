import styled from "styled-components";
import Form from "../../Components/Form";

type ButtonProps = {
  bgColor: boolean;
};

export const Container = styled.div``;

export const UploadDiv = styled.div`
  background-color: #fff;
  margin: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const ExtendedForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
`;

export const Input = styled.input`
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.greyColor};
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
    color: ${(props) => props.theme.greyColor};
    font-weight: 300;
  }
  margin-bottom: 30px;
`;

export const UploadButton = styled.button<ButtonProps>`
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  background-color: ${(props) =>
    props.bgColor === false
      ? (props) => props.theme.greenColor
      : (props) => props.theme.blueColor};
  color: white;
  text-transform: uppercase;
  padding: 15px 0;
  font-size: 12px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  &:active,
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.8;
  }
`;

export const Preview = styled.img`
  width: 100%;
  object-fit: contain;
  object-position: center;
  margin-bottom: 20px;
`;

export const PreviewBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  width: 80%;
  min-height: 80px;
  margin-bottom: 20px;
`;
