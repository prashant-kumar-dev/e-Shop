import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Helmet>
                <meta charSet="utf-8" />
                <div>
                    <meta name="description" content={description} />
                    <meta name="keywords" content={keywords} />
                    <meta name="author" content={author} />
                </div>
                <title>{title}</title>
            </Helmet>
            <Header />
            <main className=''>
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    )
}
Layout.defaultProps = {
    title: 'ecommerce-web-app',
    description: 'mern-stack-ecom-web',
    keywords: 'mern reactjs,node,mongodb',
    author: 'prashant'
};
export default Layout
