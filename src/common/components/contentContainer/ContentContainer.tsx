import React, {CSSProperties, ReactNode} from 'react';

type PropsType = {
    style?: CSSProperties | undefined
    children: ReactNode
    stepDown?: number //need when fixed header on top
}

export const ContentContainer: React.FC<PropsType> =
    ({style, children, stepDown}) => {
        let finalStyle = style;
        stepDown && (finalStyle = {...style, marginTop: stepDown})
        return (
            < div
                style={finalStyle}>
                {children}
            </div>
        )
    }