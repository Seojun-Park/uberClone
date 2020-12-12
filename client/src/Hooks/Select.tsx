import React, { FC, ReactElement } from 'react'
import { countries } from '../Asset/countries'
import styled from 'styled-components'

const SelectContainer = styled.select`
  font-size: 20px;
  color: "#2c3e50";
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  border: 0;
  font-family: "Maven Pro";
  margin-bottom: 20px;
  width: 90%;
`;

const Option = styled.option``

type SelectProps = {
    onSelect: any,
    action: string
}

const Select: FC<SelectProps> = ({ onSelect, action }): ReactElement | null => {
    if (action === "countryselect") {
        return (
            <SelectContainer
                onSelect={onSelect}>
                {countries.map((country: any, i: number) => (
                    <Option key={i} value={country.dial_code}>
                        {country.flag} {country.name} ({country.dial_code})
                    </Option>
                ))}
            </SelectContainer>
        )
    } else {
        return null;
    }
}

export default Select