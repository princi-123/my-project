const express = require('express');
const router = express.router();
var fetchuser = require('./middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const notes = require('../models/notes');
const note = require('../models/notes');

// Route 1: get loggedin user Details using: GET "/api/auth/getuser" . login required 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");   
    }
})

// Route 2: Add a new note using: POST "/api/auth/addnote" . login required 
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description a must be atleast 5 characters').isLength({ min: 5 }), ], async (req, res) => {
    try {

        const {title, description, tag} = req.body;
        //if there are errors, return Bad request and the errors
        // async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const note = new notes ({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save()

        res.json(savenote);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");   
        }
    })

// Route 3: update an existing note using: Put "/api/auth/updatenote" . login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
    //Create a newnote object
    const newnote = {};
    if(title){newnote.title = title};
    if(description){newnote.description = description};
    if(tag){newnote.tag = tag};

    // find the note to be updated and update it
    let note = await notes.findById(req.param.id);
    if(!note){return res.status(404).send("not found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await note.findByIdAndUpdate(req.params.id, {$set: newnote}, {new:true})
    res.json({note});
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error"); 
    }  
        
})

// Route 4: delete an existing note using: DELETE "/api/auth/deletenote" . login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
    // find the note to be delete and delete it
    let note = await notes.findById(req.param.id);
    if(!note){return res.status(404).send("not found")}

    // Allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await note.findByIdAndDelete(req.params.id)
    res.json({"success": "note has been deleted", note: note });
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error"); 
    }  
        
})
module.exports = router