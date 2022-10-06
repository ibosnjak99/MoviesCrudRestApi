import React, {Component} from "react";
import { variables } from "./Variables";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export class Movies extends Component {

    constructor(props) {
        super(props);

        this.state={
            movies:[],
            modalTitle:"",
            id:0,
            name:"",
            genre:"",
            releaseYear:"",
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

    notifyError = () => {
        toast.error('Something went wrong');
    }

    refreshList(){
        fetch(variables.API_URL + 'movies')
        .then(response => response.json())
        .then(data => {
            this.setState({movies:data});
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

    changeGenre = (e) => {
        this.setState({genre: e.target.value});
    }

    changeReleaseYear = (e) => {
        this.setState({releaseYear: e.target.value});
    }

    addClick = () => {
        this.setState({
            modalTitle:"Add movie",
            id: 0,
            name: "",
            genre: "",
            releaseYear: 0,
        })
    }

    editClick = (mov) => {
        this.setState({
            modalTitle:"Edit movie",
            id: mov.id,
            name: mov.name,
            genre: mov.genre,
            releaseYear: mov.releaseYear
        })
    }

    createClick(){
        fetch(variables.API_URL + 'movies', {
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
        .then(res=>res.json())
        .then((result)=>{
            this.notifyAddSuccess();
            this.refreshList();
        },(error)=>{
            this.notifyError();
        })
    }

    updateClick(){
        fetch(variables.API_URL + 'movies', {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                genre: this.state.genre,
                releaseYear: `${this.state.releaseYear}`,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            this.notifyUpdateSuccess();
            this.refreshList();
        },(error)=>{
            this.notifyError();
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'movies/'+ id, {
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.notifyDeleteSuccess();
            this.refreshList();
        },(error)=>{
            this.notifyError();
        })
        }
    }

    render() {
        const {
            movies,
            modalTitle,
            id,
            name,
            genre,
            releaseYear
        } = this.state;

        return(
            <div>
                <div class="header">
                    <div class="header-right">
                        <a href="/administration">Administration</a>
                        <a class="active" href="/movies">Movies</a>
                        <a class="logoutbtn" href="/">Log out</a>
                    </div>
                </div>
                <ToastContainer position='bottom-right' />
                <br/>
                <h2>Movies</h2>
                <br/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th width="25%">
                                Name
                            </th>
                            <th width="25%">
                                Genre
                            </th>
                            <th width="25%">
                                Release year
                            </th>
                            <th width="25%">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(mov =>
                            <tr key={mov.id}>
                                <td>{mov.name}</td>
                                <td>{mov.genre}</td>
                                <td>{mov.releaseYear}</td>
                                <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        style={{marginRight: 1 + 'em'}}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(mov)}
                                        >
                                            Edit
                                    </button>
                                    <button type="button" 
                                        className="btn btn-danger"
                                        onClick={() => {this.deleteClick(mov.id)}}
                                        >
                                            Delete
                                    </button>
                                    </td>
                            </tr>)}
                    </tbody>
                </table>
                <br/>
                <button type="button"
                    className="btn btn-primary m-3 float-left"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                        Add Movie
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
                                onChange={this.changeName} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Genre</span>
                                <select name="Genre" id="genre"
                                value={genre}
                                onChange={this.changeGenre} >
                                <option value="Action">Action</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Horror">Horror</option>
                                <option value="Western">Western</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="SF">SF</option>
                                <option value="Crime">Crime</option>
                                <option value="Romance">Romance</option>
                                <option value="Adventure">Adventure</option>
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Release Year</span>
                                <input type="number" className="form-control"
                                value={releaseYear}
                                onChange={this.changeReleaseYear} />
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