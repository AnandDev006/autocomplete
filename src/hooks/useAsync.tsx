import * as React from "react";
import { useSafeDispatch } from "./useSafeDispatch";

export enum ASYNC_STATUS {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
  IDLE = "IDLE",
}

type API_DATA = any;
type API_ERROR = any;

type ASYNC_ACTION = {
  type: ASYNC_STATUS;
  data?: API_DATA;
  error?: API_ERROR;
};

type STATE = {
  status: ASYNC_STATUS;
  data?: API_DATA;
  error?: API_ERROR;
};

const asyncReducer = (state: STATE, action: ASYNC_ACTION) => {
  switch (action.type) {
    case ASYNC_STATUS.IDLE: {
      return { ...state };
    }
    case ASYNC_STATUS.PENDING: {
      return { status: ASYNC_STATUS.PENDING, data: null, error: null };
    }
    case ASYNC_STATUS.RESOLVED: {
      return { status: ASYNC_STATUS.RESOLVED, data: action.data, error: null };
    }
    case ASYNC_STATUS.REJECTED: {
      return { status: ASYNC_STATUS.REJECTED, data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const useAsync = (initialState: any) => {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: ASYNC_STATUS.IDLE,
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { status, data, error } = state;

  const setData = React.useCallback(
    (data: API_DATA) => dispatch({ type: ASYNC_STATUS.RESOLVED, data }),
    [dispatch]
  );
  const setError = React.useCallback(
    (error: API_ERROR) => dispatch({ type: ASYNC_STATUS.REJECTED, error }),
    [dispatch]
  );

  const run = React.useCallback(
    (promise: Promise<any>, mockDelay: number) => {
      dispatch({ type: ASYNC_STATUS.PENDING });
      setTimeout(() => {
        promise.then(
          (data: API_DATA) => {
            setData(data);
          },
          (error: API_ERROR) => {
            setError(error);
          }
        );
      }, mockDelay);
    },
    [dispatch, setData, setError]
  );

  return { run, status, data, error, setData, setError };
};
