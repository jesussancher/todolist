import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditTask extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            startDate: "",
            taskContent: "",
            message: '',
        }
    }

    setStartDate = (date) => {
        this.setState({
          startDate: date
        });
        console.log(date)
    };

    timePicker = () => {
        

        // const [startDate, setStartDate] = useState(new Date());
        const DateInput = ({ value, onClick }) => (
            <button onClick={onClick} placeholder="Tomorrow" required>
            </button>
          );
        return (
          <DatePicker
            selected={this.state.startDate}
            onChange={date => this.setStartDate(date)}
            inline
            customInput={<DateInput />}
            showDisabledMonthNavigation
            minDate={new Date()}
            isClearable
          />
        );
    };

    
    handleChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name] : event.target.value,
        });  
    }

    addTask = id => {
        const url = "https://academlo-todolist.herokuapp.com/tasks/"+id;

        fetch(url, {
        method: 'PUT', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: this.props.userData.id,
            content: this.state.taskContent,
            date: this.state.startDate,
          })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data)
            this.setState({message: data.message})
            this.registerSuccess()
            this.getTasks()
            console.log(this.props.userData.id)
            alert(data.message)
        })
        .catch((error) => {
        console.error('Error:', error);
        })
    }

    getTasks() {
        // event.preventDefault();
        const url = "/tasks";
        fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            this.props.tasks(data.results)

        })
        .catch((error) => {
        console.error('Error:', error);
        this.setState({register: false})
        })
    }

    registerSuccess = () => {
        const newTask = document.getElementById("newTask")
        
        if(this.state.message == "La tarea se ha agregado correctamente en el sistema"){
            toast.success("Yes! Let's do it!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                const taskContent = document.getElementById("taskContent")
                taskContent.value = ""
                this.openDashoard()
                
        } else if(this.state.message == "Hubo un error al agregar la tarea en el sistema"){
            toast.error("Try again! :(", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        }

    closeTask = () =>{
        this.props.loadSpinner(true,1000)
        const editTask = document.getElementById("editTask")
        const dashboard = document.getElementById("dashboard")
        editTask.classList.add("invi")
        const timer = setTimeout(() => {
            dashboard.classList.remove("invi")
        }, 1500)
    }

    openDashoard = () =>{
        this.props.loadSpinner(true,1000)
        const newTask = document.getElementById("newTask")
        const dashboard = document.getElementById("dashboard")
        newTask.classList.add("invi")
        const timer = setTimeout(() => {
            dashboard.classList.remove("invi")
        }, 1500)
    }

    event = (e) => {
        e.preventDefault()
    }
    render(){
        return(
            <div className="login-card shadow">
                <a onClick={this.closeTask} className="back relative dark-green"><i class="fas fa-arrow-left"></i></a>
                <form onSubmit={this.event}>
                    <h3 className="dark-green">When?</h3>
                    {this.timePicker()}
                    <br></br>
                    <h3 className="dark-green">What?</h3>
                    <input onChange={this.handleChange} type="content" id="taskContent" name="taskContent" className="input" placeholder={this.props.editTask.content} required></input>
                    <br></br>
                    <input type="submit" onClick={() => this.addTask(this.props.editTask._id)} className="mt-20 submit-btn" value="Edit Task"></input>
                </form>
                <p></p>
            </div>
        );
    }
}

export default EditTask