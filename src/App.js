import React from 'react';
import ReactDOM from "react-dom"
import Loading from './components/loading'
import Register from './components/register'
import Login from './components/login'
import Lobby from './components/lobby'
import NewTask from './components/newtask'
import EditTask from './components/edittask'
import Dashboard from './components/dashboard'


import './css/styles.css'
import './App.css';

class App extends React.Component{
  constructor(){
    super()
    this.state ={
      showReg: false,
      showLog: true,
      showLobby: false,
      load: true,
      user: '',
      tasks: '',
      editTask: {}
    };
    this.showChart = this.showChart.bind(this)
  }

  componentDidMount(){
    const load = document.getElementById("loader")
    if(this.state.load){
      const timer = setTimeout(() => {
          load.classList.add("invi")
          this.setState({load: !this.state.load})
      }, 3500);
    }
  }  
  
  
  loadSpinner = (e,time) => {
    const loader = document.getElementById("loader")
    this.setState({load: e})
    loader.classList.remove("invi")
      const timer = setTimeout(() => {
          loader.classList.add("invi")
          this.setState({load: !this.state.load})
      }, time);
  }

  tasks = (task) =>{
    this.setState({tasks: task})
  }

  editTask = (task) =>{
    this.setState({editTask: task})
  }
  userData = (usuario) => {
    this.setState({user: {
      email: usuario.email,
      id: usuario._id,
      name: usuario.name,
      lastname: usuario.lastname
    }})
  }

  showChart = (e) =>{
    switch (e){
      case "reg":
        this.setState({showReg : !this.state.showReg})
        this.setState({showLog : !this.state.showLog})
      break; 
      case "log":
        this.setState({showReg : !this.state.showReg})
        this.setState({showLog : !this.state.showLog})
      break;

    }
  }

    render(){
      return (
        <div className="App main-bg h-100">
          <div id="loader" className="flex flex-center h-100">
            <Loading load={this.state.load}/>
          </div>

          <div id="userCard" className="invi flex flex-center h-100">
            <div  className="login-card shadow ">
              <div className="login-card-content">
                <Register Show={this.state.showReg} showChart={this.showChart} />
                <Login Show={this.state.showLog} showChart={this.showChart} loadSpinner={this.loadSpinner} userData={this.userData} tasks={this.tasks}/>
              </div>
            </div>
          </div>
          

          <div id="lobby" className="invi flex flex-center h-100">
            <Lobby userData={this.state.user} loadSpinner={this.loadSpinner}/>
          </div>

          <div id="newTask" className="invi flex flex-center h-100">
            <NewTask userData={this.state.user} loadSpinner={this.loadSpinner} tasks={this.tasks}/>
          </div>

          <div id="editTask" className="invi flex flex-center h-100">
            <EditTask userData={this.state.user} loadSpinner={this.loadSpinner} tasks={this.tasks} editTask={this.state.editTask}/>
          </div>
          
          <div id="dashboard" className="h-100 invi">
          <Dashboard userData={this.state.user} loadSpinner={this.loadSpinner} task={this.state.tasks} editTask={this.editTask}/>
          </div>
      </div>


      );
    }
}




export default App;
