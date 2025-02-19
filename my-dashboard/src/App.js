import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import TaxationScreen from './Components/Taxation/Taxation';
import SalaryTable from './Components/Salary Data/salaryTable';
import SalaryDeduction from './Components/Salary Deduction/salarydeduction';

const App = () => {
    const [theme, setTheme] = useState('light');

    return (
        <Router>
            <div className={`app-container ${theme}`}>
                <Navbar theme={theme} setTheme={setTheme} />
                <main>
                    <Routes>
                        <Route path="/masterdata/taxation" element={<TaxationScreen />} />
                        <Route path="/masterdata/salarydata" element={<SalaryTable />} /> {/* Add Route for SalaryTable */}
                        <Route path="/masterdata/salarydeduction" element={<SalaryDeduction />} /> {/* Add Route for SalaryDeduction */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
