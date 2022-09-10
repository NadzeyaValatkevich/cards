import s from "./PopUpMessage.module.css";
import React, {useState} from "react";

type PopUpMessagePropsType = {
    text: string
    show: boolean
}

export const PopUpMessage = (props: PopUpMessagePropsType) => {
    const [message, setMessage] = useState('')
    if (message === '' && props.show) setMessage(props.text)
    if (message !== '' && !props.show) setTimeout(() => setMessage(''), 300)

    let finalClassName = s.popUpMessage
    if (props.show) finalClassName += (' ' + s.show)
    else finalClassName += (' ' + s.disappear)

    if (message==='') finalClassName = s.hidden

    return (
        <span className={finalClassName}>{message}</span>
    )
}