import { useQuery } from "@tanstack/react-query";
import axios from "../hooks/useApi";

export function useUserDetail(id) {
  return useQuery(["user", id], async () => {
    const res = await axios.get(`/users/${id}`);
    return res.data;
  }, { enabled: !!id });
}
