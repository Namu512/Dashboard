import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import TaxationScreen from './Components/Taxation/Taxation';

const App = () => {
    const [theme, setTheme] = useState('light');

    return (
        <Router>
            <div className={`app-container ${theme}`}>
                <Navbar theme={theme} setTheme={setTheme} />
                <main>
                    <Routes>
                        <Route path="/masterdata/taxation" element={<TaxationScreen />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
