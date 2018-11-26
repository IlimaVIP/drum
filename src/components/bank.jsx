class Bank extends Component {
  
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
              return (<li> { item } <span> { arrayOfKeyWord[index] } </span></li>)
            }) : <div><li>Hmm looks like bank is empty</li><li>try recording something awesome!</li></div> }
          </ul>
        </div>
      )
    }
  }