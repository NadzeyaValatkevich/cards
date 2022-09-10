import React, {useEffect, useRef} from 'react';
import s from "./header.module.scss"
import {HeaderContainer} from "../../../common/components/headerContainer/HeaderContainer";
import {Navbar} from "./navbar/Navbar";

type PropsType = {
    onHeightChanged?: (height: number) => void
}

export const Header: React.FC<PropsType> = ({onHeightChanged}) => {
    const headerRef = useRef(null)
    useEffect(() => {
        if (!onHeightChanged || !headerRef?.current) return;
        const div = headerRef.current as HTMLDivElement
        onHeightChanged(div.children[0].clientHeight)
    }, [headerRef])
    
    return (
        <div ref={headerRef}>
            <HeaderContainer className={s.header} fixed>
                <Navbar/>
            </HeaderContainer>
        </div>
    )
}