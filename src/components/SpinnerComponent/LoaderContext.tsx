import React, { createContext, useReducer } from 'react';

export const LoaderContext = createContext({});

const initialState = {
    loading: false
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "SHOWLOADER":
            window.scrollTo(0, 0);
            document.body.style.overflow = "hidden";
            return {
                loading: true
            };
        case "HIDELOADER":
            document.body.style.overflow = "auto";
            return {
                loading: false
            };
        default:
            return state
    }
};

export const LoaderContextProvider = (props: any) => {
    const [state, dispatch]: any = useReducer(reducer, initialState);

    return (
        <LoaderContext.Provider value={[state, dispatch]}>
            {props.children}
        </LoaderContext.Provider>
    )
}