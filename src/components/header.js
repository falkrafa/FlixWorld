import React from "react";
import './header.css';
import Searchbar from "./searchBar";
export default ({black})=>{
  return (
    <header className={black ? 'black' : ''}>
      <Searchbar/>
      {/* <div className="header-logo">
        <a href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158" alt="Netflix Logo"/>
        </a>
      </div> */}
      {/* <div className="header-user">
        <a href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Netflix user logo"/>
        </a>
      </div> */}
    </header>
  );
}