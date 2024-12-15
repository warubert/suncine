import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";
import { AuthProvider } from "./auth/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
