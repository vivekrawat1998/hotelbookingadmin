import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

export const addBlog = async(blogData) => {
    const response = await axios.post(`${base_url}/blog/`, blogData);
    return response.data;
};

export const allBlog = async() => {
    const response = await axios.get(`${base_url}/blog/all`);
    return response.data;
};

export const singleBlog = async(id) => {
    const response = await axios.get(`${base_url}/blog/single/${id}`);
    return response.data;
};

export const putBlog = async(blog) => {
    const response = await axios.put(`${base_url}/blog/update/${blog.id}`, 
    {
        images : blog.blogData.images,
        heading : blog.blogData.heading,
        content : blog.blogData.content,
        date : blog.blogData.date,
        author : blog.blogData.author,
    });
    return response.data;
};

export const deleteBlog = async(id) => {
    const response = await axios.delete(`${base_url}/blog/delete/${id}`);
    return response.data;
};


const blogService = {
    addBlog,
    allBlog,
    singleBlog,
    putBlog,
    deleteBlog
}

export default blogService;