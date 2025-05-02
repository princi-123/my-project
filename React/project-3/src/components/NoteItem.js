import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deletenote} = context;
  const {note, updatenote} = props;
  return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                <i class = "far fa-trash-alt mx-2" onClick={()=>{deletenote(note._id); props.showAlert("Updated successfully", "success");}}></i>
                <i class = "far fa-edit mx-2" onClick={()=>{updatenote(note);props.showAlert("Updated successfully", "success");}}></i>
                </div>
                <p className="card-text">{note.description}</p>

            </div>
        </div>
    </div>
  )
}

export default NoteItem
