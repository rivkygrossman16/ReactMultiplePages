import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { Route, Link } from 'react-router-dom';
import PersonRow from './PersonRow';
import AddCars from './AddCars';

class HomePage extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: '',
            id: '',
            cars:[],
        }
    }


    componentDidMount = async () => {
        await this.refreshPeople();
    }

    refreshPeople = async () => {
        const response = await axios.get('/api/people/getall');
        const people = response.data;
        this.setState({ people });
    }

    generateBody = () => {
        const { people } = this.state;

        return people.map((p, i) => {
            return < PersonRow
                person={p}
                key={i}
            />
        });
    }



    render() {
        const { person } = this.state;
        const { firstName, lastName, age } = person;

        return(
        <div>
            <div className="row mt-5" />
            <div className="col-md-12" style={{ 'marginbottom': '20px' }}>
                <Link className="btn btn-success btn-lg btn-block" to='/AddPerson' >
                    <button className="btn btn-success">Add Person</button>
                </Link>

            </div>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Car Count</th>
                        <th>Add Car</th>
                        <th>Delete Cars</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateBody()}
                </tbody>
            </table>
            </div>
            )
    }
}

export default HomePage;