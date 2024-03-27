import React, { useState } from 'react';
import {QrReader} from 'react-qr-reader';

const Qrreader = () => {
  const [result, setResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const openImageDialog = () => {
    // Trigger the file input to open the file dialog
    document.getElementById('file-input').click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResult(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code Scanner</h1>
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      <p style={{ marginTop: '20px', fontSize: '18px' }}>Scanned Result: {result}</p>
      <button
        style={{
          padding: '10px',
          fontSize: '16px',
          backgroundColor: '#3498db',
          color: 'white',
          cursor: 'pointer',
          border: 'none',
        }}
        onClick={openImageDialog}
      >
        Upload QR Code Image
      </button>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default Qrreader;
