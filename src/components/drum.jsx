class Drum extends Component {
    render() {
      return (
        <div className="drum-pad-container">
          { bank.map( data => {
            return (<div className="drum-pad" onClick={ () => this.props.play(data.id, data.keyWord)} data-key={ data.keyData } id={ data.id }>
            <span>{ data.keyWord}</span><p>{ data.id }</p>
            <audio className="clip" id={ data.keyWord } data-key={ data.keyData } data-id={ data.id } src={ data.url }></audio>
          </div>);
          }) }
        </div>
      )
    }
  }