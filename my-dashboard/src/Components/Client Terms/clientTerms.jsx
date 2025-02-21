import { useState } from "react"
import "./clientTerms.css"
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const ClientTerms = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      headComponent: "Service Charges",
      charges: ["7%", "7.5%", "8%", "8.33%", "9%"],
    },
    {
      id: 2,
      headComponent: "Credit Period",
      charges: ["30 Days", "45 Days", "60 Days", "90 Days"],
    },
    {
      id: 3,
      headComponent: "Replacement Period",
      charges: ["30 Days", "45 Days", "60 Days", "90 Days", "120 Days"],
    },
  ])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAddColumnModal, setShowAddColumnModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newCharge, setNewCharge] = useState("")
  const [newItemForm, setNewItemForm] = useState({
    headComponent: "",
    charges: [""],
  })

  const handleDelete = (id) => {
    setSelectedItem(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setItems(items.filter((item) => item.id !== selectedItem))
    setShowDeleteModal(false)
  }

  const handleEdit = (item) => {
    setSelectedItem(item)
    setShowEditModal(true)
  }

  const handleAddItem = () => {
    setShowAddModal(true)
  }

  const handleAddColumn = (itemId) => {
    setSelectedItem(itemId)
    setShowAddColumnModal(true)
  }

  const confirmAddColumn = () => {
    setItems(
      items.map((item) => {
        if (item.id === selectedItem) {
          return {
            ...item,
            charges: [...item.charges, newCharge],
          }
        }
        return item
      }),
    )
    setShowAddColumnModal(false)
    setNewCharge("")
  }

  const handleSaveNewItem = () => {
    const newItem = {
      id: items.length + 1,
      ...newItemForm,
    }
    setItems([...items, newItem])
    setShowAddModal(false)
    setNewItemForm({ headComponent: "", charges: [""] })
  }

  const handleUpdateCharges = (index, value) => {
    const updatedCharges = [...newItemForm.charges]
    updatedCharges[index] = value
    setNewItemForm({ ...newItemForm, charges: updatedCharges })
  }

  const addChargeField = () => {
    setNewItemForm({
      ...newItemForm,
      charges: [...newItemForm.charges, ""],
    })
  }

  const downloadData = () => {
    const data = JSON.stringify(items, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "client-terms.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Client Terms</h1>
        
        <div className="header-buttons">
          <button className="download-btn" onClick={downloadData}>
            <i className="fas fa-download"></i> Download
          </button>
          <button className="add-btn" onClick={handleAddItem}>
          + Add Item
        </button>
          
        
        
      </div>
      </div>

      

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>HEAD COMPONENT</th>
              <th>CHARGES</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="head-component">{item.headComponent}</td>
                <td>
                  <div className="charges-vertical">
                    {item.charges.map((charge, index) => (
                      <span key={index} className="charge-item">
                        {charge}
                      </span>
                    ))}
                    <button className="add-charge-btn" onClick={() => handleAddColumn(item.id)}>
                      +
                    </button>
                  </div>
                </td>
                <td className="actions">
                  <button className="icon-btn edit" onClick={() => handleEdit(item)}>
                    <FaRegEdit className="edit-icon" />
                  </button>
                  <button className="icon-btn delete" onClick={() => handleDelete(item.id)}>
                    <FaRegTrashAlt className="delete-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
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

      {/* Edit Confirmation Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Item</h2>
            <div className="form-group">
              <label>Head Component:</label>
              <input
                type="text"
                value={selectedItem.headComponent}
                onChange={(e) => setSelectedItem({ ...selectedItem, headComponent: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Charges:</label>
              {selectedItem.charges.map((charge, index) => (
                <input
                  key={index}
                  type="text"
                  value={charge}
                  onChange={(e) => {
                    const newCharges = [...selectedItem.charges]
                    newCharges[index] = e.target.value
                    setSelectedItem({ ...selectedItem, charges: newCharges })
                  }}
                />
              ))}
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button
                className="save-btn"
                onClick={() => {
                  setItems(items.map((item) => (item.id === selectedItem.id ? selectedItem : item)))
                  setShowEditModal(false)
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Item Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Item</h2>
            <div className="form-group">
              <label>Head Component:</label>
              <input
                type="text"
                value={newItemForm.headComponent}
                onChange={(e) => setNewItemForm({ ...newItemForm, headComponent: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Charges:</label>
              {newItemForm.charges.map((charge, index) => (
                <input
                  key={index}
                  type="text"
                  value={charge}
                  onChange={(e) => handleUpdateCharges(index, e.target.value)}
                  placeholder="Enter charge"
                />
              ))}
              <button className="add-field-btn" onClick={addChargeField}>
                + Add Another Charge
              </button>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveNewItem}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Column Modal */}
      {showAddColumnModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Charge</h2>
            <div className="form-group">
              <label>New Charge:</label>
              <input
                type="text"
                value={newCharge}
                onChange={(e) => setNewCharge(e.target.value)}
                placeholder="Enter new charge"
              />
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAddColumnModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={confirmAddColumn}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientTerms
