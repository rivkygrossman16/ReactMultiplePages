import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { Route, Link } from 'react-router-dom';
import { render } from 'react-dom';


class AddCars extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: '',
            id: '',
        },
        car: {
            make: '',
            model: '',
            year: '',
            personId:'',
        }
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/people/getbyid?id=${id}`);
        this.setState({ person: data });
        //const { personId } = this.state.person;
        //this.setState({ personId: id });
    }


    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.car[e.target.name] = e.target.value;
        });
        this.setState(nextState);
        const { id } = this.props.match.params;
        const { car } = this.state;
        const { personId } = car;
        this.setState({ personId: id });
      
    }

    onAddClick = async () => {
        const { car } = this.state;
        const { make, model, year } = car;
        const { id } = this.props.match.params;
        await axios.post('/api/people/addcar', { make, model, year, personId: id });
        this.props.history.push('/');
    }

            render(){

                return (

                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 card card-body bg-light">
                                <h2>Add a car for {this.state.person.firstName} {this.state.person.lastName}</h2>
                                <input type="text" className="form-control" onChange={this.onTextChange} name="make" placeholder="Make" />
                                <br />
                                <input type="text" className="form-control" onChange={this.onTextChange} name="model" placeholder="Model" />
                                <br />
                                <input type="text" className="form-control" onChange={this.onTextChange} name="year" placeholder="Year" />
                                <br />
                                <button onClick={this.onAddClick} className="btn btn-primary btn-block">Add Car</button>

                            </div>
                        </div>
                    </div>
                )
            }
        }


export default AddCars;