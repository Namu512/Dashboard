import React, { useState } from 'react';
import {FiTrash } from 'react-icons/fi';
import './Taxation.css';

const TaxationScreen = () => {
  const [activeTab, setActiveTab] = useState('incomeTax');
  const [selectedYearNewRegime, setSelectedYearNewRegime] = useState('FY 2022-23');
  const [selectedYearDeductions, setSelectedYearDeductions] = useState('FY 2025-26');
  const [selectedYearGST, setSelectedYearGST] = useState('FY 2022-23'); // NEW: State for GST year selection

  // Manage Rows & Columns for New Regime
  const [newRegimeRows, setNewRegimeRows] = useState(6);
  const [newRegimeColumns, setNewRegimeColumns] = useState(["From", "To", "Tax Rate%"]);

  // Manage Rows & Columns for Deductions & Exemptions
  const [deductionRows, setDeductionRows] = useState(4);
  const [deductionColumns, setDeductionColumns] = useState(["Deduction Type", "Amount (₹)", "Applicable Condition"]);

  const [gstRows, setGstRows] = useState(6);
  const [gstColumns, setGstColumns] = useState(["INCOME / EXP HEAD", "GST RATE", "HSN CODE", "VENDOR STATUS", "TDS RATE", "THRESHOLD FOR GST"]);

  const [tdsRows, setTdsRows] = useState(3);
  const [tdsColumns, setTdsColumns] = useState(["SECTION", "NATURE OF PAYMENT", "THRESHOLD LIMIT", "TDS RATE"]);

  // Handlers for Adding Rows
  const addRow = (table) => {
    if (table === 'newRegime') {
      setNewRegimeRows(newRegimeRows + 1);
    } else if (table === 'deductions') {
      setDeductionRows(deductionRows + 1);
    } else if (table === 'gst') {
      setGstRows(gstRows + 1);
    } else if (table === 'tds') {
      setTdsRows(tdsRows + 1);
    }
  };

  // Handlers for Adding Columns
  const addColumn = (table) => {
    if (table === 'newRegime') {
      setNewRegimeColumns([...newRegimeColumns, `New Column ${newRegimeColumns.length + 1}`]);
    } else if (table === 'deductions') {
      setDeductionColumns([...deductionColumns, `New Column ${deductionColumns.length + 1}`]);
    } else if (table === 'gst') {
      setGstColumns([...gstColumns, `New Column ${gstColumns.length + 1}`]);
    } else if (table === 'tds') {
      setTdsColumns([...tdsColumns, `New Column ${tdsColumns.length + 1}`]);
    }
  };

  return (
    <div className="taxation-screen">
      <div className="taxation-content">
        {/* Tabs */}
        <div className="tax-tabs">
          <button className={`tab-button ${activeTab === 'incomeTax' ? 'active' : ''}`} onClick={() => setActiveTab('incomeTax')}>Income Tax</button>
          <button className={`tab-button ${activeTab === 'gst' ? 'active' : ''}`} onClick={() => setActiveTab('gst')}>GST</button>
          <button className={`tab-button ${activeTab === 'tds' ? 'active' : ''}`} onClick={() => setActiveTab('tds')}>TDS</button>
        </div>

        {/* Income Tax Section */}
        {activeTab === 'incomeTax' && (
          <div className="tax-slabs">
            <div className="year-selector">
              <select value={selectedYearNewRegime} onChange={(e) => setSelectedYearNewRegime(e.target.value)}>
                <option>FY 2022-23</option>
                <option>FY 2023-24</option>
                <option>FY 2024-25</option>
                <option>FY 2025-26</option>
              </select>
              <span>(Select the year to see the regime)</span>
            </div>

            {/* New Regime Table */}
            <h2>New Regime</h2>
            <table>
              <thead>
                <tr>
                  {newRegimeColumns.map((col, index) => <th key={index}>{col}</th>)}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[...Array(newRegimeRows)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {newRegimeColumns.map((_, colIndex) => <td key={colIndex}></td>)}
                    <td><FiTrash className="icon" /></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={newRegimeColumns.length + 1}>
                    <button className="add-btn" onClick={() => addRow('newRegime')}>➕ Row</button>
                    <button className="add-btn" onClick={() => addColumn('newRegime')}>➕ Column</button>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Deductions & Exemptions Table */}
            <div className="year-selector">
              <select value={selectedYearDeductions} onChange={(e) => setSelectedYearDeductions(e.target.value)}>
                <option>FY 2022-23</option>
                <option>FY 2023-24</option>
                <option>FY 2024-25</option>
                <option>FY 2025-26</option>
              </select>
              <span>(Select the year to see the deduction and exemptions table)</span>
            </div>
            <h2>Deductions & Exemptions</h2>
            <table>
              <thead>
                <tr>
                  {deductionColumns.map((col, index) => <th key={index}>{col}</th>)}
                </tr>
              </thead>
              <tbody>
                {[...Array(deductionRows)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {deductionColumns.map((_, colIndex) => <td key={colIndex}></td>)}
                  </tr>
                ))}
                <tr>
                  <td colSpan={deductionColumns.length}>
                    <button className="add-btn" onClick={() => addRow('deductions')}>➕ Row</button>
                    <button className="add-btn" onClick={() => addColumn('deductions')}>➕ Column</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* GST Section (Now includes dropdown) */}
        {activeTab === 'gst' && (
          <div className="tax-slabs">
            {/* GST Year Selector */}
            <div className="year-selector">
              <select value={selectedYearGST} onChange={(e) => setSelectedYearGST(e.target.value)}>
                <option>FY 2022-23</option>
                <option>FY 2023-24</option>
                <option>FY 2024-25</option>
                <option>FY 2025-26</option>
              </select>
            </div>

            {/* GST Table */}
            <h2>GST</h2>
            <table>
              <thead>
                <tr>
                  {gstColumns.map((col, index) => <th key={index}>{col}</th>)}
                </tr>
              </thead>
              <tbody>
                {[...Array(gstRows)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {gstColumns.map((_, colIndex) => <td key={colIndex}></td>)}
                  </tr>
                ))}
                <tr>
                  <td colSpan={gstColumns.length}>
                    <button className="add-btn" onClick={() => addRow('gst')}>➕ Row</button>
                    <button className="add-btn" onClick={() => addColumn('gst')}>➕ Column</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TDS Section (Unchanged) */}
        {activeTab === 'tds' && (
          <div className="tax-slabs">
            {/*TDS Year Selector */}
            <div className="year-selector">
              <select value={selectedYearGST} onChange={(e) => setSelectedYearGST(e.target.value)}>
                <option>FY 2022-23</option>
                <option>FY 2023-24</option>
                <option>FY 2024-25</option>
                <option>FY 2025-26</option>
              </select>
            </div>
            <h2>TDS</h2>
            <table>
              <thead>
                <tr>
                  {tdsColumns.map((col, index) => <th key={index}>{col}</th>)}
                </tr>
              </thead>
              <tbody>
                {[...Array(tdsRows)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {tdsColumns.map((_, colIndex) => <td key={colIndex}></td>)}
                  </tr>
                ))}
                <tr>
                  <td colSpan={tdsColumns.length}>
                    <button className="add-btn" onClick={() => addRow('tds')}>➕ Row</button>
                    <button className="add-btn" onClick={() => addColumn('tds')}>➕ Column</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxationScreen;
