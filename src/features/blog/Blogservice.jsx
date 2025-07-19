import axios from "axios";
import { base_url } from "../../utils/base_url";

export const addBlogs = async (progData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const response = await axios.post(
        `${base_url}/blog/`,
        progData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const allBlogs = async () => {
    const response = await axios.get(`${base_url}/blog/all`);
    return response.data;
};

export const singleBlogs = async (id) => {
    const response = await axios.get(`${base_url}/blog/single/${id}`);
    return response.data;
};

export const putBlogs = async (progr) => {
    const response = await axios.put(`${base_url}/blog/update/${progr.id}`,
        {
            images: progr.progData.images,
            heading: progr.progData.heading,
            content: progr.progData.content,
        }
    );
    return response.data;
};

export const deleteBlogs = async (id) => {
    const response = await axios.delete(`${base_url}/blog/delete/${id}`);
    return response.data;
};


const Blogservice = {
    addBlogs,
    allBlogs,
    singleBlogs,
    putBlogs,
    deleteBlogs
}

export default Blogservice;