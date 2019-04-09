import React from 'react';
import {Redirect} from 'react-router-dom';


export default (Child) =>{
    return class auth extends React.Component{
        constructor(props){
            super(props);
            this.PreventedRoute();
        }
        PreventedRoute=()=>{
            if(!localStorage.getItem('token')){
                this.props.history.push('./login')
            }
        }
        render(){
            if(localStorage.getItem('token')){
                return(<>
                <Child {...this.props}/>
                </>)
            }
            return <Redirect to='/login' />
        }
    }
}