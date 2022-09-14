import { useState } from "react";
import "./App.css";
import axios from 'axios'

function App() {
  const [image, setImage]=useState(null)
  const [finalImage, setFinalImage]=useState(null)
  const handleImage=(e)=>{
    setImage(e.target.files[0])
    ImageTOBase(e.target.files[0])
    console.log(e.target.files[0])
  }
  const ImageTOBase=(file)=>{
    const reader= new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
      setFinalImage(reader.result)
      console.log(reader.result)
      
    }
  }
  const submitForm=async (e)=>{
    e.preventDefault();
    const result=await axios.post('http://localhost:8080/upload', {image:finalImage})
    if(result.data.err){
      alert("upload failed");
    }
    else{
      alert("upload successfull")
      console.log(result.data)
    }
  }
  return (
    <div className="App">
      <form className="my-form" onSubmit={submitForm}>
        <label>Choose file</label>
        <input type="file" onChange={handleImage} />
        { image && 
        <img src={finalImage} alt="" accept="image/*" />
        }
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
