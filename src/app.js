class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOptions = this.handleAddOptions.bind(this);
        this.state = {
            options : []
        };
    }
    handleDeleteOptions() {
        this.setState( () => {
            return {
                options: []
            };
        });
    }
    handlePick(){
        const randomNum = Math.floor (Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOptions(option) {
        if(!option){
            return 'Enter valid intem'
        }
        else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }

        this.setState( (prevState) => {
            return {
                options: prevState.options.concat(option)
            };
        });
    }
    render() {
        const title = 'Indecision App';
        const subtitle = 'Put your life in the hands of a computer';        
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}                    
                />
                <Options 
                    options={this.state.options}
                    handleDeleteAll={this.handleDeleteOptions}
                />
                <AddOption handleAdd={this.handleAddOptions} />
            </div>
        );
    }
}

class Header extends React.Component{
    render(){
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}

class Action extends React.Component{    
    render(){
        return (
            <div>
                <button 
                    onClick={this.props.handlePick} 
                    disabled={!this.props.hasOptions}
                >
                    What should I do?
                </button>
            </div>
        );
    }
}

class Options extends React.Component{
    
    render(){
        return (
            <div>
                <button onClick={this.props.handleDeleteAll} >Remove All</button>
                {this.props.options.map( (option) => <Option key={option} optionText={option} />)}
            </div>
        );
    }
}

class Option extends React.Component{
    render(){
        return (
            <div>
                <p>{this.props.optionText}</p>
            </div>
        );
    }
}

class AddOption extends React.Component{
    constructor(props){
        super(props);
        this.handleAddOpition = this.handleAddOpition.bind(this);
        this.state = {
            error : undefined
        }
    }
    handleAddOpition(e){
        //the prevent default method prevents the page to reload on every submit
        e.preventDefault();

        //this is how we acess the elements submitted on the form. The trim method removes every blank space on the begining and on the end of the submission.
        const option = e.target.elements.option.value.trim();

        const error = this.props.handleAdd(option);

        this.setState( () => {
            /// this is equivalent to error : error. it works because the prop 
            //in the state has the same name of the desired variable
            //so the above syntax can be shortened
            return { error }; 
        });

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

ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));