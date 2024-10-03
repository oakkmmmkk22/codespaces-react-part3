import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Posts from './Posts';
import Shop from './Shop';

function App() {
  return (
    <>
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/posts?fname=Rungwikrai&lname=Phueychantuk">Post Greeting</Link></li>
          <li><Link to="/posts/1">Post id 1</Link></li>
          <li><Link to="/posts/13">Post id 13</Link></li>
          <li><Link to="/posts/6530300473">Post id 6530300473</Link></li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<Posts />} />
      </Routes>
    </BrowserRouter>
    <Shop />
    </>
    
  );
}

export default App;
