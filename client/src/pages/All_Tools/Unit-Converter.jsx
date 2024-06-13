import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const units = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701,
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
  },
  volume: {
    liter: 1,
    milliliter: 1000,
    gallon: 0.264172,
    quart: 1.05669,
    pint: 2.11338,
    cup: 4.22675,
    fluid_ounce: 33.814,
  },
};

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [inputUnit, setInputUnit] = useState('meter');
  const [outputUnit, setOutputUnit] = useState('kilometer');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [savedConversions, setSavedConversions] = useState([]);
  const [customUnits, setCustomUnits] = useState({});
  const [newUnit, setNewUnit] = useState({ name: '', value: 1 });

  const handleConversion = () => {
    if (inputValue === '') {
      toast.error("Please enter a value to convert");
      return;
    }
    const inputUnitValue = units[category][inputUnit] || customUnits[category]?.[inputUnit];
    const outputUnitValue = units[category][outputUnit] || customUnits[category]?.[outputUnit];
    const result = (inputValue * inputUnitValue) / outputUnitValue;
    setOutputValue(result);
    toast.success("Conversion Successful");
  };

  const saveConversion = () => {
    const newConversion = {
      category,
      inputUnit,
      outputUnit,
      inputValue,
      outputValue,
    };
    setSavedConversions([...savedConversions, newConversion]);
    toast.success("Conversion Saved");
  };

  const addCustomUnit = () => {
    if (!newUnit.name || newUnit.value <= 0) {
      toast.error("Invalid custom unit");
      return;
    }
    setCustomUnits({
      ...customUnits,
      [category]: {
        ...customUnits[category],
        [newUnit.name]: newUnit.value,
      },
    });
    toast.success("Custom unit added");
  };

  const combinedUnits = {
    ...units,
    ...customUnits,
  };

  return (
    <div  className="text-editor-container"  style={{ padding: '20px' }}>
      <h1 className="title">Unit Converter</h1>
      <div>
        <label>Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {Object.keys(units).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Output Unit: </label>
        <select value={inputUnit} onChange={(e) => setInputUnit(e.target.value)}>
          {Object.keys(combinedUnits[category]).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Input Unit: </label>
        <select value={outputUnit} onChange={(e) => setOutputUnit(e.target.value)}>
          {Object.keys(combinedUnits[category]).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Input Value: </label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <button className="btn-tool" onClick={handleConversion}>Convert</button>
      <div>
        <label>Output Value: </label>
        <input type="text" value={outputValue} readOnly />
      </div>
      <button className="btn-tool" onClick={saveConversion}>Save Conversion</button>
      <h2>Saved Conversions</h2>
      <ul>
        {savedConversions.map((conversion, index) => (
          <li key={index}>
            {conversion.inputValue} {conversion.inputUnit} = {conversion.outputValue} {conversion.outputUnit}
          </li>
        ))}
      </ul>
      <div>
        <h2>Add Custom Unit</h2>
        <input
          type="text"
          placeholder="Unit Name"
          value={newUnit.name}
          onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Unit Value"
          value={newUnit.value}
          onChange={(e) => setNewUnit({ ...newUnit, value: parseFloat(e.target.value) })}
        />
        <button className="btn-tool" onClick={addCustomUnit}>Add Custom Unit</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UnitConverter;
