import { FC } from 'react';
interface IProps {
    submitFn?: any;
    className?: string
}

const Form: FC<IProps> = ({ submitFn, className, children }) => {
    return (
        <form
            className={className}
            onSubmit={event => {
                event.preventDefault()
                submitFn();
            }}
        >
            {children}
        </form>
    )
}

export default Form