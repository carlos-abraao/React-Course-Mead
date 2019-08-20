import React from 'react';
import AddOption from './AddOption'
import Options from './Options'
import Header from './Header'
import Action from './Action'

class IndecisionApp extends React.Component{
    state = {
        options: []
    }

    handleDeleteOptions = () => {
        this.setState( () => ({options: []}));
    }
    handleDeleteOption = (optionToDelete) => {
        this.setState( (prevState) => (
            {options : prevState.options.filter( (option) => optionToDelete !== option )}
        ));
    }
    handlePick = () => {
        const randomNum = Math.floor (Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOptions = (option) => {
        if(!option){
            return 'Enter valid intem'
        }
        else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }

        this.setState( (prevState) => ({options: prevState.options.concat(option)}));
    }

    componentDidMount(){
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            //only call the set state if there is valid string opition
            if (options) {
                this.setState(() => ({options}));
            }
        } catch (e) {
            //do nothing
        }
    }
    //for the componentDidUpdate lifecycle method, the first two parameters will always be the props and the state, respectively.
    componentDidUpdate(prevProps, prevState){
        //only change the state if there is a diference between the length in the options array. this avoid a problem when repeatvily pressing the reomve all button
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }    
    render() {        
        const subtitle = 'Put your life in the hands of a computer';        
        return (
            <div>
                <Header subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}                    
                />
                <Options 
                    options={this.state.options}
                    handleDeleteAll={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption handleAdd={this.handleAddOptions} />
            </div>
        );
    }
}

// IndecisionApp.defaultProps = {
//     options : []
// }

export default IndecisionApp