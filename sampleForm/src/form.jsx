import React, { useState } from "react";
import "./form.css";

const FormComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value); 
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  //Function to convert file into base64 string
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    // Check file size
    if (file.size > 500000) {
      setError("Please choose a file smaller than 500kb");
      return;
    }
    if (file.type != "application/pdf" && file.type != "image/jpeg") {
      setError("File does not support. You must use .pdf or .jpg ");
      return;
    }

    const base64 = await convertBase64(file);
    setFile(base64);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !dob || !file || !address || !contact ) {
      setError("All fields are required");
      return;
    }

    // Form submission logic goes here
    const formData = { name, email, contact, dob, file, address };
    const jsonData = JSON.stringify(formData);
    fetch("http://localhost:5000/form-submission", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => {
        console.log(response.body);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });

    console.log(name, email, dob, file);
  };
  
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3>Sample Form</h3>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="e.g. Akash Shinde"
          value={name}
          onChange={handleNameChange}
          required
        />
        <br />
        <label htmlFor="Address">Address:</label>
        <input
          type="text"
          id="Address"
          placeholder="e.g. Type your address"
          value={address}
          onChange={handleAddressChange}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="sample@gmail.com"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <br />
        <label htmlFor="contact">Mobile no:</label>
        <input
          type="contact"
          id="contact"
          placeholder="Enter your mobile no."
          value={contact}
          onChange={handleContactChange}
          required
        />
        <br />
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={handleDobChange}
          required
        />
        <br />
        <label htmlFor="Add your profile photo">Profile Photo:</label>
        <input
          type="file"
          id="id-proof"
          accept=".pdf,.jpg"
          onChange={handleFileChange}
          required
        />
        {file && <p>{file.name}</p>}
        <br />
        <label htmlFor="id-proof">ID Proof(Aadhar Card):</label>
        <input
          type="file"
          id="id-proof"
          accept=".pdf,.jpg"
          onChange={handleFileChange}
          required
        />
        {file && <p>{file.name}</p>}
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
