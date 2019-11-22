import React, {Component} from 'react'; 
import styled from 'styled-components';
import {OutlineButton, NormalButton} from '../Components/customButtons'
import InputText from '../Components/inputText'
import BoolInput from '../Components/boolInput'
import {typeCodeToString, stringToTypeCode} from '../common'


class Card extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputValueTitle: '',
            selectedType:0,
            boolQAnswers:['',''],
            action:'',
            inputValueMaxChars: 0,
        }
    }

    componentDidMount(){        
        if(this.props) this.setState(this.passQuestionData())
    }    

    componentDidUpdate(prevProps) {
        if (prevProps.questionTitle !== this.props.questionTitle) {
            let data = this.passQuestionData()
            this.setState(data)            
        }
      }

    passQuestionData = () =>{
        let {questionTitle, questionType, questionAnswers, questionChars}=this.props
        let boolAnswers = questionType==='boolean'?questionAnswers:['','']
        let chars = questionType==='input'?questionChars:0
        let type = stringToTypeCode(questionType)
        let question = questionTitle|| '' 

        return {
            inputValueTitle: question,
            selectedType: type,
            boolQAnswers:boolAnswers,
            inputValueMaxChars:chars,
            action:''
        }
    } 

    selectBool = () =>{
        if(this.state.inputValueTitle){
            this.setState({selectedType: 1, action: 'delete'})
        }else{
            alert('set a Question first')
        }
    }

    selectInput = () =>{
        if(this.state.inputValueTitle){
            this.setState({selectedType: 2, action: 'delete'})
        }else{
            alert('set a Question first')
        }
    }

    deleteQuestion = () =>{
        this.setState({selectedType: 0, action: ''})
    }

    saveQuestion = (e) =>{                
        let {inputValueTitle, selectedType, boolQAnswers, inputValueMaxChars} = this.state

    if((boolQAnswers[0]&&boolQAnswers[1])||inputValueMaxChars!==0){
            if(selectedType===1){
                let data = {
                    type: typeCodeToString(selectedType),
                    question: inputValueTitle,
                    answers: [boolQAnswers[0],boolQAnswers[1]]
                }
                this.props.callFromParent([data, e.target.id])
            }else{
                let data = {
                    type: typeCodeToString(selectedType),
                    question: inputValueTitle,
                    max_characters: inputValueMaxChars
                }
                this.props.callFromParent([data, e.target.id])
            }
    }else{
        alert('finish filling the question')
    }
    this.setState({action: ''})
    }

    renderSelectedQuestionType = (selectedType, id) =>{
        let {boolQAnswers, inputValueMaxChars} = this.state
        let props = {
        action:this.state.action,
        onDeleteClick:this.deleteQuestion,
        onSaveClick: this.saveQuestion,
        onDeleteSectionClick:this.props.onDeleteSectionClick,
        id:id,
        }

        switch (selectedType) {
            case 0:
            return <Type 
                selectBool={this.selectBool} 
                selectInput={this.selectInput}/>

            case 1:
            return <BoolQuestion 
                {...props}
                handleBoolA1Change={this.handleBoolA1Change}
                handleBoolA2Change={this.handleBoolA2Change}
                A1={boolQAnswers?boolQAnswers[0]:''}
                A2={boolQAnswers?boolQAnswers[1]:''}/>

            case 2:
            return <InputQuestion 
                {...props}        
                A1={inputValueMaxChars?inputValueMaxChars:''}
                handleInputTypeChange={this.handleInputTypeChange}/>   

            default: return <Type 
                selectBool={this.selectBool}
                selectInput={this.selectInput}/>
        }
    }

     handleInputChange = (e) =>{
        this.setState({inputValueTitle: e.target.value,  action: 'save'})
    }

    handleBoolA1Change = (e) =>{   
        this.setState({boolQAnswers: [e.target.value, this.state.boolQAnswers[1]], action: 'save'})
    }

    handleBoolA2Change = (e) =>{
        this.setState({boolQAnswers: [this.state.boolQAnswers[0], e.target.value], action: 'save'})
    }

    handleInputTypeChange = (e) =>{
        this.setState({inputValueMaxChars:e.target.value, action: 'save'})
    }


    render(){
        let {selectedType, inputValueTitle} = this.state
        let {number, id} = this.props
        let cardQuestion = this.renderSelectedQuestionType(selectedType, id)
    
        return(
        <Wrapper className='slide-in-blurred-bottom' onDragOver={this.props.onDragOver} style={{cursor: 'grabbing'}}>
           <CardData draggable={this.props.draggable} onDragStart={this.props.onDragStart} onDragEnd={this.props.onDragEnd}>
           <CardNumber>{number}</CardNumber>
             <CardTitle>
             <InputText placeholder="Set a Question" 
              value={inputValueTitle} 
              handleInputChange={this.handleInputChange} size='x-large'/> 
             </CardTitle>
              {cardQuestion} 
              
            </CardData>
        </Wrapper>
        )
    }
}

const BoolQuestion = ({...props}) =>{
    return(
    <SelectQuestionType>
        <BoolInput value={props.A1} placeholder={props.A1?props.A1:'Option 1'} handleBoolAChange={props.handleBoolA1Change} id={props.id}/>
        <BoolInput value={props.A2} placeholder={props.A2?props.A2:'Option 2'} handleBoolAChange={props.handleBoolA2Change} id={props.id}/>
        <Btns {...props}/>
    </SelectQuestionType>
    )
}

const InputQuestion = ({...props}) =>{  
    return(
    <SelectQuestionType>
        <BoolInput type='number' value={props.A1} placeholder={props.A1?props.A1:'Set Max Chars'} handleBoolAChange={props.handleInputTypeChange} id={props.id} width='30%'/>        
        <Btns {...props}/>
    </SelectQuestionType>
    )
}

const Type = (props) =>{
    return(
    <SelectQuestionType>
        <OutlineButton text='Boolean' onClick={props.selectBool}/>
        <OutlineButton text='Input' onClick={props.selectInput}/>
        <QuestionType id={props.id} red onClick={props.onDeleteSectionClick} style={{marginTop:'30px'}}>Delete Question</QuestionType>
    </SelectQuestionType>
    )
}

const Btns = ({...props}) =>{
    return(
    <>    
    <br/>
    {props.action==='delete'?<NormalButton text='Delete' color='#ED5E68' onClick={props.onDeleteClick}/>:''}
    {props.action==='save'?<NormalButton id={props.id} text='Save Changes' color='#37B87C' onClick={props.onSaveClick}/>:''}
    {props.action==='save'?<QuestionType onClick={props.onDeleteClick}>Different Type</QuestionType>:''}
    {props.action===''?<QuestionType id={props.id} red onClick={props.onDeleteSectionClick} style={{marginTop:'30px'}}>Delete Question</QuestionType>:''}
    </>
    )
}

const Wrapper = styled.div`
  background: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  width: 50%;
  padding: 0px 0px 20px 0;
  margin: auto;
  margin-top: 3%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardData = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto auto auto;
`;

const CardNumber = styled.h1`
  font-size: x-large;
  font-weight: 700;
  text-align: left;
  margin-left: 10%;
  grid-column-start: 1;
  grid-column-end: 2;
`;

const CardTitle = styled.h1`
  font-size: x-large;
  font-weight: 300;
  grid-column-start: 2;
  grid-column-end: 4;
  text-align: left;
`;

const SelectQuestionType = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
`;

const QuestionType = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  color: ${props => (props.red ? 'indianred' : 'darkgray')}; 
  cursor: pointer;
`;

export default Card