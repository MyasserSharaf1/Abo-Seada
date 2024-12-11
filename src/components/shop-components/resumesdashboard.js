import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBsicCTmMLWPMSyHxOfMnr_SVQ8m-rCoUM",
  authDomain: "abu-seada-office.firebaseapp.com",
  projectId: "abu-seada-office",
  storageBucket: "abu-seada-office.appspot.com",
  messagingSenderId: "567437272231",
  appId: "1:567437272231:web:a444f7e762df0f69c8a782",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ResumeDashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch resumes from Firestore
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Trainees'));
        const resumesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResumes(resumesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching resumes:', error);
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  // Delete a resume
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Trainees', id));
      setResumes((prevResumes) => prevResumes.filter((resume) => resume.id !== id));
      console.log(`Resume with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting resume with ID ${id}:`, error);
    }
  };

  if (loading) {
    return <p>Loading resumes...</p>;
  }

  return (
    <div>
      <h2>Resume Dashboard</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>LinkedIn</th>
            <th>Resume</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume) => (
            <tr key={resume.id}>
              <td>{resume.name}</td>
              <td>{resume.email}</td>
              <td>{resume.phone}</td>
              <td>{resume.position}</td>
              <td>
                {resume.linkedin ? (
                  <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn Profile
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td>
                <a href={resume.resumeURL} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(resume.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResumeDashboard;
