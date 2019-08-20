import React from 'react';

export default class AddOption extends React.Component{
    state = {
        error: undefined
    }
    handleAddOpition = (e) => {
        //the prevent default method prevents the page to reload on every submit
        e.preventDefault();
        
        //this is how we acess the elements submitted on the form. The trim method removes every blank space on the begining and on the end of the submission.
        const option = e.target.elements.option.value.trim();

        const error = this.props.handleAdd(option);

        /// this is equivalent to error : error. it works because the prop 
        //in the state has the same name of the desired variable
        //so the above syntax can be shortened
        this.setState( () => ({ error }) );

        if (!error) {
            e.target.elements.option.value = '';
        }

    }
    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOpition}>
                    <input type='text' name='option' />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}