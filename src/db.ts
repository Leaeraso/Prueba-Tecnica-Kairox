import mongoose from 'mongoose'

const MONGO_URL = 'mongodb://localhost:27017/kairox_pt'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('database is connected successfully')
  } catch (error) {
    console.log('error connecting to the database')
    process.exit(1)
  }
}
