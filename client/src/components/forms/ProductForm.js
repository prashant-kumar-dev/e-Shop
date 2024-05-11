import React from 'react';
import { Input, InputNumber, Checkbox, Select } from 'antd';

const { Option } = Select;

const ProductForm = ({ fields, formData, setFormData, handleSubmit, submitName }) => {
    // console.log('formData:', formData);
    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleCategoryChange = (value) => {
        setFormData({ ...formData, category: value });
    };

    return (
        <div className="max-w-md mx-auto mt-1">
            <h1 className="text-2xl font-bold mb-2">{submitName}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                    <div key={field.name} className="flex flex-col md:flex-row md:items-center md:space-x-4">
                        <label className="block md:w-1/4 mb-1">{field.label}:</label>
                        {field.type === 'textarea' ? (
                            <Input.TextArea
                                className="md:w-3/4"
                                name={field.name}
                                value={formData[field.name]}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                            />
                        ) : field.type === 'number' ? (
                            <>
                                <InputNumber
                                    className="md:w-1/4"
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={(value) => handleInputChange(field.name, value)}
                                />
                                {field.label === 'Price' && (
                                    <span className="md:inline-block md:w-1/4">USD</span>
                                )}
                            </>
                        ) : field.type === 'checkbox' ? (
                            <Checkbox
                                name={field.name}
                                checked={formData[field.name]}
                                onChange={(e) => handleInputChange(field.name, e.target.checked)}
                            >
                                {field.label}
                            </Checkbox>
                        ) : field.type === 'image' ? (
                            <div className="flex items-center space-x-2 md:w-3/4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="imageInput"
                                />
                                <label
                                    htmlFor="imageInput"
                                    className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                >
                                    Upload Image
                                </label>
                                {formData.image && (
                                    <span className="text-gray-500">{formData.image.name}</span>
                                )}
                            </div>
                        ) : field.type === 'dropdown' ? (
                            <Select
                                className="md:w-3/4"
                                value={formData[field.name]}
                                showSearch
                                onChange={(value) => handleCategoryChange(value)}
                            >
                                {field.options.map((option) => (
                                    <Option key={option._id} value={option._id}>
                                        {option.name}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            <Input
                                className="md:w-3/4"
                                name={field.name}
                                value={formData[field.name]}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                            />
                        )}
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    {submitName}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
