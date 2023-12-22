import "react-dom/client";
import Auth from "./Auth.tsx";
import Login from "./Login.tsx";
import {createRoot} from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import { Provider } from 'react-redux';
import {store} from '../redux/store';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Auth />
    },
    {
        path: "login",
        element: <Login />
    }

]);

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
);