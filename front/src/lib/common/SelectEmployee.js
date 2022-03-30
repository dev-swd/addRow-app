import React, { useState, useEffect } from 'react';
import { getEmps } from '../../lib/api/employee';

const SelectEmployee = (props) => {
  const { name, id, className, value, handleChange } = props;
  const [emps, setEmps] = useState([]);

  useEffect(() => {
    handleGetEmps();
  },[])

  const handleGetEmps = async () => {
    try {
      const res = await getEmps();
      setEmps(res.data);
    } catch (e) {
    }      
  }

  return (
    <select 
      name={name}
      id={id}
      className={className} 
      onChange={(e) => handleChange(e.target.name, e.target.value)}
      value={value}
    >
      <option key={""} value="">{""}</option>
      {emps.map((emp,i) => (
        <option key={id + i} value={emp.id}>{emp.number + ":" + emp.name}</option>
      ))}
    </select>

  )
}

export default SelectEmployee;