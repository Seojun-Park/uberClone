import React, { FC, ReactElement } from 'react';
import * as S from './inputStyles'

type InputProps = {
  placeholder: string,
  type?: string,
  required?: boolean,
  value: string,
  onChange: any,
  setValue?: any,
  name?: string
  autoFocus?: boolean
}

const Input: FC<InputProps> = ({ placeholder, type = "text", required = true, name, onChange, autoFocus, setValue }): ReactElement => <S.Container
  placeholder={placeholder}
  type={type}
  required={required}
  name={name}
  onChange={onChange}
  autoFocus={autoFocus}
/>;

export default Input