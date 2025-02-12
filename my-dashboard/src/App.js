import React, { useState } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer'; // Import Footer component
// ... other page imports

const App = () => {
    const [theme, setTheme] = useState('light');

    return (
        <Router>
            <div className={`app-container ${theme}`}>
                <Navbar theme={theme} setTheme={setTheme} />
                <Footer /> {/* Footer is a sibling of main-content, NOT inside */}
            </div>
        </Router>
    );
};

export default App;