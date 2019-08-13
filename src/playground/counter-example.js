class Counter extends React.Component{
    constructor(props){
        super(props);
        this.addOne = this.addOne.bind(this);
        this.minusOne = this.minusOne.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            count : 0
        };
    }
    addOne(){
        this.setState((prevState) =>{
            return{
                count : prevState.count + 1
            };
        });
    };
    minusOne(){
        if(this.state.count > 0){
            this.setState((prevState) =>{
                return{
                    count : prevState.count - 1
                };
            });
        }            
    };
    reset(){
        this.setState(() =>{
            return{
                count : 0
            };
        });
    };

    render(){
        return(
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.addOne} >+1</button>
                <button onClick={this.minusOne} >-1</button>
                <button onClick={this.reset} >reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter/>, document.getElementById('app'));

// let count = 0;

// const addOne = () => {
//     count ++;
//     renderCounterApp();
// }

// const minusOne = () => {
//     if(count > 0)
//         count --;
    
//     renderCounterApp();
// }

// const reset = () => {
//     count = 0;
//     renderCounterApp();
// }


// const renderCounterApp = () => {
//     const templateTwo = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne} >+1</button>
//             <button onClick={minusOne} >-1</button>
//             <button onClick={reset} >reset</button>
//         </div>
//     );

//     ReactDOM.render(templateTwo, appRoot);
// }

// renderCounterApp();