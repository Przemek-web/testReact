import axios from "axios";
import {UPLOAD_IMAGE} from "./actionTypes";

export const uploadImage = (imageData) => async dispatch => {
    if (imageData.entries().next().value[1] !== null) {
        const response = await axios.post("/api/users/addImage", imageData, {
            onUploadProgress:progressEvent => {
                console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
            }
        });
        dispatch({
            type: UPLOAD_IMAGE,
            payload: response.data
        });
    }
};