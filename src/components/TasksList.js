import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './UpdateTask';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskFromServer, getTasksFromServer, setselectedTask } from './slices/tasksSlice';
import { removeTaskFromList } from './slices/tasksSlice';
import {useEffect} from 'react';

function TasksList() {
    const { tasksList } = useSelector((state) => state.tasks)
    const dispatch = useDispatch();

    function updateTask(task) {
        console.log("Update");
        setModalShow(true); //on clicking update btn modal will open so made true and this line will make setModalShow from false to true
        dispatch(setselectedTask(task))
    }

    //To make api calls when screen is loading:
    useEffect(()=>{
        dispatch(getTasksFromServer())
    },[dispatch])


    function deleteTask(task) {
        console.log("delete");
        dispatch(deleteTaskFromServer(task))
        .unwrap()
        .then(()=>{
            dispatch(removeTaskFromList(task))
        })
    }
    const [modalShow, setModalShow] = useState("");
    return (
        <div className="my-4">
            <Table striped bordered hover>
                <thead className='table-dark'>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasksList && tasksList.map((task, index) => {
                        return (
                            <tr key={task.id}>
                                <td>{index + 1}</td>
                                <td>{task.title}</td>
                                <td>{task.desc}</td>
                                <td className="text-center"> <Button variant="primary" onClick={() => updateTask(task)} className="my-1"><i className="bi bi-pencil-square"></i></Button> <Button onClick={() => deleteTask(task)} variant="primary"><i className="bi bi-trash3-fill"></i></Button></td>
                            </tr>

                        )
                    })}

                </tbody>
            </Table>
            {/* onclicking button inside table only it need to show modal tab so called MyVerticallyCenteredModal here: */}
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}  /*on clicking close btn modal will close */
            />


        </div>
    )
}

export default TasksList