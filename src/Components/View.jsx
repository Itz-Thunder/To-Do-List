import React, { useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    taskName: yup.string().required('Task name is required'),
    taskDuration: yup.string().required('Task duration is required'),
    status: yup.string().required('Status is required'),
    priority: yup.string().required('Priority is required')
}).required();

const View = () => {
    const [data, setData] = useState([]);
    const tempTask = JSON.parse(localStorage.getItem('taskData')) || [];
    const [show, setShow] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        setData(tempTask);
    }, []);

    const del = (id) => {
        const newData = tempTask.filter((item, index) => index !== id);
        localStorage.setItem('taskData', JSON.stringify(newData));
        setData(newData);
    };

    const handleClose = () => setShow(false);
    const handleShow = (index) => {
        setEditId(index);
        setShow(true);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (editId !== null) {
            const task = data[editId];
            setValue('taskName', task.taskName);
            setValue('taskDuration', task.taskDuration);
            setValue('status', task.status);
            setValue('priority', task.priority);
        }
    }, [editId, setValue]);

    const update = (updatedData) => {
        const newData = data.map((item, index) => 
            index === editId ? { ...updatedData } : item
        );
        localStorage.setItem('taskData', JSON.stringify(newData));
        setData(newData);
        toast.success('Data Updated Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        setShow(false);
    };

    return (
        <div className='row'>
            {
                data.map((item, index) => (
                    <div className="col-sm-2 mx-auto rounded my-border-01 my-3 p-2 text-center" key={index}>
                        <p className='text-start ps-2'>{index + 1} .</p>
                        <h3><b className='text-color-02'>Task :</b> {item.taskName}</h3>
                        <ul className='list ps-3 ms-3 text-start'>
                            <li> <b className='text-color-02'>Duration : </b>{item.taskDuration}</li>
                            <li><b className='text-color-02'>Status : </b>{item.status}</li>
                            <li><b className='text-color-02'>Priority : </b>{item.priority}</li>
                        </ul>

                        <button className='btn bg-color-02 mx-3' onClick={() => del(index)}><IoTrashOutline /></button>
                        <button className='btn bg-color-02 mx-3' onClick={() => handleShow(index)}><MdEdit /></button>
                    </div>
                ))
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit <span className='text-color-01'>Task Details</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(update)}>
                        <div className="form-group">
                            <label htmlFor="task">Task :</label>
                            <input
                                type="text"
                                {...register('taskName')}
                                className="form-control mb-2"
                                id="task"
                            />
                            {errors.taskName && <p className='text-danger'>{errors.taskName.message}</p>}
                            
                            <label htmlFor="duration">Duration :</label>
                            <input
                                type="text"
                                {...register('taskDuration')}
                                className="form-control mb-2"
                                id="duration"
                            />
                            {errors.taskDuration && <p className='text-danger'>{errors.taskDuration.message}</p>}
                            
                            <label>Priority:</label><br />
                            <input
                                type="radio"
                                {...register('priority')}
                                className='mx-3'
                                value="High"
                            /> High
                            <input
                                type="radio"
                                {...register('priority')}
                                className='mx-3'
                                value="Medium"
                            /> Medium
                            <input
                                type="radio"
                                {...register('priority')}
                                className='mx-3'
                                value="Low"
                            /> Low
                            <br />
                            {errors.priority && <p className='text-danger'>{errors.priority.message}</p>}
                            
                            <label>Status:</label><br />
                            <input
                                type="radio"
                                {...register('status')}
                                value="Pending"
                                className='mx-3'
                            /> Pending
                            <input
                                type="radio"
                                {...register('status')}
                                value="In Progress"
                                className='mx-3'
                            /> In Progress
                            <input
                                type="radio"
                                {...register('status')}
                                value="Completed"
                                className='mx-3'
                            /> Completed
                            <br />
                            {errors.status && <p className='text-danger'>{errors.status.message}</p>}

                            <input
                                type="submit"
                                className='btn bg-color-01  mx-5 my-4'
                                value='Update Task'
                            />
                            <Button className='btn bg-color-01 mx-5 my-4 border-0 text-black' onClick={handleClose}>
                        Close
                    </Button>   
                        </div>
                    </form>
                </Modal.Body>
                
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div >
    );
};

export default View;
