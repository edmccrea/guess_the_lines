import React, { useState } from 'react';
import './AddPick.scss';

const AddPick = () => {
  const [formData, setFormData] = useState({});

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='add-pick-container'>
      <h1>Add New Picks</h1>
      {/* <form onSubmit={onSubmit}>
        <input type='text' />
        <select name='team' value={team} onChange={(e) => onChange(e)}>
          <option value={}></option>
          <option value={}></option>
        </select>
      </form> */}
    </div>
  );
};

export default AddPick;
