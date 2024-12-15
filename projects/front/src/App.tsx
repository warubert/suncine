import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";
import { AuthProvider } from "./auth/AuthContext";
import './index.css'

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
