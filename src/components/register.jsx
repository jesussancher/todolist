import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading'


class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            regName: '', 
            regLastname: '',
            regEmail : '',
            regPassword: '',
            register : true,
            message: '',
        };
    }

    registerUser = event => {
        event.preventDefault();
        const url = "https://academlo-todolist.herokuapp.com/tasks/register";

        fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: this.state.regName,
            lastname: this.state.regLastname,
            email: this.state.regEmail,
            password: this.state.regPassword,
            users: []
          })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data)
            this.setState({register: true})
            this.setState({message: data.message})
            this.registerSuccess()
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
    
    componentDidMount() {
        //Obtener los posts
        const card = document.getElementById("userCard")
        const timer = setTimeout(() => {
            card.classList.remove("invi")
          }, 4000)
    }

    // shouldComponentUpdate(nextProps){
    //     console.log('Nex State =>', nextProps)
    //     console.log('Current State =>', this.props)
    //     return true
    // }

    mountReg(){
        const reg = document.getElementById("registration")
        const log = document.getElementById("loggin")

        if(this.props.Show == true){
            reg.classList.remove("invi")
            log.classList.add("invi")
        } else {
            reg.classList.add("invi")
            log.classList.remove("invi")
        }
    }

    registerSuccess = () => {
        const reg = document.getElementById("registration")
        const log = document.getElementById("loggin")
        if (this.state.register){
                if(this.state.message == "El usuario ha sido registrado correctamente"){
                    toast.success("Welcome!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                          

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
                }
                const timer = setTimeout(() => {
                    const regEmail = document.getElementById("regEmail")
                    regEmail.value = '' 
                    const regPassword = document.getElementById("regPassword")
                    regPassword.value = ''
                    const regName = document.getElementById("regName")
                    regName.value = '' 
                    const regLastname = document.getElementById("regLastname")
                    regLastname.value = ''
                    reg.classList.add("invi")
                    log.classList.remove("invi")
                }, 2000);
                
        }else{
                toast.error('Oh! Try again :(', {
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
    
    

    render(){
        
        return(
           
           <div id="registration">
                {/* {this.mountReg} */}
                <h1 className="dark-green">Hi!</h1>
                <form onSubmit={this.registerUser}>
                    <h3 className="dark-green">Tell us about you</h3>
                    <input onChange={this.handleChange} id="regName" name="regName" className="input" placeholder="Name" required></input>
                    <input onChange={this.handleChange} id="regLastname" name="regLastname" className="input mt-20" placeholder="Lastname" required></input>
                    <br></br>
                    <h3 className="dark-green">A little more</h3>
                    <input onChange={this.handleChange} type="email" id="regEmail" name="regEmail" className="input" placeholder="Email" required></input>
                    <input onChange={this.handleChange} type="password" id="regPassword" name="regPassword" className="input mt-20" placeholder="Password" required></input>
                    <br></br>
                    <input type="submit" className="mt-20 submit-btn" value="Register"></input>
                    
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
                </form>
                <p className="light-green">Already a member? <a onClick={() => {this.mountReg(); this.props.showChart("reg")}} className="dark-green"><b>Log in</b></a></p>
            </div>
        );


    }
}

export default Register