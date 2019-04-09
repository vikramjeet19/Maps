import React, { Component } from 'react';
import './Form.css';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class Data extends Component {

    state = {
        username: '',
        password: '',

    }

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({
            username: '',
            password: ''
        })
        const url = 'https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/login';
        axios.post(url, {}, {
            auth: {
                username: this.state.username,
                password: this.state.password
            }
        }).then(resolve => {
            // console.log(resolve);
            localStorage.setItem('token', resolve.data.token);
            this.props.history.push('/dashboard');
        })
            .catch(err => console.log(err));
    }

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to="/dashboard" />
        }
        return (<div>
            <div className='block' >
                <form onSubmit={this.submitHandler}>
                    <label>Username</label>
                    <input className='a' type="text"
                        name="username"
                        value={this.state.email}
                        onChange={this.changeHandler}
                        placeholder='Enter Your username' />
                    <label>Password</label>
                    <input type="password"
                        className='a'
                        name="password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                        placeholder='Password' />
                    <button className='button'>submit</button>
                </form>
            </div>
        </div>)
    }
}

export default Data;