import mongoose, { Document, Schema } from 'mongoose'

export interface IFile extends Document {
  content: string
}

const fileSchema: Schema = new Schema({
  content: { type: String, required: true },
})

const File = mongoose.model<IFile>('File', fileSchema)
export default File
