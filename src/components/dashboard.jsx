import React from 'react'
import TaskChart from './dashboard/taskchart'
import ToDo from './dashboard/todo'

class Dashboard extends React.Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    componentWillUpdate(nextProps,nextState){
        // this.getTasks()
        if(nextState != this.state && nextProps != this.props){
            return true
        }
    }

    newTask = () => {
        this.props.loadSpinner(true,1000)
        const taskChart = document.getElementById("newTask")
        const dashboard = document.getElementById("dashboard")
        dashboard.classList.add("invi")
        const timer = setTimeout(() => {
            taskChart.classList.remove("invi")
        }, 1500)
    }

    

    render(){
        return(
            <div className="grid grid-dash relative h-100">
                <div className="flex flex-center">
                    <div className="profile grid grid-profile w-100">
                        <div></div>
                        <div className="grid grid-user-info flex flex-center">
                            <span onClick={this.newTask} className="add-task dark-green flex flex-center tooltip"><i class="fas fa-plus"></i><span class="tooltiptext shadow">Add Task</span></span>
                            {/* <span className="box sb1 dark-green grid flex flex-center grid-task-counter"><i class="fas fa-tasks"></i>{this.props.task.length}</span> */}
                            <div className="flex flex-start">   
                                <h3 className="white">{this.props.userData.name}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="">
                        <div></div>
                        <div className="grid grid-dashboard"> 
                            <div className="flex flex-center"><h3 className="white">To do</h3></div>
                            <ToDo userData={this.props.userData} tasks={this.props.task}/>
                        </div>
                        {/* <div className="grid grid-dashboard"> 
                            <div className="flex flex-center"><h3 className="white">Doing</h3></div>
                            <TaskChart />
                        </div>
                        <div className="grid grid-dashboard"> 
                            <div className="flex flex-center"><h3 className="white">Done</h3></div>
                            <TaskChart />
                        </div> */}
                        <div></div>
                    </div>
            </div>
        );
    }
}

export default Dashboard