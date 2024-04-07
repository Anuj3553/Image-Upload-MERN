import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [file, setFile] = useState()
  const[image, setImage] = useState()

  const handleUpload = () => {
    const formdata = new FormData()
    formdata.append('file', file)
    axios.post('http://localhost:3001/uploadImage', formdata)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get('http://localhost:3001/getImage')
    .then(res => setImage(res.data[0].image))
    .catch(err => console.log(err))
  }, [])

  return (
    <>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      <img src={`http://localhost:3001/images/`+image} style={{width: '45vw'}} alt="" />
    </>
  )
}

export default App
