import './App.css';
import NotesList from './components/NotesList';
import {useEffect, useState} from "react";
import {nanoid} from 'nanoid';
import Search from './components/Search';
import Header from './components/Header';
const  App =()=> {

  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "this is firt note!",
      date: "17/01/2022"
    },
    {
      id: nanoid(),
      text: "this is second note!",
      date: "18/01/2022"
    },
    {
      id: nanoid(),
      text: "this is third note!",
      date: "19/01/2022"
    },
    {
      id: nanoid(),
      text: "this is fourth note!",
      date: "20/01/2022"
    },
    {
      id: nanoid(),
      text: "this is fifth note!",
      date: "21/01/2022"
    },
])

const [searchText, setSearchtext] = useState('');

const [darkMode, setDarkMode]= useState(false);

useEffect(()=>{
  const saveNotes =JSON.parse(localStorage.getItem('react-notes-app-data'));

  if(saveNotes){
    setNotes(saveNotes);
  }

}, []);


useEffect(()=>{
  localStorage.setItem('react-notes-app-data', JSON.stringify(notes))
}, [notes]);

const addNote = (text)=>{
  const date = new Date();
  const newNote = {
    id : nanoid(),
    text : text,
    date: date.toLocaleDateString()
  };
  const newNotes = [...notes, newNote];
  setNotes(newNotes);
}

const deleteNote = (id)=>{
  const newNotes = notes.filter((note)=>note.id  !== id);
  setNotes(newNotes);
}


  return (
   
   <div className={`${darkMode && 'dark-mode'}`}>
     <div className="container">
     <Header handleToggleDarkMode={setDarkMode}/>
     <Search handleSearchNote={setSearchtext}/>
     <NotesList 
     notes={notes.filter((note)=> note.text.toLowerCase().includes(searchText))} 
     handleAddNote={addNote}
     handleDeleteNote={deleteNote}  
     />
     </div>
     </div>
   
  );
}

export default App;
