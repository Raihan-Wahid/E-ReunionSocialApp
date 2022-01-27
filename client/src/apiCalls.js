import axios from "axios";
import { LoginStart, LoginSuccess, LoginFailure } from "./context/AuthActions";
const url = process.env.REACT_APP_API_URL;

export const loginCall = async(userCredential, dispatch) => {
    dispatch(LoginStart());
    try {
        const res = await axios.post(`${url}/api/auth/login`, userCredential);
        dispatch(LoginSuccess(res.data));
    } catch (err) {
        dispatch(LoginFailure(err));
    }
};