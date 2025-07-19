import axios from "axios";
import { base_url } from "../../utils/base_url";


export const getallBookings = async () => {
    const response = await axios.get(`${base_url}/booking/all`);
    return response.data;
};

const Bookinservices = {
  getallBookings
}

export default Bookinservices;