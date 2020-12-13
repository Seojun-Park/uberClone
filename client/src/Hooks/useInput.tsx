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
        const {
            target: { value }
        } = event;
        let isValidValue: boolean = true;
        if (regex) {
            if (typeof regex === "function") {
                isValidValue = regex(value);
            } else {
                isValidValue = regex.test(value);
            }
        }
        if (isValidValue) {
            setValue(value);
        }
    };
    return [value, onChange, setValue];
};

export default useInput