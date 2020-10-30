import React from 'react';
import Select from 'react-select';
import {options} from '../data/column_values.js';
/**
 * App component that handles events.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};    
    for(let opt_idx = 0;opt_idx<options.length;opt_idx++)
    {
      this.state[options[opt_idx].key] = '';
    }
  }
  
  /**
   * Updates the value the user currently ntered in the form
   * @param {Map} event the map with the value given to the input
   * @param {App} obj the object updated
   */
  inputUpdate(event, obj){
    this.setState(prevState=> {prevState[obj.name] = event.value});
  }

  /**
   * Handles press on submit button
   * @param {App} obj this app
   * @param {Map} event the press
   */
  submitHandler(obj, event){
    
    for (let key in obj.state) {
          if (obj.state[key] === '') {
            alert("הטופס לא הושלם");
            event.preventDefault();
            return;
          }
    }
    event.preventDefault();
    alert("שולח טופס אנא המתן");
    console.log(this.state);
    let result = JSON.stringify(obj.state);
    fetch('https://europe-west3-mystical-magnet-285308.cloudfunctions.net/civics-test-generator.com/endpoint/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: result
    })
    alert("הטופס נשלח בהצלחה!");
    
  }

  /**
   * The function that renders the components
   */
  render() {
    let selections = options.map((option)=> <p style={{textAlign: "right"}}>
      {option.key}
      <Select className="basic-single"
    name={option.key}
    onChange={(e, select_obj) => this.inputUpdate(e, select_obj)} options={option.value} /></p>);
    return (
      <form id="my-form" onSubmit={e => this.submitHandler(this, e)}>
        {selections}          
        <input type="submit" value="הגש" />
        </form>
        
    );
  }
}

export default App;
