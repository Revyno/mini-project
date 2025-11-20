import { useMutation } from "@tanstack/react-query";
import axios from "../hooks/useApi";
import Cookies from "js-cookie";

export function useLogin() {
  return useMutation((payload) => axios.post("/login", payload), {
    onSuccess: (res) => {
      Cookies.set("token", res.data.token, { expires: 1 });
    },
  });
}

export function useRegister() {
  return useMutation((payload) => axios.post("/register", payload));
}
