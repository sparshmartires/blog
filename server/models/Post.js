import mongoose, { Schema } from 'mongoose';

export const PostSchema = new Schema({
    title: String,
    body: String,
    author: String,
    images: [String],
    categories: [String],
    createdAt: String,
    userid:String,
    isactive:Boolean,
    isapproved:Boolean,
});

export const PostModel = mongoose.model('Post', PostSchema);