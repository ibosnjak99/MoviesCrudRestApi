import React, {Component} from "react";
import { variables } from "./Variables";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";

export class Genres extends Component {

    constructor(props) {
        super(props);

        this.state={
            genres:[],
            modalTitle:"",
            id:0,
            name:"",
        }
    }

    notifyAddSuccess = () => {
        toast.success('Successfully added');
    }

    notifyUpdateSuccess = () => {
        toast.success('Successfully updated');
    }

    notifyDeleteSuccess = () => {
        toast.success('Successfully deleted');
    }

    notifyError = (errorMessage) => {
        toast.error(errorMessage);
    }

    refreshList(){
        fetch(variables.API_URL + 'genres')
        .then(response => response.json())
        .then(data => {
            this.setState({genres:data});
        })
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        toast.error('Something went wrong');
      }

    componentDidMount = () => {
        this.refreshList();
    }

    changeName = (e) => {
        this.setState({name: e.target.value});
    }

    addClick = () => {
        this.setState({
            modalTitle:"Add genre",
            id: 0,
            name: "",
        })
    }

    editClick = (genre) => {
        this.setState({
            modalTitle:"Edit genre",
            id: genre.id,
            name: genre.name,
        })
    }

    createClick(){
        const cookies = new Cookies();
        const role = cookies.get('role');

        fetch(variables.API_URL + 'genres?role=' + role, {
            method:'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name: this.state.name,
                genre: this.state.genre,
                releaseYear: this.state.releaseYear,
            })
        })
        .then((result)=>{
            if(result.ok) {
                this.notifyAddSuccess();
                this.refreshList();
            } else {
                this.notifyError('Function error');
            }
        }).catch((error)=>{
            this.notifyError(error);
        })
    }

    updateClick(id){
        const cookies = new Cookies();
        const role = cookies.get('role')

        fetch(variables.API_URL+'genres/'+ id + '?role=' + role, {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: this.state.id,
                name: this.state.name,
            })
        })
        .then((result)=>{
            if(result.ok) {
                this.notifyUpdateSuccess();
                this.refreshList();
            }
            else {
                this.notifyError('Function error');
            }
        }).catch((error)=>{
            this.notifyError(error);
        })
    }

    deleteClick(id){
        const cookies = new Cookies();
        const role = cookies.get('role')

        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'genres/'+ id + '?role=' + role, {
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then((result)=>{
            if(result.ok) {
                this.notifyDeleteSuccess();
                this.refreshList();
            }
            else {
                this.notifyError('Function error');
            }
        }).catch((error)=>{
            this.notifyError(error);
        })
        }
    }

    logout () {
        let cookies = new Cookies();
        cookies.remove("id");
        cookies.remove("username");
        cookies.remove("role");
    }

    render() {
        const {
            genres,
            modalTitle,
            id,
            name,
        } = this.state;

        return(
            <div>
                <div class="header">
                    <div class="header-right">
                        <a href="/administration">Administration</a>
                        <a href="/movies">Movies</a>
                        <a class="active" href="/genres">Genres</a>
                        <a onClick={this.logout} class="logoutbtn" href="/">Log out</a>
                    </div>
                </div>
                <ToastContainer position='bottom-right' hideProgressBar />
                <br/>
                <h2>Genres</h2>
                <br/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th  width="33%">
                                Name
                            </th>
                            <th width="33%">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres.map(genre =>
                            <tr key={genre.id}>
                                <td>{genre.name}</td>
                                <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        style={{marginRight: 1 + 'em'}}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(genre)}
                                        >
                                            Edit
                                    </button>
                                    <button type="button" 
                                        className="btn btn-danger"
                                        onClick={() => {this.deleteClick(genre.id)}}
                                        >
                                            Delete
                                    </button>
                                    </td>
                            </tr>)}
                    </tbody>
                </table>
                <button type="button"
                    className="btn btn-primary m-3 float-left"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                        Add Genre
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Name</span>
                                <input type="text" className="form-control"
                                value={name}
                                onChange={this.changeName} 
                                required/>
                            </div>

                                {id === 0 ?
                                    <button type="button"
                                    className="btn btn-primary float-end"
                                    onClick={() => this.createClick()}
                                    >
                                        Create
                                    </button>    
                                : null}

                                {id !== 0 ?
                                    <button type="button"
                                    className="btn btn-primary float-end"
                                    onClick={() => this.updateClick()}
                                    >
                                        Update
                                    </button>    
                                : null}
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}