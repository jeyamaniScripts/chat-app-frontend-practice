import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "/chat",
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
