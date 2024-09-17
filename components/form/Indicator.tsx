import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
type IndicatorProps = {
    value: number;
    className?: string;
}
export function Indicator (props: IndicatorProps ){
    const {value, className } = props;
    return (
    <div className={`border h-6 w-6 text-sm rounded dark:bg-muted justify-center items-center flex ${className}`}>
        {value}
    </div>
    )
}