import React from 'react'
import TaskChart from './taskchart'
import { useState } from 'react'

class Done extends React.Component{
    constructor(props){
        super(props)

        this.state ={
            tasks: []
        }
        
    }

    componentDidMount(){
        this.getTasks()
    }
    componentWillUpdate(nextProps,nextState){
        this.getTasks()
        if(nextState != this.state && nextProps != this.props){
            return true
        }
    }

    getTasks() {
        // event.preventDefault();
        const url = "https://academlo-todolist.herokuapp.com/tasks";
        fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            this.setState({tasks: data.results})
            this.showTasks(data.results)
        })
        .catch((error) => {
        console.error('Error:', error);
        this.setState({register: false})
        })
    }


    showTasks = (cards) => {
        let year = ''
        let month = ''
        let day = ''
        const onclick = "onClick"
        const tareas = cards.map((task, index) =>{
            year = task.date.substr(2,2)
            day = task.date.substr(8,2)
            switch(task.date.substr(5,2)){
                case '01':
                    month = 'JAN'
                break; 
                case '02':
                    month = 'FEB'
                break; 
                case '03':
                    month = 'MAR'
                break; 
                case '04':
                    month = 'APR'
                break; 
                case '05':
                    month = 'MAY'
                break; 
                case '06':
                    month = 'JUN'
                break; 
                case '07':
                    month = 'JUL'
                break; 
                case '08':
                    month = 'AUG'
                break;
                case '09':
                    month = 'SEP'
                break;
                case '10':
                    month = 'OCT'
                break;
                case '11':
                    month = 'NOV'
                break;    
                case '12':
                    month = 'DEC'
                break; 
            }
            return month
        })

    }

    deleteTask = id => {
        // event.preventDefault();
        const url = "https://academlo-todolist.herokuapp.com/tasks/"+id;
        fetch(url, {
        method: 'DELETE', // or 'PUT'
        })
        .then(res => res.json())
        .then(res => {
            // alert(res.message);
            console.log(res.message);
        })
      .catch(error => console.log(error));
    }

    editarTask = () => {
        // this.props.loadSpinner(true,1000)
        const taskChart = document.getElementById("editTask")
        const dashboard = document.getElementById("dashboard")
        dashboard.classList.add("invi")
        const timer = setTimeout(() => {
            taskChart.classList.remove("invi")
        }, 1500)
    }

    
    render(){
        return (
            <div grid className="grid grid-dashboard-columns">
                <div></div>
                <div id="" className="todoList center grid grid-task-list">
                    {this.state.tasks.map((task, index) =>{
                        let year = ''
                        let month = ''
                        let day = ''
                        year = task.date.substr(2,2)
                        day = task.date.substr(8,2)
                        switch(task.date.substr(5,2)){
                            case '01':
                                month = 'JAN'
                            break; 
                            case '02':
                                month = 'FEB'
                            break; 
                            case '03':
                                month = 'MAR'
                            break; 
                            case '04':
                                month = 'APR'
                            break; 
                            case '05':
                                month = 'MAY'
                            break; 
                            case '06':
                                month = 'JUN'
                            break; 
                            case '07':
                                month = 'JUL'
                            break; 
                            case '08':
                                month = 'AUG'
                            break;
                            case '09':
                                month = 'SEP'
                            break;
                            case '10':
                                month = 'OCT'
                            break;
                            case '11':
                                month = 'NOV'
                            break;    
                            case '12':
                                month = 'DEC'
                            break; 
                        }
                        return(
                            <div id={index} className="task-chart dark-green">
                                <a onClick={() => this.deleteTask(task._id)} className="relative edit-delete delete"><i class="fas fa-trash-alt"></i></a>
                                <a onClick={this.editarTask} className="relative edit-delete"><i onClick={() => this.props.editTask(task)} class="fas fa-edit"></i></a>
                                    <div className="">
                                        <div class="">
                                            <h3>What?</h3>
                                            <p>{task.content}</p>
                                        </div>
                                        <div className="">
                                            <div className="grid grid-task-counter flex flex-center">
                                                    <h3>When?</h3>
                                                    <p className="date">{day}/{month}/{year}</p>
                                            </div>
                                            <div className="flex flex-center">
                                                    <a className="submit-btn" onClick={() => this.deleteTask(task._id)}>Done!</a>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                        )
                    })}
                </div>
                <div></div> 
            </div>        
        );
    }
        
}

export default Done
