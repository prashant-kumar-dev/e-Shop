import React, { useState } from 'react';

const FilterCategory = ({ title, options, onChange, filters }) => {
    const [collapsed, setCollapsed] = useState(true);

    const handleFilterChange = (e) => {
        const { name, value, checked } = e.target;
        const newFilters = checked
            ? [...filters[name], value]
            : filters[name].filter(item => item !== value);
        onChange(name, newFilters);
    };

    const categoryName = title.toLowerCase().replace(/\s+/g, '');

    return (
        <div className="mt-4">
            <h3
                className="text-sm font-semibold mb-1 cursor-pointer flex justify-between items-center"
                onClick={() => setCollapsed(!collapsed)}
            >
                <span>{title}</span>
                <span>{collapsed ? '[+]' : '[-]'}</span>
            </h3>
            {!collapsed && (
                <div className="ml-2">
                    {options.map(option => (
                        <label key={option} className="block mb-2">
                            <input
                                type="checkbox"
                                name={categoryName}
                                value={option}
                                onChange={handleFilterChange}
                                checked={filters[categoryName].includes(option)}
                                className="mr-2 leading-tight"
                            /> {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

const FilterSidebar = ({ filters, onChange }) => {
    const [collapsed, setCollapsed] = useState(false);

    const clearFilters = () => {
        Object.keys(filters).forEach(category => {
            onChange(category, []);
        });
    };

    return (
        <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-lg mb-2 font-semibold">Filters</h2>
            <button
                className="block mb-2 text-indigo-600 focus:outline-none"
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? 'Show Filters' : 'Hide Filters'}
            </button>
            {!collapsed && (
                <div>
                    <FilterCategory
                        title="Price Range"
                        options={["₹0 - ₹100", "₹100 - ₹500", "₹500+"]}
                        onChange={onChange}
                        filters={filters}
                    />
                    {/* Clear button */}
                    <button
                        className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg mt-4"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default FilterSidebar;
