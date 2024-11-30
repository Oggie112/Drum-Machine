
//Redux 
const MODETYPE = "MODETYPE";
const ONOFF = "ONOFF";
const DISPLAY = "DISPLAY"
const modeState = {
  mode: true
};
const onState = {
  on: true
};
const displayState = {
  display: ""
}
const changeMode = () => {
  return {
    type: MODETYPE
  }
};
const modeReducer = (state = modeState, action) => {
  switch (action.type) {
    case MODETYPE: return Object.assign({}, state, {mode: !state.mode});
    default: return state
  }
};
const onOffSwitch = () => {
  return {
    type: ONOFF
  }
}
const onOffReducer = (state = onState, action) => {
  switch (action.type) {
    case ONOFF: return Object.assign({}, state, {on: !state.on});
    default: return state;
};
};
const updateDisplay = (display) => {
  return {
    type: DISPLAY,
    display: display
  }
}
const displayReducer = (state = displayState, action) => {
  switch (action.type) {
    case DISPLAY: return Object.assign({}, state, {display: action.display});
                                       default: return state;
  };
};
const rootReducer = Redux.combineReducers({ mode: modeReducer, on: onOffReducer, display: displayReducer})
const store = Redux.createStore(rootReducer);
console.log(store.getState())
// React 
const clipObject1 = {srcQ: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", idQ: "Heater-1", srcW: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", idW: "Heater-3", srcE: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", idE: "Heater-4", srcA: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", idA: "Heater-2", srcS: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", idS: "Heater-6", srcD: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", idD: "Kick_n_Hat", srcZ: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", idZ: "Kick", srcX: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", idX: "H2", srcC: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", idC: "Dsc_Oh"};
const clipObject2 = {srcQ: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", idQ: "Chord-1", srcW: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", idW: "Chord-2", srcE: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", idE: "Chord-3", srcA: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", idA: "Light", srcS: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", idS: "Dry_Ohh", srcD: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3", idD: "Bld-H1", srcZ: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", idZ: "Punchy-Kick", srcX: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", idX: "Side_Stick", srcC: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", idC: "Brk_Snr"};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.onModeClick = this.onModeClick.bind(this);
    this.onOffClick = this.onOffClick.bind(this);
  };
 handleClick(e) {
    const sound = document.getElementById(e.target.innerText);
   sound.load();
     sound.play();
   this.props.changeDisplay(e.target.id)
   document.getElementById(e.target.id).style.backgroundColor = "orange";
   setTimeout(function() {document.getElementById(e.target.id).style.backgroundColor = "white"}, 500)
  }
  handlePress(e) {
    const id = String.fromCharCode(e.keyCode);
    const sound = document.getElementById(id);
    sound.load();
    sound.play();
    this.props.changeDisplay(sound.parentElement.id)
    document.getElementById(sound.parentElement.id).style.backgroundColor = "orange";
   setTimeout(function() {document.getElementById(sound.parentElement.id).style.backgroundColor = "white"}, 500)
  }
  onModeClick() {
    this.props.changeModeButton();
  };
  onOffClick() {
    this.props.changeOnOffButton();
  }
  render () {
    const audioClips = this.props.mode ? clipObject1 : clipObject2;
    return (
      <div id="drum-machine" onKeyDown={this.handlePress} tabIndex="0">
        <div id="container-1"><button id="on-button" onClick={this.onOffClick}>{this.props.on ? "On" : "Off"}</button>
        <button id="mode-button" onClick={this.onModeClick}>{this.props.mode ? "Sound bank-1" : "Sound bank-2"}</button>
        <Display display={this.props.display}/>
          </div>
        <div id="container-2">
        <DrumPads handleClick={this.handleClick} audioClips={audioClips} checkOn={this.props.on}/>
          </div>
        </div>
    )
  }
};

const Display = (props) => {
return (
<div id="display">{props.display}
  </div>
)};
const DrumPads = (props) => {
  let soundBank;
  props.checkOn ?
    soundBank = props.audioClips :
    soundBank = "";
  
return (
<div id="drum-pad-container">
  <button id={soundBank.idQ} className="drum-pad" onClick={props.handleClick} >Q
    <audio id="Q" className="clip" src={soundBank.srcQ}/></button>
  
  <button id={soundBank.idW} className="drum-pad" onClick={props.handleClick}>W <audio id="W" className="clip" src={soundBank.srcW} /></button>
  
  <button id={soundBank.idE} className="drum-pad" onClick={props.handleClick}>E <audio id="E" className="clip" src={soundBank.srcE} /></button>
  
  <button id={soundBank.idA} className="drum-pad" onClick={props.handleClick}>A <audio id="A" className="clip" src={soundBank.srcA}/></button>
  
  <button id={soundBank.idS} className="drum-pad" onClick={props.handleClick}>S <audio id="S" className="clip" src={soundBank.srcS}/></button>
  
  <button id={soundBank.idD} className="drum-pad" onClick={props.handleClick}>D <audio id="D" className="clip" src={soundBank.srcD}/></button>
  
  <button id={soundBank.idZ} className="drum-pad" onClick={props.handleClick}>Z <audio id="Z" className="clip" src={soundBank.srcZ}/></button>
  
  <button id={soundBank.idX} className="drum-pad" onClick={props.handleClick}>X <audio id="X" className="clip" src={soundBank.srcX}/></button>
  
  <button id={soundBank.idC} className="drum-pad" onClick={props.handleClick}>C <audio id="C" className="clip" src={soundBank.srcC}/></button>
  </div>
)};
const mapStateToProps = (state) => {
  return {
    mode: state.mode.mode,
    on: state.on.on,
    display: state.display.display
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeModeButton: function () { 
      dispatch(changeMode())},
    changeOnOffButton: function() {
      dispatch(onOffSwitch())},
    changeDisplay: function(display) {
      dispatch(updateDisplay(display))}
  };
};
const Provider = ReactRedux.Provider;
const Connect = ReactRedux.connect
const Container = Connect(mapStateToProps, mapDispatchToProps)(App);
class AppWrapper extends React.Component {
  render() {
    return (
    <Provider store={store}>
        <Container/>
        </Provider>)
  }
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<AppWrapper/>)
