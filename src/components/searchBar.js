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
  const handleFocus = () => {
    const viewportMetaTag = document.querySelector('meta[name="viewport"]')
    viewportMetaTag.content = 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no'
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchQuery('')
  }
  const handleBlur = () => {
    const viewportMetaTag = document.querySelector('meta[name="viewport"]')
    viewportMetaTag.content = 'width=device-width,initial-scale=1'
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          
        />
        <CloseIcon style={{ fontSize: '20px' }} onClick={()=>{setSearchQuery('');setResultBox(false)}}/>
      </div>
      {resultBox && (
        <SearchResult searchQuery={searchQuery} setResultBox={setResultBox} setSearchQuery={setSearchQuery}/>
      )}
    </div>
  )
}