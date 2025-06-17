import Note from "../models/Note.js";

export async function getAllNotes(req,res){
    try{
        const notes=await Note.find().sort({createAt:-1});
        res.status(200).json(notes);
    }
    catch(err){
        res.status(500).json({message: "Error fetching"})
        console.error("Error getALLNotes notes:", err);
    }
}
export async function getANote(req,res){
    try{
        const noteId= req.params.id;
        const note=await Note.findById(noteId);
        if(!note){ 
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(note);
    }
    catch(err){
        res.status(500).json({message: "Error fetching the note"})
        console.error("Error getANote notes:", err);
    }
}

export async function createANote(req,res){
    try{
        const {title,content}=req.body;
        const note=new Note(
            {
                title,
                content
            }
        )
        const savedNote=await note.save();
        res.status(201).json(savedNote);
    }
    catch(err){
        res.status(500).json({message: "Error creating note"});
        console.error("Error creating note:", err);
    }
}

export async function updateANote(req,res){
    try{
        const {title,content}=req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new: true, })
        if (!updatedNote) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(updatedNote);
    }
    catch(err){
        res.status(500).json({message: "Error updating note"});
        console.error("Error updating note:", err);
    }
}

export async function deleteANote(req,res){
    try{
        const deletedNote=await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note deleted successfully"});
    }
    catch(err){
        res.status(500).json({message: "Error deleting note"});
        console.error("Error deleting note:", err);
    }
}