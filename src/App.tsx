import Chat from "./pages/ChatMain.tsx";
import { Login } from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import { Route, Routes } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
