import { useReducer, createContext } from "react";
import { userInfo } from "../Types/userInfo";
type AppState = {
  loading: boolean;
  userInfo?: userInfo;
};

const initialState: AppState = {
  loading: false,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
};

type Action =
  | {
      type: "LOADING";
    }
  | {
      type: "STOP_LOADING";
    }
  | {
      type: "USER_SIGNIN";
      payload: userInfo;
    }
  | {
      type: "USER_SIGNOUT";
    };

function reducer(state: AppState, action: Action): AppState {
  if (action.type == "LOADING") {
    return { ...state, loading: true };
  } else if (action.type == "STOP_LOADING") {
    return { ...state, loading: false };
  } else if (action.type == "USER_SIGNIN") {
    return { ...state, userInfo: action.payload, loading: false };
  } else if (action.type == "USER_SIGNOUT") {
    return {
      ...state,
      loading: false,
    };
  } else {
    return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState,
  );

  return <Store.Provider value={{ state, dispatch }} {...props} />;
}
export { Store, StoreProvider };
