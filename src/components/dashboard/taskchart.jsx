import React from 'react'

class TaskChart extends React.Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return (
                <div className="flex flex-center">
                    <div className="task-chart">
                    <h3>What?</h3>
                    <p>{this.props.content}</p>
                    </div>
                </div>
                
        );
    }
}

export default TaskChart