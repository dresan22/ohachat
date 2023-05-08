import Chat from "./pages/ChatMain.tsx";
import { Login } from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
