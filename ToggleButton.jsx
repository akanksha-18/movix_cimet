/* eslint-disable react/prop-types */
import { useState } from 'react';

const ToggleButton = ({ options, defaultOption, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(defaultOption || options[0]);

    const handleToggle = (option) => {
        setSelectedOption(option);
        if (onChange) {
            onChange(option);
        }
    };

    return (
        <div className="inline-flex rounded-full bg-gray-200 p-1">
            {options.map((option) => (
                <button
                    key={option}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                        selectedOption === option
                            ? 'bg-orange-500 text-white'
                            : 'text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => handleToggle(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default ToggleButton;
