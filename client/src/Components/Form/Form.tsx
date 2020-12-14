import { FC } from 'react';

type FormProp = {
    submitFn?: any;
    className?: string
}

const Form: FC<FormProp> = ({ submitFn, className, children }) => (
    <form
        className={className}
        onSubmit={e => {
            e.preventDefault();
            submitFn();
        }}
    >
        {children}
    </form>
)

export default Form