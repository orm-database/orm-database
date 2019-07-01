import React, { useState } from 'react';

// When using bootstrap, these types of files are often empty, but I still keep them in case I want to tweak something later
import './formInput.css';

function FormInput(props) {
    const handleChange = (event) => {
      props.onChange(event.target.value);
    }
  
    return (
        <div>
            <label>{props.labelTitle}</label>
            <input type='input' value={props.value} onChange={handleChange} />
        </div>
    );
  }

  export default FormInput;