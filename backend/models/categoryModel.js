import mongoose from 'mongoose'

const categoryShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    slug: {
        type: String,
        lowercase: true
    }
})
export default mongoose.model("category", categoryShema);