console.log('App.js is running!');

var appObj = {
    title : 'Indecision App',
    subtitle : 'Put your life in the hands of a computer',
    options : []
};

const onFormSubmit = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value;

    if(option){
        appObj.options.push(option);
        e.target.elements.option.value = '';
        render();
    }
    else{

    }
};

const onRemoveAll = () => {
    appObj.options = [];
    render();
};

const onMakeDecision = () => {
    const randomNum = Math.floor (Math.random() * appObj.options.length);
    const option = appObj.options[randomNum];
    alert(option);
}

const appRoot = document.getElementById('app');

const render = () => {
    const template = (
        <div>
            <h1>{appObj.title}</h1>
            {appObj.subtitle && <p>{appObj.subtitle}</p>}
            <p>{appObj.options.length > 0? 'Here are your options: ' : 'No options' }</p>
            <button disabled={appObj.options.length === 0} onClick={onMakeDecision} >What should I do?</button>
            <button onClick={onRemoveAll} >Remove All options</button>            
            <ol>
            {
                appObj.options.map( (option) => <li key={option} >{option}</li>)
            }
            </ol>
            <form onSubmit={onFormSubmit} >
                <input type='text' name='option' />
                <button>Add Option</button>
            </form>
        </div>
    );
    
    ReactDOM.render(template, appRoot);
}
render();


