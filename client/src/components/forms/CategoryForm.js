import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue, submitName }) => {
    return (
        <div className="max-w-md mx-auto mt-1">
            <h1 className="text-2xl font-bold mb-2">Create Category</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="categoryName"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border"
                        placeholder="Enter category name"
                    />
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
