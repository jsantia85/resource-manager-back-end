import mongoose from 'mongoose'
const Schema = mongoose.Schema

const resourceSchema = new Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  title: {type: String, required: true},
  category: {type: String, required: true},
  url: {type: String, required: true},
  photo: {type: String, required: true},
},{
  timestamps: true,
})

const Resource = mongoose.model('Resource', resourceSchema)

export { Resource }