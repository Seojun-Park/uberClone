import styled from "styled-components";
import Input from "../../Hooks/Input";
import Form from "../../Components/Form";

export const Container = styled.div`
  height: 100vh;
`;

export const ExtendedForm = styled(Form)`
  padding: 0px 40px;
  min-height: 50vh;
`;

export const ExtendedInput = styled(Input)`
margin-bottom: 25px;
`;
