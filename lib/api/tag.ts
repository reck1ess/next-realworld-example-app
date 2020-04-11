import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";

const TagAPI = {
  getAll: () => axios.get(`${SERVER_BASE_URL}/tags`),
};
export default TagAPI;
