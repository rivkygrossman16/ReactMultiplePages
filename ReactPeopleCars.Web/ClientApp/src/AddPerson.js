import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { Route, Link } from 'react-router-dom';

class AddPerson extends React.Component {

    state = {
        person: {
            firstName: '',
            lastName: '',
            age: '',
        }
    }


    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
        console.log(this.state.person);
    }

    onAddClick = async () => {
        //int.parse(this.state.person.age);
        await axios.post('/api/people/addperson', this.state.person);
        this.props.history.push('/');
    }


    render() {

        return (

            <div className="container">
                {/*<div style="min-height: 1000px padding-top: 300px">*/}
                <div className="row">
                    <div className="col-md-6 offset-md-3 card card-body bg-light">
                        <h2>Add a New Person</h2>
                        <input type="text" className="form-control" onChange={this.onTextChange} name="firstName" placeholder="First Name" />
                        <br />
                        <input type="text" className="form-control" onChange={this.onTextChange} name="lastName" placeholder="Last Name" />
                        <br />
                        <input type="text" className="form-control" onChange={this.onTextChange} name="age" placeholder="Age" />
                        <br />
                        <button onClick={this.onAddClick} className="btn btn-primary btn-block">Add Person</button>

                    </div>
                </div>
            </div>
            /*  </div>*/

        )
    }
}

export default AddPerson;