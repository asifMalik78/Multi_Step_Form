import Detail from "./pages/detail"
import Form from "./pages/form"
import { Routes , Route } from "react-router-dom"
function App() {


  return (
    <div className="max-w-7xl h-auto mx-auto">
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/detail" element={<Detail/>}/>
      </Routes>
    </div>
  )
}

export default App
