import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { getAuth, signOut } from 'firebase/auth';

export default function Logout() {

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log('Logged out successfully');
      // Perform any additional logout actions or redirect the user to a different page
    } catch (error) {
      console.error('Error logging out:', error);
    }

    // Close the modal
    setIsOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setIsOpen(true)}>Logout</Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
      >
        <div style={{ backgroundColor: '#fff', padding: '20px', width: '300px', margin: 'auto', marginTop: '200px' }}>
          <h2 id="logout-modal-title">Logout</h2>
          <p id="logout-modal-description">Are you sure you want to logout?</p>
          <div style={{ textAlign: 'center' }}>
            <Button variant="contained" onClick={handleLogout} style={{ marginRight: '10px' }}>Yes</Button>
            <Button variant="contained" onClick={() => setIsOpen(false)}>No</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

