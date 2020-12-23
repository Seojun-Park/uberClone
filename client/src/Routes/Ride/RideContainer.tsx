import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import RidePresenter from "./RidePresenter";

interface IProps extends RouteComponentProps<any> { }

const RideContainer: FC<IProps> = () => {
  return (
    <RidePresenter />
  )
}

export default RideContainer