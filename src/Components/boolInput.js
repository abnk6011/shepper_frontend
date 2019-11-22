import React from 'react'; 

const BoolInput = (props) =>{
    return(     
        <input 
         className="boolInput"
         type={props.type?props.type:"text" }
         placeholder={props.placeholder}
         value={props.value} 
         onChange={props.handleBoolAChange}
         id={props.id}
         style={{width: props.width}}>
        </input>
    )
}

export default BoolInput