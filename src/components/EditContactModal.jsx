import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { ContactContext } from '../context/ContactContext';


const EditContactModal = ({ isOpen, onClose, selectedContact }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const {  updateContact } = useContext(ContactContext);

  // Populate form fields when selectedContact changes
  useEffect(() => {
    if (selectedContact) {
      setName(selectedContact.name || "");
      setEmail(selectedContact.email || "");
      setPhoneNumber(selectedContact.phoneNumber || "");
    }
  }, [selectedContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedContact = {
        id: selectedContact._id,
        name,
        email,
        phoneNumber
      };
      await updateContact(selectedContact._id, updatedContact);
      toast.success('Contact updated successfully!');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update contact.');
    }
  };

  return (
    <div className={`modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-content bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactModal;
