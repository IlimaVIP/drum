import React, { Component } from 'react';
import './App.css';
import Drum from './components/drum';
import Bank from './components/bank';
import arrayOfSounds from './components/arrayOfSounds';
import arrayOfId from './components/arrayOfId';
import arrayOfKeyWord from './components/arrayOfKeyWord';

const bgImgDefault = 'https://steamusercontent-a.akamaihd.net/ugc/874119751173677532/3BF57EFDD10DE1C963E888C703A12CE09CDE26BC/',
      bgImgRec = 'https://cdn.dribbble.com/users/1541110/screenshots/3559194/music-viz.gif',
      bgImgPlay = 'https://static.collectui.com/shots/3295793/spheres-motion-for-ai-product-design-by-gleb-large';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: bgImgDefault,
      display: '',
      backgroundColor: '#010135',
      color: '#e93d8b',
      play: false,
      record: false,
      showBank: false
    }
    this.music = "http://streaming.tdiradio.com:8000/house.mp3";
    this.audio = new Audio(this.music);
    this.togglePlay = this.togglePlay.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.changeImgRec = this.changeImgRec.bind(this);
    this.changeImgPlay = this.changeImgPlay.bind(this);
    this.openBank = this.openBank.bind(this);
    this.closeBank = this.closeBank.bind(this);
    this.delete = this.delete.bind(this);
  }
  
  playAudio = (id, keyWord) => {
    const audio = document.getElementById(keyWord);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    if (this.state.record) {
      arrayOfSounds.push(audio.getAttribute('src'))
      arrayOfId.push(audio.getAttribute('data-id'));
      arrayOfKeyWord.push(audio.getAttribute('id'));
    }
    audio.parentNode.classList.add("active");
    setTimeout(() => { audio.parentNode.classList.remove("active"); }, 300);
    this.setState({
      display: id
    });
  }
  
  
  togglePlay = () => {
    console.log(arrayOfSounds.length)
    if(arrayOfSounds.length !== 0) {
      this.music = arrayOfSounds[0];
      this.audio = new Audio(this.music);
      let ind = 0;
      this.audio.addEventListener("ended", this.play = () => {
        console.log('ended');
        if(ind < arrayOfSounds.length) {
          ind += 1;
          this.music = arrayOfSounds[ind];
          this.audio = new Audio(this.music);
          this.audio.play();
          this.state.play ? this.audio.addEventListener("ended", this.play) : this.audio.removeEventListener('ended', this.play);
        }
      });
      this.setState({
        play: !this.state.play
      });
      this.state.play ? this.audio.pause() : this.audio.play();
      // console.log(arrayOfSounds.length);
    } else {
      this.setState({ play: !this.state.play });
      this.state.play ? this.audio.pause() : this.audio.play();
    }
    // console.log(this.audio);
  }
  
  componentWillMount() {
      document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }      

  onKeyPressed = (e) => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    // const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    const id = audio.getAttribute('data-id');
    if (this.state.record) {
      arrayOfSounds.push(audio.getAttribute('src'))
      arrayOfId.push(audio.getAttribute('data-id'));
      arrayOfKeyWord.push(audio.getAttribute('id'));
    }
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    audio.parentNode.classList.add("active");
    setTimeout(() => { audio.parentNode.classList.remove("active"); }, 300);
    this.setState({
      display: id
    });
  }
  
  openBank = () => {
    this.setState({
      showBank: true
    })
  }
  closeBank = () => {
    this.setState({
      showBank: false
    })
  }
  delete = () => {
    if (arrayOfSounds.length) {
      this.music = "http://streaming.tdiradio.com:8000/house.mp3";
      this.audio = new Audio(this.music);
      arrayOfSounds.length = 0;
      arrayOfId.length = 0;
      arrayOfKeyWord.length = 0;
      this.setState({
        display: 'Deleted'
      });
    } else {
      this.setState({
        display: "Hmm, you have nothing to delete"
      });
    }
    
  }
  changeImgRec = (e) => {
    if(e.target.classList.contains("active")) {
      e.target.classList.remove("active");
      this.setState({
        url: bgImgDefault,
        display: 'Play it',
        backgroundColor: '#010135',
        color: '#e93d8b',
        record: false
      });
    } else {
      e.target.classList.add("active");
      this.setState({
        url: bgImgRec,
        display: 'Recording',
        backgroundColor: '#000',
        color: 'silver',
        record: true
      });
    }
    
  }
  changeImgPlay = (e) => {
    this.togglePlay();
    if(e.target.classList.contains("active")) {
      if (arrayOfSounds.length) {
        e.target.classList.remove("active");
        this.setState({
          url: bgImgDefault,
          display: 'Saved in bank',
          backgroundColor: '#010135',
          color: '#e93d8b'
        });
      } else {
        e.target.classList.remove("active");
        this.setState({
          url: bgImgDefault,
          display: 'Try recording something awesome',
          backgroundColor: '#010135',
          color: '#e93d8b'
        });
      }
      
    } else {
      if (arrayOfSounds.length) {
        e.target.classList.add("active");
        this.setState({
          url: bgImgPlay,
          display: 'Playing',
          backgroundColor: '#000',
          color: 'silver'
        });
      } else {
        e.target.classList.add("active");
        this.setState({
          url: bgImgPlay,
          display: "Hmm, no recording found ... ",
          backgroundColor: '#000',
          color: 'silver'
        });
        setTimeout(function(){ this.setState({ display: "I'll play some music instead" }) }.bind(this), 3000);
      }
    }
  }
  render() {
    return (
       <div className="container" id="drum-machine">
        { this.state.showBank ? <Bank closeBank={ this.closeBank }/> : null }
          <div className="container_bg_gif" style={{ backgroundColor: this.state.backgroundColor }}>
            <img src={ this.state.url } alt="" className="bg_gif" />
            <div id="display" style={{ color: this.state.color }}>{ this.state.display }</div>
          </div>
          <div className="button_container">
            <button className="buttons_class" id="btn_bank" onClick={ this.openBank }>BANK</button>
            <button className="buttons_class" id="btn_fx" onClick={ this.delete }>DELETE</button>
            <button className="buttons_class" id="btn_rec" onClick={ this.changeImgRec }>REC</button>
            <button className="buttons_class" id="btn_play" onClick={ this.changeImgPlay }>{this.state.play ? 'PAUSE' : 'PLAY'}</button>
          </div>
          <Drum play={ this.playAudio }/>
        </div>
    );
  }
}

export default App;
