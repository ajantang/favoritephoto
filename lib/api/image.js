import renderApi from "@/lib/api/instance";
import { useErrorStore } from "@/store/useErrorStore";

const { setError } = useErrorStore.getState();

export const getImageUrl = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const api = renderApi();
    const response = await api.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    setError(error.response.data.message, null);
    throw error;
  }
};
