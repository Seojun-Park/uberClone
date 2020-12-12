// import React, { FC, ReactElement, useState } from 'react';


// type HookProps = {
//     defaultVlaue: string,
//     event: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
// }

// const useInput: FC<HookProps> = (defaultValue, event) => {
//     const [value, setValue] = useState(defaultValue)
//     const onChange = (e: any) => {
//         console.log(e)
//         const { target: { value } } = e;
//         console.log(value)
//         setValue(value)
//     }
//     console.log(defaultValue)
//     console.log(event)
//     return null;
// }

// export default useInput
import { ReactEventHandler, useState } from 'react';

const useInput = (
    initialValue: string,
    regex?: ((arg: string) => boolean) | RegExp
): [
        string,
        (event: React.ChangeEvent) => any,
        React.Dispatch<React.SetStateAction<string>>
    ] => {
    const [value, setValue] = useState(initialValue);

    const onChange: ReactEventHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        console.log(event)
        const {
            target: { value: inputValue }
        } = event;

        let isValidValue: boolean = true;
        if (regex) {
            console.log(typeof regex)
            if (typeof regex === "function") {
                isValidValue = regex(inputValue);
            } else {
                isValidValue = regex.test(inputValue);
            }
        }
        if (isValidValue) {
            setValue(inputValue);
        }
    };
    return [value, onChange, setValue];
};

export default useInput