import { useContext, useState } from 'react';
import React from 'react';
import noteContext from '../context/notes/noteContext';


const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addnote} = context;

    const [note, setnote] = useState({title: "", description: "", tag: ""})

    const handleclick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setnote({title: "", description: "", tag: ""})
        props.showAlert("Updated successfully", "success");
    }
    const onchange = (e) => {
        setnote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlfor="title" className="form-label">title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onchange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlfor="Description" className="form-label">Description</label>
            <input type="text" className="form-control" id="Description" name="Description" value={note.description} onChange={onchange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlfor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} minLength={5} required/>
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default Addnote;
