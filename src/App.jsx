import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddContact from './components/AddContact';
import ManageContacts from './components/ManageContacts';
import { ContactProvider } from './context/ContactContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ContactProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<AddContact />} />
            {/* <Route path="/" element={<div>Home Page</div>} /> */}
            <Route path="/manage-contact" element={<ManageContacts />} />
            <Route path="/all-contacts" element={<div>All Contacts Page</div>} />
         </Routes>
       </div>
       <ToastContainer />
     </Router>
   </ContactProvider>
 );
}

export default App;
