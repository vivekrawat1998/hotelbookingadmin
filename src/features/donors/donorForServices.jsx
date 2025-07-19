import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

export const addMainDonor = async (donordata) => {
    const response = await axios.post(`${base_url}/ourDonor/create`, donordata);
    return response.data;
};

export const allMainDonor = async () => {
    const response = await axios.get(`${base_url}/ourDonor/all`);
    return response.data;
};


export const singleMainDonor = async (id) => {
    const response = await axios.get(`${base_url}/ourDonor/single/${id}`);
    return response.data;
};

export const putMainDonor = async (Donor) => {
    const response = await axios.put(`${base_url}/ourDonor/update/${Donor.id}`,
        {
            name: Donor.DonorData.name,
            images: Donor.DonorData.images,
            position: Donor.DonorData.position
        });
    return response.data;
};

export const deleteMainDonor = async (id) => {
    const response = await axios.delete(`${base_url}/ourDonor/delete/${id}`);
    return response.data;
};


const ourDonorServices = {
    addMainDonor,
    allMainDonor,
    singleMainDonor,
    putMainDonor,
    deleteMainDonor
}

export default ourDonorServices;