import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup
    .object()
    .shape({
        taskName: yup.string().required('Name is required'), taskDuration: yup.string().required('Duration is required'), status: yup.string().required('Status is required'),
        priority: yup.string().required('Priority is required')
    })
    .required();

const Home = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(
        {
            resolver: yupResolver(schema),
        }
    );

    const [taskName, setTaskName] = useState('');
    const [taskDuration, setTaskDuration] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');

    const navigate = useNavigate();
    const storedData = JSON.parse(localStorage.getItem('taskData'))



    const submit = (data) => {


        const obj = {
            taskName: data.taskName,
            taskDuration: data.taskDuration,
            status: data.status,
            priority: data.priority
        }
        let tempData = ''
        if (storedData == null) {
            tempData = [obj]
        }
        else {
            tempData = [...storedData, obj]
        }
        localStorage.setItem('taskData', JSON.stringify(tempData));
        // Toastify code -------
        toast.success('Task Added Successfully ..!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        setTimeout(() => {
            navigate('/tasks')
        }, 2000);

        };

        return (
            <div className='row'>
                <div className="col-sm-5 mx-auto my-border-02 rounded-4">
                    <h1 className="text-center mt-5 text-color-01">Add Your Tasks</h1>
                    <hr className='custom-hr' />
                    <form className='p-4' onSubmit={handleSubmit((data) => submit(data))}>
                        <div className="form-group">
                            <label htmlFor="task">Task :</label>
                            <input
                                type="text"
                                {...register('taskName')}
                                className="form-control mb-2"
                                id="task"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                            {errors.taskName && <p className='text-danger'>{errors.taskName.message}</p>}
                            <label htmlFor="duration">Duration :</label>
                            <input
                                type="text"
                                {...register('taskDuration')}
                                className="form-control mb-2"
                                id="duration"
                                value={taskDuration}
                                onChange={(e) => setTaskDuration(e.target.value)}
                            />
                            {errors.taskDuration && <p className='text-danger'>{errors.taskDuration.message}</p>}
                            <label>Priority:</label><br />
                            <input
                                type="radio"
                                {...register('priority')}
                                className='mx-3'
                                value="High"
                                checked={priority === 'High'}
                                onChange={(e) => setPriority(e.target.value)}
                            /> High
                            <input
                                type="radio"
                                {...register('priority')}
                                className='mx-3'
                                value="Medium"
                                checked={priority === 'Medium'}
                                onChange={(e) => setPriority(e.target.value)}
                            /> Medium
                            <input
                                type="radio"
                                {...register('priority')}
                                className='mx-3'
                                value="Low"
                                checked={priority === 'Low'}
                                onChange={(e) => setPriority(e.target.value)}
                            /> Low
                            <br />
                            {errors.priority && <p className='text-danger'>{errors.priority.message}</p>}
                            <label>Status:</label><br />
                            <input
                                type="radio"
                                {...register('status')}
                                value="Pending"
                                className='mx-3'
                                checked={status === 'Pending'}
                                onChange={(e) => setStatus(e.target.value)}
                            /> Pending
                            <input
                                type="radio"
                                {...register('status')}
                                value="In Progress"
                                className='mx-3'
                                checked={status === 'In Progress'}
                                onChange={(e) => setStatus(e.target.value)}
                            /> In Progress
                            <input
                                type="radio"
                                {...register('status')}
                                value="Completed"
                                className='mx-3'
                                checked={status === 'Completed'}
                                onChange={(e) => setStatus(e.target.value)}
                            /> Completed
                            <br />
                            {errors.status && <p className='text-danger'>{errors.status.message}</p>}

                            <input
                                type="submit"
                                className='btn bg-color-01 d-block mx-auto my-4'
                                value='Add Task'
                            />


                        </div>
                    </form>
                </div>
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
            </div>
        );
    };

    export default Home;
