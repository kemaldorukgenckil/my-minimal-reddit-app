import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import Home from './app/pages/Home';
import Layout from './app/pages/Layout';
import Contact from './app/pages/Contact';





function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
        </Route>
       </Routes>
     </Router>
  );
}

export default App;
