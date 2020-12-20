import styled from "styled-components";

export const Container = styled.div`
  /* position: absolute;
  z-index: 2;
  height: 100vh;
  width: 100vh; */
`;

export const LoadingContainer = styled.div``;

export const ReloadButton = styled.button``;

export const Button = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

export const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;
