import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({
                message: "Name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exist",
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        return res.status(201).send({
            success: true,
            message: "New Category created",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in category creation'
        })
    }
}

//update category

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "category not found"
            })
        }
        res.status(200).send({
            success: true,
            messgae: "Category updated syccessfully!",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating"
        })
    }
};

// getting all category
export const getcategoryController = async (req, res) => {
    const { limit = 10, offset = 0 } = req.query; // Default limit to 10, offset to 0
    try {
        const totalCount = await categoryModel.countDocuments(); // Get total count of categories
        const categories = await categoryModel.find({})
            .limit(Number(limit))
            .skip(Number(offset));

        res.status(200).send({
            success: true,
            message: 'Category list fetched successfully',
            categories,
            totalCount,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while fetching categories',
        });
    }
};

//getting single category
export const getSinglecategoryController = async (req, res) => {
    try {
        const { slug } = req.params
        const category = await categoryModel.findOne({ slug })
        res.status(200).send({
            success: true,
            message: 'Get Single category successfully!',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single category"
        })
    }
};

//delete category 

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'category deleted successfully!',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category"
        })
    }
}