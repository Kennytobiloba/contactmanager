
 const VITE_BASE_URL = "https://databasecontactmanagers.onrender.com";
 
 console.log()

  
  export const getAllContact = async() => {
    const response = await fetch(`${VITE_BASE_URL}/api/contacts`, {
     method:"GET"
    })
     const data = await response.json()
     console.log("data", data)

      return data
  }  

  export const deleteContactById = async (id) => {
    const response = await fetch(`${VITE_BASE_URL}/api/contacts/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Failed to delete contact: ${response.statusText}`);
    }
  };

  export const updateContacts = async (id, updatedContact) => {
    const response = await fetch(`${VITE_BASE_URL}/api/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedContact)
    });
    if (!response.ok) {
      throw new Error(`Failed to update contact: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  };

  export const createContact = async (contact) => {
    const response = await fetch(`${VITE_BASE_URL}/api/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    });
    if (!response.ok) {
      throw new Error(`Failed to create contact: ${response.statusText}`);
    }
    const data = await response.json()
    //  console.log("response login", data)
    return data;
  };

  export const getSingleContact = async (id) => {
    console.log("id edit", id);
  
    try {
      const response = await fetch(`${ VITE_BASE_URL}/api/contacts/${id}`, {
        method: "GET"
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch contact");
      }
  
      const data = await response.json();
      console.log("contact data", data);
      return data;
    } catch (error) {
      console.error("Error fetching contact:", error);
      throw error;
    }
  };
  