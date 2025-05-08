import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ContactContext } from '../context/ContactContext';
import EditContactModal from './EditContactModal';
import { getSingleContact } from '../lib/contactApi';

const ManageContacts = () => {
  const { contacts, deleteContact, fetchContacts, updateContact } = useContext(ContactContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      toast.success('Contact deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete contact.');
    }
  };

  const handleOpenModal = async (contact) => {
    setIsModalOpen(true);
    if (contact?._id) {
      try {
        const data = await getSingleContact(contact._id);
        setSelectedContact(data);
      } catch (error) {
        toast.error("Failed to load contact");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleModalSubmit = async (updatedContact) => {
    // You can re-enable this after implementing updateContact logic
  };

  // Filter contacts by searchQuery (case-insensitive)
  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manage Contacts</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 w-full p-2 border border-gray-300 rounded"
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-100">
                <td className="py-2 px-4">{contact.name}</td>
                <td className="py-2 px-4">{contact.email}</td>
                <td className="py-2 px-2">{contact.phoneNumber}</td>
                <td className="py-2 px-4 flex gap-1">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    onClick={() => handleOpenModal(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => handleDelete(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EditContactModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedContact={selectedContact}
          onSubmit={handleModalSubmit}
          getSingleContact={getSingleContact}
        />
      )}
    </div>
  );
};

export default ManageContacts;
