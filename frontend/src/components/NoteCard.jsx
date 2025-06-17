import React from 'react'
import { Link } from 'react-router-dom'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { formatDate } from '../lib/utils'
import toast from 'react-hot-toast'
import api from '../lib/axios'

const NoteCard = ({note, setNotes}) => {
  const handledelete = async (e,id)=>{
    e.preventDefault();
    if(!window.confirm("Are you sure to delete?")) return;
    try{
      await api.delete(`/notes/${id}`)
      setNotes((prev)=>prev.filter(note=>note._id!==id)) //get rid of deleted note from stat
      toast.success("Note deleted successfully");
    }
    catch(error){
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note")
      alert("Failed to delete note"); 
    }

  }
  return <Link to={`/note/${note._id}`} className='card bg-base-100 hover:bg-base-200 transition-colors duration-200 border-t-4 border-solid border-primary'>
    <div className="bg-base-100 border border-base-content/10 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-primary mb-2">{note.title}</h2>
      <p className="text-base-content/70 mb-4">{note.content.slice(0, 100)}{note.content.length > 100 ? '...' : ''}</p>
      <div className='card-actions justify-between items-center mt-4'>
        <span className="text-sm text-base-content/60">Created on: {formatDate(note.createdAt)}</span>
        <div className='flex items-center gap-2'>
            <button className='btn btn-ghost btn-x5 '>
                <PenSquareIcon className="size-4 text-green-500 hover:text-green-800 transition-colors duration-200 "></PenSquareIcon>
            </button>
            <button className='btn btn-ghost btn-x5 text-error' onClick={(e)=>handledelete(e,note._id)}>
                <Trash2Icon className="size-4 text-red-500 hover:text-red-700 transition-colors duration-200" />
            </button>
        </div>
      </div>
    </div>
  </Link>
}

export default NoteCard
