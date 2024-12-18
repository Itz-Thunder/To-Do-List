import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='row mb-5'>
            <div className="col-sm-12">
                <nav className="navbar navbar-expand-lg bg-color-02">
                    <div className="container-fluid">
                        <a className="navbar-brand fw-bolder " href='/'>
                            <img src="https://icons.iconarchive.com/icons/gartoon-team/gartoon-apps/512/gtodo-todo-list-icon.png" alt="Logo" width="30" height="30" className="d-inline-block align-text-top mx-4" />
                            To-Do List
                        </a>
                        <button className="navbar-toggler fw-bold  " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto me-5 pe-5">
                                <li className="nav-item">
                                    <Link className="nav-link active me-5 pe-5 fw-bold" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link me-5 pe-5 fw-bold" to="/tasks">Tasks</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar