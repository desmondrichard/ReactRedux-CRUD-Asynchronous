import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateTaskInServer } from './slices/tasksSlice';

function MyVerticallyCenteredModal(props) {
    const {selectedTask}=useSelector((state)=>state.tasks);
    const[title,setTitle]=useState("");
    const[desc,setDesc]=useState("");
    const [id,setId]=useState(0);
    const dispatch=useDispatch();

    const UpdateTask=()=>{
        props.onHide(); //to make it close on cliking UpdateTask btn
        dispatch(updateTaskInServer({id,title,desc}))
    }

    useEffect(()=>{
        if(Object.keys(selectedTask).length!==0){
            setTitle(selectedTask.title);
            setDesc(selectedTask.desc);
            setId(selectedTask.id);
        }
    },[selectedTask])
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="title1">
                            <Form.Label>Task Title</Form.Label>
                            <Form.Control type="title" placeholder="enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description1">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control type="desc" placeholder="enter task description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                
                    <div className="text-end">
                        <Button variant="primary" size="lg" onClick={(e) => UpdateTask(e)}>
                            Update Task
                        </Button>
                    </div>
                    
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MyVerticallyCenteredModal