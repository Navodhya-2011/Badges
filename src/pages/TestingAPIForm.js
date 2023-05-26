import React, { useState } from 'react';
import './TestingAPIForm.css'
import axios from 'axios';

const TestingAPIForm = () => {
  const [profession, setProfession] = useState('');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [NIC, setNIC] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [format, setFormat] = useState('');

  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(firstName,lastName,email,NIC,phoneNo,address,gender,profession,country);
    console.log(education);

    // Send form data to the backend API endpoint
    axios.post('http://localhost:3001/api/submit-form', {
      profession,
      country,
      firstName,
      lastName,
      email,
      NIC,
      phoneNo,
      address,
      gender,
      education,
    })

      .then((response) => {
        // Handle the response from the backend
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }

  axios.post('http://localhost:3001/api/generate-pdf', {
    education,
  })

  

  const handleSubmitDownload = (event) => {
    event.preventDefault();
    console.log(format);
  
    // Send format data to the backend API endpoint
    axios.post('http://localhost:3001/api/generate-pdf', {
      education,
    })
      .then((response) => {
        // Handle the response from the backend
        console.log(response.data);
  
        // Trigger the download based on the response
        window.open(response.data.downloadLink);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };
  

  return (
    <div>
        <div className="Testing">
        <form onSubmit={handleSubmit}>
        
            <label htmlFor="firstName">First Name:</label>
            <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            />
            <label htmlFor="NIC">NIC:</label>
            <input
            type="text"
            id="NIC"
            value={NIC}
            onChange={(event) => setNIC(event.target.value)}
            required
            />
            <label htmlFor="address">Address:</label>
            <input
            type="text"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            />
            <label htmlFor="phoneNO">Phone NO:</label>
            <input
            type="tel"
            id="phoneNO"
            value={phoneNo}
            onChange={(event) => setPhoneNo(event.target.value)}
            required
            />
            <label htmlFor="gender">Gender:</label>
            <select required value={gender}
                onChange={(e)=> setGender(e.target.value)}>
                <option value="">None</option>    
                <option value="male">male</option>
                <option value="female">female</option>
            </select>

            <label htmlFor="email">email:</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            />
            
            <label htmlFor="profession">Profession:</label>
            <input
            type="text"
            id="profession"
            value={profession}
            onChange={(event) => setProfession(event.target.value)}
            required
            />

            <label htmlFor="country">Country:</label>
            <input
            type="text"
            id="country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            required
            />

            <label htmlFor="education">Education:</label>
            <input
            type="textarea"
            size="100"
            id="education"
            
            value={education}
            onChange={(event) => setEducation(event.target.value)}
            required
            />
        

            <br></br>
            <button type="submit">SignUp</button>
        </form>
        
        </div>

        <br></br>
        <br></br>
        
        <div>
            <form onSubmit={handleSubmitDownload}>
            <h3>Download the file</h3>

            <label htmlFor="format">Format:</label>
            <select required value={format}
                onChange={(e)=> setFormat(e.target.value)}>
                <option value="">None</option>    
                <option value="Word">Word</option>
                <option value="PDF">PDF</option>
            </select>
            <br></br>
            <br></br>
            <button type="submit">Download</button>
            </form>
        </div>
    </div>
  );
};

export default TestingAPIForm;
