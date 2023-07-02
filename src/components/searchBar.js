import React, { useEffect, useState } from 'react'
import SearchResult from './searchFilter'
import "./search.css"
import CloseIcon from '@mui/icons-material/Close';

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [resultBox, setResultBox] = useState(false)

  useEffect(() => {
    if (searchQuery !== '') {
      setResultBox(true)
    } else {
      setResultBox(false)
    }
  }, [searchQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchQuery('')
  }

  return (
    <div className='search-container'>
      <div className='search-box'>
        <input
          type='text'
          placeholder='Digite um filme ou serie'
          className='input-box'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          style={{ touchAction: 'manipulation' }}
        />
        <CloseIcon style={{ fontSize: '20px' }} onClick={()=>{setSearchQuery('');setResultBox(false)}}/>
      </div>
      {resultBox && (
        <SearchResult searchQuery={searchQuery} setResultBox={setResultBox} setSearchQuery={setSearchQuery}/>
      )}
    </div>
  )
}