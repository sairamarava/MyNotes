import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast, { LoaderIcon } from 'react-hot-toast'
import api from '../lib/axios.js'
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';
const NoteDetailPage = () => {
  const [note,setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving,setSaving] = React.useState(false);

  const navigate = useNavigate();
  const {id}=useParams();
  useEffect(() => {
    const fetchNote = async ()=>{
      try{
        const reposne = await api.get(`/notes/${id}`);
        setNote(reposne.data);
      }
      catch(err){
        console.error(err);
        toast.error("Failed to fetch note");
        navigate('/notes');
      } finally {
        setLoading(false);
      }
    }
    fetchNote()
  },[id])
  
  const handleDelete = async ()=>{
    if(window.confirm("Are you sure you want to delete this note?")){
      try{
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted successfully");
        navigate('/');
      }
      catch(err){
        console.error(err);
        toast.error("Failed to delete note");
      }
    }
  }
  const handleSave = async ()=>{
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Title and content cannot be empty");
      return
  }
  setSaving(true);
  try{
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate(`/`);
  }
  catch(err){
    console.error(err);
    toast.error("Failed to save note");
  } finally {
    setSaving(false);
}
  }
  if(loading){
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
          <LoaderIcon className='animate-spin size-20' />
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
        <div className='flex items-center justify-between mb-6'>
          <Link to="/" className='btn btn-ghost text-primary'>
            <ArrowLeftIcon className='h-5 w-5'></ArrowLeftIcon>
            Back to Note
          </Link>
          <button onClick={handleDelete} className='btn btn-error btn-outline'>
            <Trash2Icon className="h-5 w-5"></Trash2Icon>
            Delete Note
          </button>
        </div>
        <div className='card bg-base-100 shadow-md'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label htmlFor="" className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input type="text"
                        placeholder='Note Title'
                        className='input input-bordered'
                        value={note.title}
                        onChange={(e)=>setNote({...note,title: e.target.value})} />
              </div>
              <div className='form-control mb-4'>
                <label htmlFor="" className='label'>
                  <span className='label-text'>Description</span>
                </label>
                <textarea
                        placeholder='Write your note here...'
                        className='textarea textarea-bordered h-32'
                        value={note.content}
                        rows="6"
                        onChange={(e)=>setNote({...note,content: e.target.value})} />
              </div>
              <div className="form-actions flex justify-end">
                <button className='btn btn-primary ' disabled={saving} onClick={handleSave}>
                  {saving ? "Saving ...": "Save Changes"}
                </button>
              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
