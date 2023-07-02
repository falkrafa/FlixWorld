import React, { useEffect, useState } from 'react'
import SearchResult from './searchFilter'
import "./search.css"
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
          type='search'
          placeholder='Digite um filme ou serie'
          className='input-box'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
      </div>
      {resultBox && (
        <SearchResult searchQuery={searchQuery} setResultBox={setResultBox} setSearchQuery={setSearchQuery}/>
      )}
    </div>
  )
}