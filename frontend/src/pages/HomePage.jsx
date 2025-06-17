import React, { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import RateLimit from '../components/RateLimit.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'
import NoteCard from '../components/NoteCard.jsx'
import NotesNotFound from '../components/Notesnot.jsx'
const HomePage = () => {
  const [isRateLimited,setIsRateLimited] = React.useState(false)
  const [notes,setNotes]=React.useState([])
  const [loading,setLoading] = React.useState(true)
  useEffect(()=>{
    const fetchNotes=async()=>{
      try{
        const res=await api.get('/notes')
        console.log("success",res.data)
        setNotes(res.data)
        setIsRateLimited(false)
      }
      catch(error){
        console.log("Error fetching notes:", error)
        if(error.response?.status===429){
          setIsRateLimited(true)
        }
        else{
          toast.error("Failed to load notes")
        }
      }
      finally{
        setLoading(false)
      }
    };
    fetchNotes()
  },[])

  return (
    <div  className='min-h-screen'>
      <Navbar/>
      {isRateLimited && <RateLimit/>}
      <div className='max-w-7xl mx-auto p-8 mt-6'> 
        {loading && <div className='text-center text-lg text-gray-500'>Loading...</div>}
        {notes.length===0 && !isRateLimited && !loading && (
         <NotesNotFound/>
        )}
        {notes.length>0 && !isRateLimited &&(
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note=>(
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
