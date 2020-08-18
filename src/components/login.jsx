import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Loading from './loading'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            logEmail : '',
            logPassword: '',
            logister : true,
            message: '',
            load: false,
        }
    }

    loginUser = event => {
        event.preventDefault();
        const url = "/login";

        fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.state.logEmail,
            password: this.state.logPassword,
          })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({message: data.message})
            this.props.userData(data.results)
            this.registerSuccess()
            this.getTasks()
        })
        .catch((error) => {
        console.error('Error:', error);
        this.setState({register: false})
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



    handleChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name] : event.target.value,
        });  
    }
    
    mountLog(){
        // console.log(this.props.Show)
        const reg = document.getElementById("registration")
        const log = document.getElementById("loggin")
        if(this.props.Show == true){
            reg.classList.add("invi")
            log.classList.remove("invi")
        } else {
            reg.classList.remove("invi")
            log.classList.add("invi")
        }
    }

    loadLobby(){
        this.props.loadSpinner(true,3000)
        const lobby = document.getElementById("lobby")
        const timer = setTimeout(() => {
            lobby.classList.remove("invi")
        }, 3500)
    }

    registerSuccess = () => {
                const card = document.getElementById("userCard")
                
                if(this.state.message == "Las credenciales son correctas"){
                    toast.success("Welcome back!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                        const timer = setTimeout(() => {
                        const logEmail = document.getElementById("logEmail")
                        logEmail.value = '' 
                        const logPassword = document.getElementById("logPassword")
                        logPassword.value = ''
                        this.setState({message: ''})
                        card.classList.add("invi")
                        this.props.showChart("lobby")
                        this.loadLobby()
                        }, 2500)
                        
                } else if(this.state.message == "El usuario ya está registrado en el sistema"){
                    toast.error("You are already part of the party! Try logging in", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                } else if(this.state.message == "Email o contraseña incorrectas"){
                    toast.error("Try again :(", {
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
        
    
    
    // obtenerUsuarios = () => {
    // fetch("https://academlo-todolist.herokuapp.com/users?page=11&limit=20")
    //     .then(response => response.json())
    //     .then(results => console.log(results))
    //     .catch(error => console.log(error));
    // }

    render(){
        
            
        return( 
                <div>
                    <div id="loggin" className="invi">
                    <h1 className="dark-green">Hey you :)</h1>
                    <form onSubmit={this.loginUser}>
                        <h3 className="dark-green">Log in</h3>
                        <input onChange={this.handleChange} type="email" id="logEmail" name="logEmail" className="input" placeholder="Email" required></input>
                        <input onChange={this.handleChange} type="password" id="logPassword" name="logPassword" className="input mt-20" placeholder="Password" required></input>
                        <br></br>
                        <input type="submit" className="mt-20 submit-btn" value="Log In"></input>
                        <ToastContainer 
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        />
                        <p className="light-green">Not a member yet? <a onClick={() => {this.props.showChart("log"); this.mountLog()}} className="dark-green"><b>Register</b></a></p>
                    </form>
                    </div>
                </div>
                
            
        );
    }
}

export default Login