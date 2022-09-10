import React, {CSSProperties, ReactNode} from 'react';
import s from './header.module.scss';

type PropsType = {
    style?: CSSProperties | undefined
    fixed?: boolean
    children: ReactNode
}

export const Header: React.FC<PropsType> = ({style, fixed, children}) => {
    let finalStyle = style;
    fixed && (finalStyle = {...style, position: "fixed"})
    
    return (
        <div
            style={finalStyle}
            className={s.header}
        >
            {children}
        </div>
    )
}