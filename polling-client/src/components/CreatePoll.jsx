import React, { useState } from 'react'
import {connect} from 'react-redux'
import { createPoll } from '../store/actions';

const CreatePoll = ({createPoll}) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
  
    const handleChange = (e) => {
      setQuestion(e.target.value);
    };
  
    const addAnswer = () => {
      setOptions([...options, '']);     //appending a new option to put a new option?
    };
  
    const handleAnswer = (e, index) => {
      const updatedOptions = [...options];
      updatedOptions[index] = e.target.value;
      setOptions(updatedOptions);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      createPoll({ question, options });
    };
  
    const optionsInputs = options.map((option, index) => (
      <div key={index}>
        <label className='form-label'>Option {index + 1}</label>
        <input
         className='form-input'
          type="text"
          value={option}
          onChange={(e) => handleAnswer(e, index)}
        />
      </div>
    ));
  
    return (
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor="question" className='form-label'>Question</label>
        <input
          className='form-input'
          type="text"
          name="question"
          value={question}
          onChange={(e) => handleChange(e)}
        />
        <div>{optionsInputs}</div>
        <div className='button_center'>
          <button className='button' type="button" onClick={addAnswer}>Add Option</button>
          <button className='button' type="submit">Submit</button>
        </div>
      </form>
    );
}

export default connect(() => ({}), { createPoll })(CreatePoll)