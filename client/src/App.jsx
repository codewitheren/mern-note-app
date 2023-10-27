import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './routes/Home/home.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AddNote from './routes/Home/add-note.jsx'
import Completed from './routes/Home/completed-notes.jsx'
import UpdateNote from './routes/Home/update-note.jsx'
import ReadNote from './routes/Home/read-note.jsx'
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/completed-notes" element={<Completed />} />
          <Route path="/update/:id" element={<UpdateNote />} />
          <Route path="/read/:id" element={<ReadNote />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
