import React, { useState } from 'react';
import axios from 'axios';
import './css/ShowcaseForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BestSellingForm() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  function resetForm() {
    setTitle('');
    setImage(null);
    setDescription('');
    setLink('');
  }

  async function sendData(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('img', image);
    formData.append('description', description);
    formData.append('link', link);

    try {
      await axios.post('http://localhost:8000/bestSelling/add', formData);
      toast.success('Best Selling Item Added'); // Use toast for success message
      resetForm();
    } catch (err) {
      setError('Failed to add best selling item. Please try again.');
      toast.error(err.message || 'Failed to add best selling item.'); // Use toast for error message
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="best-selling-form-container">
      <ToastContainer /> {/* Include ToastContainer here */}
      <h2>Add Best Selling Item</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="best-selling-form" onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => {
              const newValue = e.target.value;
              // Only update state if the new value does not contain numbers
              if (!/\d/.test(newValue)) {
                setTitle(newValue);
              }
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Link</label>
          <input
            type="url"
            id="link"
            placeholder="Enter Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="add-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Best Selling Item'}
          </button>
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BestSellingForm;
