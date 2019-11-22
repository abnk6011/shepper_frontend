import React from 'react'; 

const InputText = (props) =>{
    return(     
        <input 
         style={{fontSize: props.size, textAlign: props.align, marginBottom: props.marginBottom, marginTop: props.marginTop}}
         className="inputText"
         type="text" 
         placeholder={props.placeholder}
         value={props.value} 
         onChange={props.handleInputChange}
         id={props.id}>
        </input>
    )
}

export default InputText