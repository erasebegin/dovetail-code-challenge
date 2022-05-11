// STYLED-COMPONENTS
import { ThemeProvider } from "styled-components";
import { GlobalStyles, appTheme } from "../styles/theme.config";
// REDUX
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "../store/reducers";

function MyApp({ Component, pageProps }) {

    const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

    return (
        <ThemeProvider theme={appTheme}>
            <Provider store={store}>
                <GlobalStyles />
                <Component {...pageProps} />
            </Provider>
        </ThemeProvider>
    );
}

export default MyApp;
