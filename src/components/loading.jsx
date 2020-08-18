import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader'


class Loading extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    // componentDidMount(){
    //     console.log(PuffLoader)
    //     const load = document.getElementById("loader")
    //     if(this.state.load){
    //         const timer = setTimeout(() => {
    //             this.setState({load: false})
    //         }, 3500);
    //     }
        
    // }

    render(){
        return(
            <div>
                <PuffLoader color='rgba(255,255,255)' loading={this.props.load}/>
            </div>
        );
    }
}

export default Loading