import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ListTrendingComics from './pages/ListTrendingComics';
import ListTypeComics from './pages/ListTypeComics';
import 'remixicon/fonts/remixicon.css';
import './styles/main.css';


function App() {
  return (
    <Router>
      <Header />
      <main role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/trending" element={<ListTrendingComics />} />
          <Route path="/:id" element={<ListTypeComics />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
