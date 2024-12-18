import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import View from './Components/View'
import Navbar from './Components/Navbar'


function App() {

  return (
    <>
      <div className="container-fluid p-0 overflow-x-hidden">
        <BrowserRouter>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/tasks' element= {<View />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
