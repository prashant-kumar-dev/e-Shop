import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue, submitName }) => {
    const handleImageChange = (e) => {
        setValue({ ...value, image: e.target.files[0] });
    };

    return (
        <div className="max-w-md mx-auto mt-1">
            <h1 className="text-2xl font-bold mb-2">{submitName}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="categoryName"
                        value={value.name}
                        onChange={(e) => setValue({ ...value, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-md border"
                        placeholder="Enter category name"
                        required
                    />
                </div>
                <div className="flex items-center space-x-2 md:w-3/4">
                    <label className="block md:w-1/4 mb-1">Image URL:</label>
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
                    {/* Image Preview */}
                    {value.image && (
                        <div>
                            <img
                                src={submitName === 'Update Category' ? value.image : URL.createObjectURL(value.image)}
                                alt="Preview"
                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                        </div>
                    )}
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {submitName}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CategoryForm
