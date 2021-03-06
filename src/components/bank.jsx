import React, { Component } from 'react';
import arrayOfId from './arrayOfId';
import arrayOfKeyWord from './arrayOfKeyWord';
import 'font-awesome/css/font-awesome.min.css';

export default class Bank extends Component {
  
    render() {
      return (
        <div className="bank_container">
          <span className="nav_name">BANK</span>
          <i className="fa fa-angle-left" onClick={ this.props.closeBank }></i>
          <div className="library">
            <p>Playlist</p>
            <span>Key</span>
            <hr />
          </div>
          <ul>
            {arrayOfId.length ? arrayOfId.map((item, index) => {
              return (<li key={index}> { item } <span> { arrayOfKeyWord[index] } </span></li>)
            }) : <div><li key="empty">Hmm looks like bank is empty</li><li key="try">try recording something awesome!</li></div> }
          </ul>
        </div>
      )
    }
  }