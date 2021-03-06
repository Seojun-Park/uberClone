import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: 100%;
`;

export const Header = styled.div`
  background-color: black;
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

export const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  padding: 13px 0;
  padding-left: 15px;
  font-weight: 400;
  &:hover {
    background-color: ${(props) => props.theme.greyColor};
    transition: 0.2s linear;
  }
`;

export const Image = styled.img`
  height: 80px;
  width: 80px;
  background-color: grey;
  border-radius: 40px;
  overflow: hidden;
  object-fit: cover;
`;

export const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Rating = styled.h5`
  font-size: 18px;
  color: white;
`;

export const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 100%;
  align-items: center;
`;

interface IToggleProps {
  isDriving: boolean;
}

export const ToggleDriving = styled.button<IToggleProps>`
  -webkit-appearance: none;
  background-color: ${(props) =>
    props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
  text-transform: uppercase;
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 500;
  border: 0;
  padding: 15px 0px;
  margin-top: 30px;
  margin-bottom: 10px;
  cursor: pointer;
`;
