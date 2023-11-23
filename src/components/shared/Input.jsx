import React from 'react';


function Input({ id, title, type, name, changeData, customClasses, errors, value }) {
  return (
    <div className="mb-3 w-75 m-auto">
      <label htmlFor={id} className="form-label">{title}</label>
      <input type={type} name={name} className={`form-control ${customClasses}`} id={id} onChange={changeData} value={value} />
      {errors[name] && <p className='text-danger'>{errors[name]}</p>}

    </div>
  )
}

export default Input