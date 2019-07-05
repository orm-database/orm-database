import React, { useState } from 'react';

// When using bootstrap, these types of files are often empty, but I still keep them in case I want to tweak something later
import './formInput.css';

function FormInput(props) {
  
    const handleChange = (event) => {
      props.onChange(event.target.value);
    }
  
    return (
        <div className='form-group'>
            <label>{props.labelTitle}</label>
            <input className='form-control' type={props.type} name={props.labelTitle} placeholder={props.placeholder} value={props.value} onChange={handleChange} />
        </div>
    );
  }

  export default FormInput;