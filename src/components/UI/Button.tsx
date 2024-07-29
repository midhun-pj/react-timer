import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<'button'>;

const Button = (props: ButtonProps) => {
    return <button className="button" {...props}></button>
}

export default Button