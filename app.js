import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'

let timer;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: 25,
      break: 5,
      seconds: 59,
      title: "session",
      initialsession: 25,
      initialbreak: 5,
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSub = this.handleSub.bind(this);
    this.reset = this.reset.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }
  
  handleAdd(title) {
    if(this.state[title] < 60) {
      this.setState(state => ({
        [title]: state.[title]+1,
        ["initial"+title]: state[title]
      }));
    }
  }
  
  handleSub(title) {
    if(this.state[title] > 1) {
      this.setState(state => ({
        [title]: state.[title]-1,
        ["initial"+title]: state[title]
      }));
    }
  }
  
  reset() {
    this.setState({
      session: 25,
      break: 5,
    })
  }
  
  handleStart() {
    timer = setInterval(() => {
      if(this.state[this.state.title] > 0) {
        if(this.state.seconds !== 0) {
          this.setState(state => ({
            seconds: state.seconds-1
          }))
        }
        else {
          this.setState({
            seconds: 59,
            [this.state.title]: this.state[this.state.title]-1
          })
        }
      }
      else {
        this.setState({
          [this.state.title]: this.state["initial"+this.state.title]
        })
        this.state.title === "session" ? this.setState({title: "break"}) : this.setState({title: "session"})
      }
    }, 1000)
  }
  
  handleStop() {
    clearInterval(timer);
  }
  
  render() {
    return (
      <div id="clock">
        <h1 id="header">25 + 5 clock</h1>
        <div id="counters">
          <Counter title={"session"} length={this.state.session} handleAdd={this.handleAdd} handleSub={this.handleSub} />
          <Counter title={"break"} length={this.state.break} handleAdd={this.handleAdd} handleSub={this.handleSub} />
        </div>
        <div id="display">
          <Display title={this.state.title} session={this.state.session} break={this.state.break} seconds={this.state.seconds}/>
        </div>
        <div id="ctrlbtns">
          <button type="button" onClick={this.handleStart}>start</button>
          <button type="button" onClick={this.handleStop}>stop</button>
          <button type="button" onClick={this.reset}>reset</button>
        </div>
      </div>
    )
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>{this.props.title} length</h2>
        <button type="button" onClick={() => this.props.handleAdd(this.props.title)}>Add</button><span>{this.props.length}</span><button type="button" onClick={() => this.props.handleSub(this.props.title)}>sub</button>
      </div>
    )
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <h2>{this.props.title}</h2>
        <h1>{this.props[this.props.title]}:{this.props.seconds}</h1>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("home"))