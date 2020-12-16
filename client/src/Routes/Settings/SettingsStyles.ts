import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  padding: 0 40px;
`;

export const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

export const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

export const Keys = styled.div``;

export const KeyName = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
`;

export const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

export const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

export const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;
