import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import TaxationScreen from './Components/Taxation/Taxation';
import SalaryTable from './Components/Salary Data/salaryTable';
import SalaryDeduction from './Components/Salary Deduction/salarydeduction';
import FranchiseeTerms from './Components/FranchiseeTerms/FranchiseTerms';
import ClientTerms from './Components/Client Terms/clientTerms';
import ExpenseData from './Components/Expenses/expensedata';

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
                        <Route path="/masterdata/franchiseeterms" element={<FranchiseeTerms />} /> {/* Add Route for FranchiseeTerms */}
                        <Route path="/masterdata/clientterms" element={<ClientTerms />} />
                        <Route path="/masterdata/expenses" element={<ExpenseData />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
