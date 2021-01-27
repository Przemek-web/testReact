import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import errorReducer from "./store/reducers/errorReducer";
import securityReducer from "./store/reducers/securityReducer";
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user'
import uploadImage from "./store/reducers/uploadImage";
import { i18nReducer } from "react-redux-i18n";
import {
    setLocale,
    loadTranslations,
    syncTranslationWithStore,
} from "react-redux-i18n";

import translations from "./translations";




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    i18n: i18nReducer,
    errors: errorReducer,
    security: securityReducer,
    auth: authReducer,
    user: userReducer,
    image: uploadImage
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale("pl"));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
