import React, { Component } from 'react';
import axios from 'axios';
import 'rc-pagination/assets/index.css';
import MapContainer from './Map/Map';

import { Container, ListGroup, ListGroupItem, Col, Row } from 'react-bootstrap'
// import List from './List/List';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
let prev = 0;
let last = 0;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            listItems: [],
            currentPage: 1,
            todosPerPage: 10,
            isShow:false,
            // arr: [],
            pinLoc: [],
            pinLoc2:[[36.703,-122.42893],[3.77703,-122.4293],[37.9703,-122.8093]]
            
        };
    }
    componentDidMount() {
        let storageToken = localStorage.getItem('token');
        axios.get('https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/devices',
            { 'headers': { 'Authorization': 'Bearer ' + storageToken } })
            .then(resolve => {
                this.setState({ todos: resolve.data.result });
                console.log(resolve);
            })
            .catch(err => console.log(err));
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handleLastClick(event) {
        event.preventDefault();
        this.setState({
            currentPage: last
        });
    }
    handleFirstClick(event) {
        event.preventDefault();
        this.setState({
            currentPage: 1
        });
    }
    clickHandler = async (deviceRequest) => {
        this.setState({isShow:false})
        console.log(deviceRequest);
        let page = 1;
        const promiseArray = [];
        let storageToken = localStorage.getItem('token');
        try {
            for (page; page <= 50; page++) {


                promiseArray.push(axios.get('https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest', {
                    params: {
                        device: deviceRequest, page
                    },
                    'headers': { 'Authorization': 'Bearer ' + storageToken }
                }));
            }
            const data = await Promise.all(promiseArray);
            // console.log({ data });
            const maps = data.map(el => {
                const temp = el.data.result.map(loc => loc.gps);
                return temp;
            });
            let mapsUpgraded = maps.flat()
            this.setState({ pinLoc: mapsUpgraded,isShow:true })

        } catch (e) {
            console.log(e);
        }
    }
   

    render() {
        this.handleClick = this.handleClick.bind(this);
        this.handleLastClick = this.handleLastClick.bind(this);
        this.handleFirstClick = this.handleFirstClick.bind(this);
        let { todos, currentPage, todosPerPage } = this.state;
        // Logic for displaying current todos
        let next = 0;
        let indexOfLastTodo = currentPage * todosPerPage;
        let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        let currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
        prev = currentPage > 0 ? (currentPage - 1) : 0;
        last = Math.ceil(todos.length / todosPerPage);
        next = (last === currentPage) ? currentPage : currentPage + 1;
        // Logic for displaying page numbers
        let pageNumbers = [];
        for (let i = 1; i <= last; i++) {
            pageNumbers.push(i);
        }
        return (
            
            <div>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <ListGroup>
                                {
                                    currentTodos.map((todo, index) => {
                                        return <ListGroupItem key={index}>
                                            <input type="checkbox"
                                                onClick={() => this.clickHandler(todo.device) } />
                                            {todo.device}</ListGroupItem>
                                    })
                                }
                            </ListGroup>
                        </Col>


                        <Col xs={12} md={8}>
                        {this.state.isShow?(
                            <MapContainer                                
                            totalData={this.state.pinLoc}
                            totalData1={this.state.pinLoc2}
                        />
                        ):<h1>No Data yet !! <br/> 
                            select any device
                        </h1>}
                            
                        </Col>


                    </Row>
                </Container>
                <ul id="page-numbers">
                    <nav>
                        <Pagination>
                            <PaginationItem>
                                {prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
                                    <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
                                }
                            </PaginationItem>
                            <PaginationItem>
                                {prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                                    <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
                                }
                            </PaginationItem>
                            {
                                pageNumbers.map((number, i) =>
                                    <Pagination key={i}>
                                        <PaginationItem active={pageNumbers[currentPage - 1] === (number) ? true : false} >
                                            <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                                                {number}
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                )}

                            <PaginationItem>
                                {
                                    currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                                        <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
                                }
                            </PaginationItem>

                            <PaginationItem>
                                {
                                    currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
                                        <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
                                }
                            </PaginationItem>
                        </Pagination>
                    </nav>
                </ul>
            </div>)
    }
}
export default Main;