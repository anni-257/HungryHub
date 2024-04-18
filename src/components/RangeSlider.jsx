import React, { useEffect, useState } from "react"; // Import React and useState hook from react library
import { Range } from "react-range"; // Import Range component from react-range library

const RangeSlider = ({
  min,
  max,
  placeholder,
  initialMinValue,
  initialMaxValue,
  step,
  setMinMax,
}) => {
  // Define RangeSlider component with props
  const [values, setValues] = useState([
    initialMinValue || min || 0,
    initialMaxValue || max || 100,
  ]); // Initialize state for slider values using useState hook

  const handleChange = (newValues) => {
    // Define handleChange function to update slider values
    setValues(newValues); // Set new slider values
  };

  const handleInputChange = (index, newValue) => {
    // Define handleInputChange function to handle input change for min and max values
    const newSliderValue = [...values]; // Create a copy of current slider values
    newSliderValue[index] = newValue > max ? max : newValue; // Update the specified value ensuring it doesn't exceed max
    setValues(newSliderValue); // Set new slider values
  };

  useEffect(() => {
    console.log("called inside useState Callback");
    setMinMax(values[0], values[1]);
  }, [values]);

  return (
    <div className="flex flex-col justify-center items-center sm:w-64 gap-5 p-3 border">
      {" "}
      {/* Container for the entire RangeSlider */}
      <div className="top-box">
        {" "}
        {/* Placeholder for additional content if needed */}
      </div>
      <h1>{placeholder}</h1> {/* Display placeholder/title */}
      <div className="range-slider relative w-full">
        {" "}
        {/* Container for the range slider */}
        <Range // Use Range component for slider input
          step={step} // Define step for slider
          min={min} // Define minimum value for slider
          max={max} // Define maximum value for slider
          values={values} // Set current values for slider
          onChange={handleChange} // Handle change in slider values
          renderTrack={(
            { props, children } // Render the track for the slider
          ) => (
            <div {...props} className="h-1 w-full rounded relative bg-gray-300">
              {" "}
              {/* Style for the slider track */}
              <div
                className="h-full absolute bg-blue-600"
                style={{
                  left: `${((values[0] - min) / (max - min)) * 100}%`,
                  width: `${((values[1] - values[0]) / (max - min)) * 100}%`,
                }}
              />{" "}
              {/* Style for the active part of the slider */}
              <div
                className="h-full absolute bg-gray-300"
                style={{
                  left: `${((values[1] - min) / (max - min)) * 100}%`,
                  width: `${100 - ((values[1] - min) / (max - min)) * 100}%`,
                }}
              />{" "}
              {/* Style for the inactive part of the slider */}
              {children} {/* Render children components */}
            </div>
          )}
          renderThumb={(
            { props } // Render the thumb for the slider
          ) => (
            <div {...props} className="h-5 w-5 rounded-full bg-emerald-400" /> // Style for the slider thumb
          )}
        />
      </div>
      <div className="min-max flex justify-between space-x-5 w-90%">
        {" "}
        {/* Container for input fields for min and max values */}
        <input
          type="number"
          placeholder="Min"
          value={values[0]} // Set value for min input
          onChange={(e) => handleInputChange(0, parseInt(e.target.value))} // Handle change in min input value
          step={step} // Define step for min input
          min={min} // Define minimum value for min input
          max={max} // Define maximum value for min input
          className="w-1/2" // Apply styling
        />
        <input
          type="number"
          placeholder="Max"
          value={values[1]} // Set value for max input
          onChange={(e) => handleInputChange(1, parseInt(e.target.value))} // Handle change in max input value
          step={step} // Define step for max input
          min={min} // Define minimum value for max input
          max={max} // Define maximum value for max input
          className="w-1/2" // Apply styling
        />
      </div>
    </div>
  );
};

export default RangeSlider; // Export the RangeSlider component
