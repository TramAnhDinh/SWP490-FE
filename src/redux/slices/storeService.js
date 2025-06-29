import axios from "axios";
import store from "../store"; // đường dẫn tới file redux store của bạn

const API_URL = "https://decalxeapi-backend-production.up.railway.app/api/Stores";

export const getStores = async () => {
    try {
        const token = store.getState().user.token; // Lấy token từ redux (hoặc localStorage)
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách cửa hàng:", error);
        throw error;
    }
};
