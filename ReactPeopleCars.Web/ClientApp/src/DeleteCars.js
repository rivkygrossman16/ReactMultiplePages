import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import CarsRow from './CarsRow';


class DeleteCars extends React.Component {

    state = {
        cars: [],
        //},
        //car: {
        //    make: '',
        //    model: '',
        //    year: '',
        //    personId: '',
        //}
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/people/getcarsbyid?id=${id}`);
        this.setState({ cars: data });
    }

    generateBody = () => {
        const { cars } = this.state;

        return cars.map((p, i) => {
            return < CarsRow
                car={p}
                key={i}
            />
        });
    }

    onDeleteClick = async () => {
        const { id } = this.props.match.params;

        await axios.post('/api/people/deletecars', { id });
        this.props.history.push('/');
    }

    render() {

        return (

            <div className="container">
                    <div className="row">
                        <div className="col-md-10">
                            <input type="text" className="form-control form-control-lg" placeholder="Search People" value=""/>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-info btn-lg btn-block">Clear</button>
                            </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <table className="table table-hover table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Make</th>
                                        <th>Model</th>
                                        <th>Year</th>
                                    </tr>
                                </thead>
                            <tbody>
                                {this.generateBody()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Are you sure you want to delete all of these cars?</h3>
                        </div>
                        <div className="col-md-6">
                            <Link to='/'>
                                <button className="btn btn-primary">No</button>                </Link>
                        <br />
                        <button onClick={this.onDeleteClick} className="btn btn-danger">Yes</button>
                       
                    </div>
                </div>
                </div>

        )
    }
}


export default DeleteCars;