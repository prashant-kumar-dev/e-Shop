import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Category = () => {
    const [categories, setCategories] = useState([])
    const [slide, setSlide] = useState(0)

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/category/get-category`);
            const { data } = response;
            if (data.success) {
                setCategories(data.categories);
            } else {
                throw new Error(data.message || 'Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    useEffect(() => {
        fetchCategories()
    }, [])

    const nextSlide = () => {
        if (categories.length - 7 === slide) return false;
        setSlide(slide + 1)
    }
    const prevSlide = () => {
        if (categories.length - 0 === slide) return false;
        setSlide(slide - 1)
    }

    return (
        <>
            <div className='max-w-screen-xl mx-auto'>
                <div className='flex my-3 items-center justify-between'>
                    <div className='text-[25px] font-bold'>What's on your mind?</div>
                    <div className='flex'>
                        <div className='w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2 flex justify-center items-center cursor-pointer' onClick={prevSlide}><HiArrowSmLeft
                        /></div>
                        <div className='w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2 flex justify-center items-center cursor-pointer' onClick={nextSlide}><HiArrowSmRight
                        /></div>
                    </div>
                </div>
                <div className='flex gap-2 overflow-hidden'>
                    {categories.map(
                        (category, index) => {
                            return (
                                <div style={{
                                    transform: `translateX(-${slide * 100}%)`
                                }}
                                    key={index} className='w-[175px] shrink-0 duration-500'
                                >
                                    <Link to={`/${category.slug}`}>
                                        <div className=' text-center'>
                                            <img src={category.image} className=' rounded-full' alt="" />
                                            <span>{category.name}</span>
                                        </div>
                                    </Link>
                                </div>

                            )
                        }
                    )
                    }
                </div>
                <hr className='my-4 border-[1PX]' />

            </div >

        </>
    )
}

export default Category
