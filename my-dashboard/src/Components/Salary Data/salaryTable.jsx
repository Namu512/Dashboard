import { useState } from "react"
//import { saveAs } from "file-saver"
//import * as XLSX from "xlsx"
import { Edit2, Download, Trash2, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import "./salarytable.css";

const SalaryTable = () => {
  const [viewType, setViewType] = useState("row")
  const [editingId, setEditingId] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [data, setData] = useState([
    {
      id: 1,
      component: "Basic Salary",
      eligibility: "Permanent Employees",
      limit: "No Limit",
      period: "MONTHLY",
      remarks: "Mandatory for all employees.",
    },
    {
      id: 2,
      component: "House Rent Allowance",
      eligibility: "Permanent Employees",
      limit: "40% of Basic",
      period: "MONTHLY",
      remarks: "Tax exempt under certain conditions.",
    },
    {
      id: 3,
      component: "Medical Allowance",
      eligibility: "Permanent Employees",
      limit: "1000 per month",
      period: "MONTHLY",
      remarks: "Taxable if exceeding the limit.",
    },
    {
      id: 4,
      component: "Conveyance",
      eligibility: "Permanent Employees",
      limit: "1200 per month",
      period: "MONTHLY",
      remarks: "Taxable if exceeding the limit.",
    },
  ])

  const [newRow, setNewRow] = useState({
    component: "",
    eligibility: "",
    limit: "",
    period: "MONTHLY",
    remarks: "",
  })

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id))
    setDeleteConfirmId(null)
  }

  const handleDownload = (row) => {
    const csvContent = Object.values(row).join(",")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `salary-data-${row.component}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleAddRow = () => {
    const newId = Math.max(...data.map((item) => item.id)) + 1
    setData([...data, { id: newId, ...newRow }])
    setNewRow({
      component: "",
      eligibility: "",
      limit: "",
      period: "MONTHLY",
      remarks: "",
    })
  }

  const handleEditSave = () => {
    setEditingId(null)
  }

  return (
    <div className="salary-table-container">
      <div className="header">
        <h2>Salary Data</h2>
        <div className="header-buttons">
        <button className="download-btn" onClick={handleDownload}>
            <i className="fas fa-download"></i> Download
          </button>
        <button className="add-new-btn" onClick={() => setEditingId(0)}>
          <Plus className="icon" />
          Add New
        </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>HEAD/COMPONENT</th>
              <th>ELIGIBILITY</th>
              <th>LIMIT</th>
              <th>PERIOD</th>
              <th>REMARKS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="component">{item.component}</td>
                <td>{item.eligibility}</td>
                <td>{item.limit}</td>
                <td>{item.period}</td>
                <td>{item.remarks}</td>
                <td>
                  <div className="actions">
                    <button onClick={() => setEditingId(item.id)}>
                      <Edit2 className="icon" />
                    </button>
                  
                    <button onClick={() => setDeleteConfirmId(item.id)}>
                      <Trash2 className="icon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
{/*
      <div className="footer">
        <div className="pagination">1-10 of 87</div>
        <div className="controls">
          <div className="pagination-controls">
            <button disabled>
              <ChevronLeft className="icon" />
            </button>
            <button>
              <ChevronRight className="icon" />
            </button>
          </div>
          <div className="view-toggle">
            <button className={viewType === "row" ? "active" : ""} onClick={() => setViewType("row")}>
              Row
            </button>
            <button className={viewType === "column" ? "active" : ""} onClick={() => setViewType("column")}>
              Column
            </button>
          </div>
        </div>
      </div>
*/}
      {(editingId !== null || deleteConfirmId !== null) && (
        <div className="modal-overlay">
          <div className="modal">
            {editingId !== null && (
              <>
                <h3>{editingId === 0 ? "Add New Salary Component" : "Edit Salary Component"}</h3>
                <div className="form-group">
                  <label htmlFor="component">Component Name</label>
                  <input
                    id="component"
                    value={
                      editingId === 0 ? newRow.component : data.find((item) => item.id === editingId)?.component || ""
                    }
                    onChange={(e) => {
                      if (editingId === 0) {
                        setNewRow({ ...newRow, component: e.target.value })
                      } else {
                        setData(
                          data.map((item) => (item.id === editingId ? { ...item, component: e.target.value } : item)),
                        )
                      }
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eligibility">Eligibility</label>
                  <input
                    id="eligibility"
                    value={
                      editingId === 0
                        ? newRow.eligibility
                        : data.find((item) => item.id === editingId)?.eligibility || ""
                    }
                    onChange={(e) => {
                      if (editingId === 0) {
                        setNewRow({ ...newRow, eligibility: e.target.value })
                      } else {
                        setData(
                          data.map((item) => (item.id === editingId ? { ...item, eligibility: e.target.value } : item)),
                        )
                      }
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="limit">Limit</label>
                  <input
                    id="limit"
                    value={editingId === 0 ? newRow.limit : data.find((item) => item.id === editingId)?.limit || ""}
                    onChange={(e) => {
                      if (editingId === 0) {
                        setNewRow({ ...newRow, limit: e.target.value })
                      } else {
                        setData(data.map((item) => (item.id === editingId ? { ...item, limit: e.target.value } : item)))
                      }
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="remarks">Remarks</label>
                  <input
                    id="remarks"
                    value={editingId === 0 ? newRow.remarks : data.find((item) => item.id === editingId)?.remarks || ""}
                    onChange={(e) => {
                      if (editingId === 0) {
                        setNewRow({ ...newRow, remarks: e.target.value })
                      } else {
                        setData(
                          data.map((item) => (item.id === editingId ? { ...item, remarks: e.target.value } : item)),
                        )
                      }
                    }}
                  />
                </div>
                <div className="modal-actions">
                  <button onClick={editingId === 0 ? handleAddRow : handleEditSave}>
                    {editingId === 0 ? "Add" : "Save Changes"}
                  </button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </>
            )}
            {deleteConfirmId !== null && (
              <>
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete this salary component?</p>
                <div className="modal-actions">
                  <button onClick={() => handleDelete(deleteConfirmId)}>Yes, Delete</button>
                  <button onClick={() => setDeleteConfirmId(null)}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SalaryTable;