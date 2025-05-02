import React, { useContext, useEffect,useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import { useNavigate } from "react-router-dom"; 

const Notes = (props) => {
    const context = useContext(noteContext);
    let Navigate = useNavigate();
    const {notes, getnotes, editnote} = context;
    useEffect(() => {
      if(localStorage.getItem('token')){
        getnotes()
      }
      else {
        Navigate.push("/login")
      }
      // eslint-disable-next-line
    },[])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setnote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updatenote = (currentnote) => {
      ref.current.click();
      setnote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag})
    }
    const handleclick = (e) => {
      editnote(note.id, note.etitle, note.edescription, note.etag )
      refClose.current.click();
      props.showAlert("Updated successfully", "success");
  }
  const onchange = (e) => {
      setnote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
    <Addnote showAlert={props.showAlert}/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form className="my-3">
          <div className="mb-3">
            <label htmlfor="etitle" className="form-label">title</label>
            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlfor="eDescription" className="form-label">Description</label>
            <input type="text" className="form-control" id="eDescription" name="eDescription" value={note.edescription} onChange={onchange}/>
          </div>
          <div className="mb-3">
            <label htmlfor="etag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange}/>
          </div>
        </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleclick} type="button" className="btn btn-primary">update note</button>
          </div>
        </div>
      </div>
    </div>
  <div className="row my-3">
        <h2>You Notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'no notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updatenote={updatenote} showAlert={props.showAlert} note={note}/>
        })}
        </div>
        </>
  )
}

export default Notes