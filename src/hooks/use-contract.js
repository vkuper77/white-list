import { useCallback } from "react";
import { AppContext } from "../context/app/context";
export const useContract = () => useCallback(AppContext)