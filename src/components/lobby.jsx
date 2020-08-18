import React from 'react'

class Lobby extends React.Component{
    constructor(props){
        super(props)

        this.state ={

        }
    }

    
    newTask = () => {
        this.props.loadSpinner(true,1000)
        const taskChart = document.getElementById("newTask")
        const lobby = document.getElementById("lobby")
        lobby.classList.add("invi")
        const timer = setTimeout(() => {
            taskChart.classList.remove("invi")
        }, 1500)
    }

    openDashboard = () =>{
        this.props.loadSpinner(true,1000)
        const dashboard = document.getElementById("dashboard")
        const lobby = document.getElementById("lobby")
        lobby.classList.add("invi")
        const timer = setTimeout(() => {
            dashboard.classList.remove("invi")
        }, 1500)
    }
    
    render(){
        return(
            <div>
                <h1 className="white">Hi {this.props.userData.name}!</h1>
                <br></br>
                <button onClick={this.newTask} className="add-btn shadow dark-green">New task</button>
                <br></br>
                <br></br>
                <a onClick={this.openDashboard} className="white">Dashboard</a>
            </div>
        );
    }
}

export default Lobby
