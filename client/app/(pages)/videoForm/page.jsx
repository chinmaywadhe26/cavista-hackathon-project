'use client';
import React from 'react';
import Call from '../call/page.jsx'; // Adjust the import path as necessary
import SymptomForm from '../../../components/patientForm.jsx'; // Adjust the import path as necessary

const VideoCallWithForm = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, padding: '10px', borderRight: '1px solid #ccc' }}>
        <Call/>
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        <SymptomForm />
      </div>
    </div>
  );
};

export default VideoCallWithForm;