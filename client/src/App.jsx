import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [file, setFile] = useState()
  const [image, setImage] = useState()

  const handleUpload = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      axios.post('http://localhost:3001/uploadImage', { image: imageData })
        .then(res => {
          console.log(res)
          // After successful upload, fetch the updated image
          axios.get('http://localhost:3001/getImage')
            .then(res => setImage(res.data[res.data.length - 1].image)) // Fetch the last uploaded image
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    // Fetch initial image when component mounts
    axios.get('http://localhost:3001/getImage')
      .then(res => setImage(res.data[res.data.length - 1].image)) // Fetch the last uploaded image
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {/* Display the current image */}
      {image && <img src={image} alt="" />}
    </>
  )
}

export default App
