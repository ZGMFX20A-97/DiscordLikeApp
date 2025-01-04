import { TypedUseSelectorHook, useDispatch,useSelector } from "react-redux";
import { AppDispatch,RootState} from "./store";

//型が無名関数のDispatch
 export const useAppDispatch: () => AppDispatch = useDispatch;

 export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;