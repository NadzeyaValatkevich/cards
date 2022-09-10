import React, {useState} from 'react';
import SuperButton from "../../../common/components/superButton/SuperButton";
import SuperCheckbox from "../../../common/components/superCheckbox/SuperCheckbox";
import {PopUpMessage} from "../../../common/components/popUpMessage/PopUpMessage";
import SuperInputText from "../../../common/components/superInputText/SuperInputText";

export const TestPage: React.FC = () => {
    
    const [isPopUpMessageShow, setIsPopUpMessageShow] = useState(false)
    const [text, setText] = useState('')
    
    const onClickHandler = () => {
        if (isPopUpMessageShow) return
        setIsPopUpMessageShow(true)
        setTimeout(() => {
            setIsPopUpMessageShow(false)
        }, 3000)
    }
    
    const onChangeCheckedHandler = (checked: boolean) => {
        setIsPopUpMessageShow(checked)
    }
    
    return (
        <>
            <h1>TestPage</h1>
            
            <SuperInputText
                style={{fontSize: 20}}
                value={text}
                onChangeText={setText}
                onEscape={() => setText('')}
                onEnter={onClickHandler}
            />
            
            <SuperButton
                style={{fontSize: 20, padding: "4px"}}
                red
                onClick={onClickHandler}
            >
                SuperButton
            </SuperButton>
            
            <SuperCheckbox
                checked={isPopUpMessageShow}
                onChangeChecked={onChangeCheckedHandler}
            >
                SuperCheckbox
            </SuperCheckbox>
            
            <div style={{margin: 10}}>
                <PopUpMessage
                    show={isPopUpMessageShow}
                    text={text}
                />
            </div>
        </>
    )
}