class Visibility extends React.Component{
    constructor(props){
        super(props);
        this.toggleDetails = this.toggleDetails.bind(this);
        this.state = {
            show : false
        }
    }
    toggleDetails(){
        this.setState((prevState) =>{
            return{
                show : !prevState.show
            };
        });
    }
    render(){
        return(
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.toggleDetails}>{this.state.show === false? 'Show Details': 'Hide Details'}</button>
                {this.state.show && <p>This are some details</p>}                
            </div>
        )
    }
}

ReactDOM.render(<Visibility/>, document.getElementById('app'));

// const appRoot = document.getElementById('app');

// const app = {
//     show : 0,
//     details : 'This are some details'
// };

// const toggleDetails = () =>{
//     app.show = 1 - app.show;
//     render();
// }

// const render = () => {
//     const template = (
//         <div>
//            <h1>Visibility Toggle</h1>
//            <button onClick={toggleDetails}>{app.show === 0? 'Show Details': 'Hide Details'}</button>
//             {/*{app.show && <p>{app.details}</p>}*/}
//            {app.show === 1? <p>{app.details}</p> : undefined }
//         </div>
//     );

//     ReactDOM.render(template, appRoot);
// }

// render();