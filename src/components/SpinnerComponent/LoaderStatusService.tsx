import { LoaderContext } from './LoaderContext';
import { useContext } from 'react';

export const LoaderStatusService = () => {
    const [state, dispatch]: any = useContext(LoaderContext);

    const showLoading = () => dispatch({
        type: "SHOWLOADER",
    });

    const hideLoading = () => dispatch({
        type: "HIDELOADER",
    });


    return { loading: state.loading, showLoading, hideLoading };
}