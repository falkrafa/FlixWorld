import React, { useEffect, useState } from 'react'
import SearchResult from './searchFilter'
import './search.css'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [resultBox, setResultBox] = useState(false)
  const [searchBarOpen, setSearchBarOpen] = useState(false)

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

  const handleSearchIconClick = () => {
    setSearchBarOpen(!searchBarOpen)
  }

  return (
    <div className={`search-container ${searchBarOpen ? 'search-bar-open' : ''}`}>
      {!searchBarOpen && <div className='search-icon-box'><SearchIcon onClick={handleSearchIconClick} className='search-icon' style={{fontSize:'30px'}}/></div>}
      {searchBarOpen && (
        <div className='search-box'>
          <input
            type='text'
            placeholder='Digite um filme ou série'
            className='input-box'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
          {searchQuery !== '' && (
            <CloseIcon
              style={{ fontSize: '18px', cursor: 'pointer' }}
              onClick={() => {
                setSearchQuery('')
                setResultBox(false)
              }}
            />
          )}
        </div>
      )}
      {resultBox && <SearchResult searchQuery={searchQuery} setResultBox={setResultBox} setSearchQuery={setSearchQuery} />}
    </div>
  )
}
