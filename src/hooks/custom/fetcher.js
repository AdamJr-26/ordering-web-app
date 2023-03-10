import axiosAPI from "../../services/api.axios";
import handleError from "../../services/handleError";

const fetcher = async (...args) => {
  const res = await axiosAPI().get(...args);
  handleError(res.status);
  return res.data;
};

export default fetcher;
