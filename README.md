# 🌿 Greenify - Plant E-Commerce Platform  

Greenify is a feature-rich **Plant E-Commerce Platform** built using **React.js, Redux, Node.js, MongoDB, and Cloudinary**. It allows users to explore and purchase a variety of plants with categorized listings, authentication, and seamless shopping experiences.  

## 🚀 Features  
- 🔹 **Secure Authentication** – User login and registration with JWT  
- 🔹 **Categorized Plant Listings** – Easy navigation with filtering options  
- 🔹 **Redux State Management** – Efficient and optimized application performance  
- 🔹 **Dynamic Price Calculation** – Updates cart total in real-time  
- 🔹 **Product Management** – Admin can add, update, and delete plant products  
- 🔹 **Cloudinary Integration** – Image uploads for products  

## 🛠️ Tech Stack  
- **Frontend:** React.js, Redux, Bootstrap  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Cloud Storage:** Cloudinary  
- **Authentication:** JWT  

## 📦 Installation & Setup  

1. **Clone the repository**  
   ```sh
   git clone https://github.com/your-github-repo-link.git
   cd greenify-ecommerce

2.Install dependencies 
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

3.## 🔑 Environment Variables  

Create a `.env` file in the `server` folder and add the following configurations:  

```plaintext
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>


4.Run the application

# Start backend server
cd server
npm start

# Start frontend
cd client
npm start

5.Visit the app in your browser
http://localhost:3000

