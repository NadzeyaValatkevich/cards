import React, {CSSProperties, ReactNode} from 'react';

type PropsType = {
    style?: CSSProperties | undefined
    className?: string | undefined;
    fixed?: boolean
    children: ReactNode
}

export const HeaderContainer: React.FC<PropsType> =
    ({style, className, fixed, children}) => {
        
        let finalStyle: CSSProperties = {
            width: "100%",
            padding: 5,
        }
        console.log(finalStyle)
        if (style) finalStyle = {...finalStyle, ...style}
        fixed && (finalStyle = {...finalStyle, position: "fixed", top: 0})
        console.log(finalStyle)
        return (
            <div style={finalStyle} className={className}>
                {children}
            </div>
        )
    }