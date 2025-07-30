import axios from "axios";
import store from "../store"; // đường dẫn tới file redux store của bạn

const API_URL = "https://decalxeapi-production.up.railway.app/api/Stores";

export const getStores = async () => {
    try {
        const token = store.getState().user.token; // Lấy token từ redux (hoặc localStorage)

        if (!token) {
            throw new Error("Không có token xác thực");
        }

        console.log("Calling API with token:", token.substring(0, 20) + "...");

        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách cửa hàng:", error);
        throw error;
    }
};
