class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOptions = this.handleAddOptions.bind(this);
        this.state = {
            options : []//props.options
        };
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
    handleDeleteOptions() {
        this.setState( () => ({options: []}));
    }
    handleDeleteOption(optionToDelete) {
        this.setState( (prevState) => (
            {options : prevState.options.filter( (option) => optionToDelete !== option )}
        ));
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

        this.setState( (prevState) => ({options: prevState.options.concat(option)}));
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

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};

Header.defaultProps = {
    title : 'Idecision'
}

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick} 
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            <button onClick={props.handleDeleteAll} >Remove All</button>
            {props.options.map( 
                (option) => 
                <Option 
                    key={option} optionText={option} 
                    handleDeleteOption={props.handleDeleteOption}
                />
            )}
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}            
            <button onClick={(e) => {
                props.handleDeleteOption(props.optionText);
            }}>
                Remove
            </button>
        </div>
    );
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

ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));