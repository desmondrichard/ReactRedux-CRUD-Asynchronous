import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {addTaskToServer } from './slices/tasksSlice';
import { useDispatch } from 'react-redux';
//used to get and set input from user in form:
function AddTask() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    //To prevent form from refreshing after clicking submit btn:
    const addTask = (e) => {
        e.preventDefault();
        console.log({ title, desc })//fetches what we entered in title,desc fields
        dispatch(addTaskToServer({ title, desc }))
        setTitle("");
        setDesc("");
    }

    
    
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="title2">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control type="title" placeholder="enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description2">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control type="desc" placeholder="enter task description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                </Form.Group>
                <div className="text-end">
                    <Button variant="outline-primary" size="lg" onClick={(e) => addTask(e)}>
                        Add Task
                    </Button>
                </div>

            </Form>
        </div>
    )
}

export default AddTask