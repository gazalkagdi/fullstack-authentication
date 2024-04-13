import Login from "./components/loginform.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register.jsx";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
