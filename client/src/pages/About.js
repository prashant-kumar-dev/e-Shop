import React from 'react'
import Layout from '../components/layouts/Layout'

const About = () => {
    return (
        <Layout title={"About us -eshop"}>
            {/* Hero Section */}
            <div className="bg-blue-500 text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Our Store</h1>
                    <p className="text-lg mb-8">Discover the story behind our brand and our commitment to excellence.</p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
                    <p className="text-lg mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis tempor ante nec pellentesque. Quisque vel magna turpis. Nullam vehicula nisi ac aliquet feugiat.</p>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-200 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Value 1 */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
                            <p className="text-gray-700">We prioritize customer happiness and satisfaction above all else.</p>
                        </div>
                        {/* Value 2 */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                            <p className="text-gray-700">We ensure top-notch quality in all our products to exceed your expectations.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Team Member 1 */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <img src="https://media.istockphoto.com/id/1483487034/photo/portrait-of-a-cute-female-video-game-avatar.jpg?s=612x612&w=0&k=20&c=axl2giPBvhjLaeNbYRtVS4LJ14qpQMexNR1QPeVjhes=" alt="Team Member" className="w-full mb-4 rounded-lg" />
                            <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                            <p className="text-gray-700">Co-founder & CEO</p>
                        </div>
                        {/* Team Member 2 */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <img src="https://media.istockphoto.com/id/1483487034/photo/portrait-of-a-cute-female-video-game-avatar.jpg?s=612x612&w=0&k=20&c=axl2giPBvhjLaeNbYRtVS4LJ14qpQMexNR1QPeVjhes=" alt="Team Member" className="w-full mb-4 rounded-lg" />
                            <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
                            <p className="text-gray-700">Marketing Director</p>
                        </div>
                        {/* Add more team members */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About
