import axios from 'axios';
import io from 'socket.io-client';
import { useState,useEffect } from 'react';
const socket = io('http://localhost:5000');

function FileList() {
const [files, setFiles] = useState([]);


 useEffect(() => {
   // Listen for socket.io event to update file list
   socket.on('files-updated', (files) => {
     setFiles(files);
   });

   // Fetch initial file list
   async function fetchFiles() {
     try {
       const response = await axios.get('/files');
       setFiles(response.data);
     } catch (error) {
       console.error(error);
     }
   }
   fetchFiles();

   // Clean up socket.io listener
   return () => {
     socket.off('files-updated');
   };
 }, []);

 return (
   <div>
     <h2>Files</h2>
     <ul>
       {files.map((file) => (
         <li key={file}>{file}</li>
       ))}
     </ul>
   </div>
 );
}

export default FileList;