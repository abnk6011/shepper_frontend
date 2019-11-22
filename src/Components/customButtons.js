import React from 'react'; 

export const OutlineButton = (props) =>{
    return(     
    <button className="button button_outline" onClick={props.onClick}>{props.text}</button>
    )
}

export const NormalButton = (props) =>{
    return(     
    <button id={props.id} className="button_normal" style={{backgroundColor: props.color}} onClick={props.onClick}>{props.text}</button>
    )
}
