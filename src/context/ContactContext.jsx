import React, { createContext, useState, useEffect } from 'react';
import { createContact, getAllContact, deleteContactById, updateContacts } from '../lib/contactApi';




const ContactContext = createContext();

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

 useEffect(() => {
  fetchContacts()
 },[])


  const fetchContacts = async () => {
    try {
      const data = await getAllContact();
       console.log(data, "datacontext")
      setContacts(data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };
  const addContact = async (contact) => {
    try {
      const newContact = await createContact(contact);
      //  console.log("create data", newContact)
      setContacts([...contacts, newContact]);
    } catch (error) {
      console.error('Failed to add contact:', error);
    }
  };


  const deleteContact = async (id) => {
    try {
      const response = await deleteContactById(id);
      fetchContacts()
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };
  

  const updateContact = async (id, updatedContact) => {
    try {
      const updated = await updateContacts(id, updatedContact);
      setContacts(contacts.map((contact) => (contact.id === id ? updated : contact)));
      fetchContacts()
    } catch (error) {
      console.error('Failed to update contact:', error);
    }
  };

  const getAllContacts = () => {
    return contacts;
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, deleteContact, updateContact, fetchContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactProvider };