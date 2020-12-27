import styled from "styled-components";
import Form from "../../Components/Form";
import Input from "../../Components/Input";

interface ILabel {
  label: string;
}

export const Container = styled.div`
  height: 100vh;
`;

export const ExtendedForm = styled(Form)`
  padding: 0px 20px;
  height: 80%;
`;

export const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

export const Label = styled.label<ILabel>`
  color: ${(props) => props.theme.greyColor};
  padding: 0px 5px;
  border-left: 4px solid ${(props) => props.theme.greyColor};
  font-size: 20px;
`;
