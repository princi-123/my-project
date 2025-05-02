import { useState } from "react";
import NoteContext from "./noteContext";
import { json } from "react-router-dom";
import notes from "../../../backend/models/notes";

const NoteState = (props) => {
  const host = "http://localhost:3000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  // Get all notes
  const getnotes = async () => {
    // Api call
    const response = await fetch("${host}/api/notes/addnote", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth=token": localStorage.getItem("token")
      },
    });
    const json = await response.json();
    console.log(json)
    setnotes(json)
  };

  // Add a note
  const addnote = async (title, description, tag) => {
    // TODO: Api call 
    // Api call 
    const response = await fetch('${host}/api/notes/addnote', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "auth=token": localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    })
  }

  // Delete a note
  const deleteNote = async (id) => {
      // API call
      const response = await fetch("${host}/api/notes/deletenote/${id}", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth=token": localStorage.getItem("token")
        },
      });
      const json = await response.json();
      console.log(json)
      const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  }


  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // Api call
    const response = await fetch("${host}/api/notes/updatenote/${id}", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth=token": localStorage.getItem("token")
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json)
  };

  let newNotes = json.parse (json.stringify(notes))
  //Logic to edit in client
  for (let index = 0; index < newNotes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      newNotes[index] = title;
      newNotes[index] = description;
      newNotes[index] = tag;
    }
    break;
  }
  setnotes(newNotes);
}

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getnotes }}>
      {props.children}
    </NoteContext.Provider>
);

export default NoteState;
