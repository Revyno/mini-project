import { useQuery } from "@tanstack/react-query";
import axios from "../hooks/useApi";

export function useUsers(page = 1) {
  return useQuery(["users", page], async () => {
    const res = await axios.get("/users", { params: { page } });
    return res.data;
  }, { keepPreviousData: true });
}
