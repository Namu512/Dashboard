"use client"

import { useState } from "react"
import "./salarydeduction.css"

const SalaryDeduction = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      headComponent: "PF",
      eligibility: "Permanent Employees",
      limit: "12% of basic salary",
      period: "MONTHLY",
      remarks: "Mandatory for all employees.",
      
    },
    {
      id: 2,
      headComponent: "EPF",
      eligibility: "Permanent Employees",
      limit: "12% of basic salary",
      period: "MONTHLY",
      remarks: "Tax exempt under certain conditions.",
      
    },
    {
      id: 3,
      headComponent: "ESIC 0.75%",
      eligibility: "Permanent Employees",
      limit: ".75% of Basic Salary",
      period: "MONTHLY",
      remarks: "Taxable if exceeding the limit.",
      
    },
    {
      id: 4,
      headComponent: "ESI@ 3.25%",
      eligibility: "Permanent Employees",
      limit: "3.25 % of Basic Salary",
      period: "MONTHLY",
      remarks: "Taxable if exceeding the limit.",
    },
    {
      id: 5,
      headComponent: "Gratuity",
      eligibility: "Employees With 5+ Years In Service",
      limit: "4.81% of Basic salary",
      period: "ONE TIME (ON EXIT)",
      remarks: "Taxable if exceeding the limit.",
    },
    {
      id: 6,
      headComponent: "Bonus",
      eligibility: "Based On Performance Appraisal",
      limit: "8.33% of annual basic salary",
      period: "MONTHLY",
      remarks: "Taxable if exceeding the limit.",
    },
    {
      id: 7,
      headComponent: "Leave",
      eligibility: "Permanent Employees",
      limit: "2 leave per month after 6 month of joining",
      period: "MONTHLY",
      remarks: "Taxable if exceeding the limit.",
    },
    {
      id: 8,
      headComponent: "Professional Tax",
      eligibility: "As Per State Laws",
      limit: "8.33% of annual basic salary",
      period: "MONTHLY",
      remarks: "Taxable if exceeding the limit.",
    },

  ])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [formData, setFormData] = useState({
    headComponent: "",
    eligibility: "",
    limit: "",
    period: "",
    remarks: "",
    
  })

  const handleDelete = (id) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setItems(items.filter((item) => item.id !== deleteId))
    setShowDeleteModal(false)
  }

  const handleEdit = (item) => {
    setEditItem(item)
    setFormData(item)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditItem(null)
    setFormData({
      headComponent: "",
      eligibility: "",
      limit: "",
      period: "",
      remarks: "",
      paidOn: "",
    })
    setShowForm(true)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (editItem) {
      setItems(items.map((item) => (item.id === editItem.id ? { ...formData, id: item.id } : item)))
    } else {
      setItems([...items, { ...formData, id: items.length + 1 }])
    }
    setShowForm(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const downloadData = () => {
    const data = JSON.stringify(items, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "salary-deductions.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Salary Deduction</h1>
        <div className="header-buttons">
          <button className="download-btn" onClick={downloadData}>
            <i className="fas fa-download"></i> Download
          </button>
        <button className="add-btn" onClick={handleAdd}>
          + Add New
        </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>HEAD COMPONENT</th>
              <th>ELIGIBILITY</th>
              <th>LIMIT</th>
              <th>PERIOD</th>
              <th>REMARKS</th>
              
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="head-component">{item.headComponent}</td>
                <td>{item.eligibility}</td>
                <td>{item.limit}</td>
                <td>{item.period}</td>
                <td>{item.remarks}</td>
                
                <td className="actions">
                  <button className="icon-btn edit" onClick={() => handleEdit(item)}>
                    ✎
                  </button>
                  <button className="icon-btn delete" onClick={() => handleDelete(item.id)}>
                    🗑
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/*      <div className="footer">
        <div className="view-controls">
          <button className="view-btn">Row</button>
          <button className="view-btn">Column</button>
        </div>
        <div className="pagination">
          <button className="page-btn">Previous</button>
          <button className="page-btn">Next</button>
        </div>
      </div>
      */}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal">
          <div className="modal-content form-modal">
            <h2>{editItem ? "Edit Item" : "Add New Item"}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Head Component:</label>
                <input
                  type="text"
                  name="headComponent"
                  value={formData.headComponent}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Eligibility:</label>
                <input
                  type="text"
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Limit:</label>
                <input type="text" name="limit" value={formData.limit} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Period:</label>
                <input type="text" name="period" value={formData.period} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Remarks:</label>
                <input type="text" name="remarks" value={formData.remarks} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Paid On:</label>
                <input type="text" name="paidOn" value={formData.paidOn} onChange={handleInputChange} required />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SalaryDeduction

