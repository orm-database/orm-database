import React, { useState } from 'react';

// When using bootstrap, these types of files are often empty, but I still keep them in case I want to tweak something later
import './FormInput.css';

function FormInput(props) {
    const handleChange = (event) => {
      props.onChange(event.target.value);
    }
  
    return (
      <label>{props.labelTitle}</label>
      <input type='input' value={props.value} onChange={handleChange}></input>
    );
  }

  export default FormInput;