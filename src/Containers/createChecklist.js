import React, {Component} from 'react';
import Card from '../Components/card'
import InputText from '../Components/inputText'
import {NormalButton} from '../Components/customButtons'
import JSONPretty from 'react-json-pretty';
import {makeNumberNice, doesCardExist} from '../common'


export default class CreateChecklist extends Component {
    constructor(props){
        super(props)
        this.state = {
            sectionTitle: '',
            questions: [''],
            jsonVisible: false,
        }
        this.onDeleteSectionClick = this.onDeleteSectionClick.bind(this);
    }

    onDragStart = (e, index) => {        
        this.draggedItem = this.state.questions[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
      };
    
      onDragOver = index => {
        const draggedOverItem = this.state.questions[index];
        if (this.draggedItem === draggedOverItem) {
          return;
        }
        let questions = this.state.questions.filter(question => question !== this.draggedItem);
        questions.splice(index, 0, this.draggedItem);
        this.setState({ questions });
      };
    
      onDragEnd = () => {
        this.draggedIndex = null;
      };


    changeTitle = (e) =>{
        this.setState({sectionTitle: e.target.value})
    }

    onAddNewClick = () =>{
        let {questions} = this.state
        
        if(questions[questions.length-1]!==''){
            this.setState({questions: [...questions, '']})
        }else{
            alert('create at least 1 question to add more')
        }
    }


    updateOrSaveCard = (id, dataFromChild)=>{
        try {
            let {questions} = this.state
            if(doesCardExist(id, this.state.questions)){
                //update
                let questionsCopy = questions.filter(Boolean) //removes ''
                questionsCopy[id]=dataFromChild
                this.setState({questions: questionsCopy})  
            } else {
                //save new
                let questionsCopy = questions.filter(Boolean) //removes ''
                questionsCopy.push(dataFromChild)
                this.setState({questions: questionsCopy})  
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    onDeleteSectionClick = id =>{
            let {questions} = this.state
            let questionsCopy = questions.map((x) => x)
            questionsCopy.splice(parseInt(id, 10), 1); //removing a Q where delete was clicked            
            this.setState({questions: questionsCopy})
    }

    getDataFromCardWithCallback = (data) => {        
        let dataFromChild = data[0]
        let id = data[1]
        this.updateOrSaveCard(id, dataFromChild)  
    }

    onViewJsonClick = () =>{
        if(this.state.sectionTitle&&this.state.questions!==''){
        //TODO: save to db/state/local storage to use with other sections
        this.setState({jsonVisible: !this.state.jsonVisible})
        }else{
        alert('set up section Title & Fill at least 1 question')
        }
    }
    
    render(){
        let {sectionTitle, questions, jsonVisible} = this.state
        console.log(questions);        
        return(
            <div>
                <InputText 
                 placeholder="Set a Section Title"
                 value={sectionTitle} 
                 handleInputChange={this.changeTitle} 
                 size='x-large'
                 align='center'
                 marginTop='10px'/> 

                {questions.map((card, index)=>(
                     <Card 
                        onDeleteSectionClick={()=>this.onDeleteSectionClick(index)}
                        number={makeNumberNice(index)} 
                        id={index} key={index} 
                        callFromParent={this.getDataFromCardWithCallback}
                        questionTitle={card.question}
                        questionType={card.type}
                        questionAnswers={card.answers}
                        questionChars={card.max_characters}
                        
                        onDragOver={() => this.onDragOver(index)}
                        draggable
                        onDragStart={e => this.onDragStart(e, index)}
                        onDragEnd={this.onDragEnd}
                        />
                    ))}
 
                <NormalButton text='Add New' color='#00C388' onClick={this.onAddNewClick} />
                <br/>
                <NormalButton text='Save/View JSON' color='rgb(46, 17, 141)' onClick={this.onViewJsonClick} />
                {jsonVisible?<JSONPretty id="json-pretty" data={{title:sectionTitle,questions}}></JSONPretty>:''}
            </div>
        )
    }    
}