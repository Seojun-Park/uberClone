import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import DriverHomePresenter from './DriverHomePresenter'

interface IProps extends RouteComponentProps { }


const DriverHomeContainer: FC<IProps> = () => {
    return (
        <DriverHomePresenter />
    )
}
export default DriverHomeContainer