import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { //can also be called as state:
    tasksList: [],
    selectedTask: {},
    isLoading: false,
    error: ''
}

const Base_Url = "http://localhost:8000/tasks"
//GET:
export const getTasksFromServer = createAsyncThunk(  //creating Async thunk 
    "tasks/getTasksFromServer", //Async thunk has type string and callback fn
    async (_, { rejectWithValue }) => {   //callback fn has arguments,thunk api but in GET method there is no arguments
        const response = await fetch(Base_Url)//using fetch we fetch URL for api call
        if (response.ok) {        //if we get response from api we convert it to json format
            const jsonResponse = await response.json();
            return jsonResponse
        } else {
            return rejectWithValue({ error: "Task not added" }) //else send error msg by calling rejectWithValue fn
        }
    }
)

//POST:
export const addTaskToServer = createAsyncThunk(
    "tasks/addTaskToServer",
    async (task, { rejectWithValue }) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-type': 'application/json;charset=UTF-8'
            }

        }
        const response = await fetch(Base_Url,options)
        if (response.ok) {        //if we get response from api we convert it to json format
            const jsonResponse = await response.json();
            return jsonResponse
        } else {
            return rejectWithValue({ error: "Task not added" }) //else  send error msg by calling rejectWithValue fn
        }
    }

)

//PATCH:
export const updateTaskInServer = createAsyncThunk(
    "tasks/updateTaskInServer",
    async (task, { rejectWithValue }) => {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers: {
                'Content-type': 'application/json;charset=UTF-8'
            }

        }
        const response = await fetch(Base_Url+'/'+task.id,options)
        if (response.ok) {        //if we get response from api we convert it to json format
            const jsonResponse = await response.json();
            return jsonResponse
        } else {
            return rejectWithValue({ error: "Task not updated" }) //else  send error msg by calling rejectWithValue fn
        }
    }

)

//Delete
    export const deleteTaskFromServer=createAsyncThunk(
        "tasks/deleteTaskFromServer",
        async(task,{rejectWithValue})=>{
            const options={method:'DELETE'}
            const response=await fetch(Base_Url+'/'+task.id,options)
            if(response.ok){
                const jsonResponse=await response.json()
                return jsonResponse
            }else{
                return rejectWithValue({error:'Task not deleted'})
            }
        }
    )



const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {
        // addTaskToList: (state, action) => {
        //     const id = parseInt(Math.random() * 100);
        //     let task = { ...action.payload, id }
        //     state.tasksList.push(task) //pushed title,desc,id

        // },

        removeTaskFromList: (state, action) => { //used filter to filter out the specific id
            state.tasksList = state.tasksList.filter((task) => task.id !== action.payload.id)// if we use === it will filter all matching id's which is useless
        },

        // updateTaskInList: (state, action) => {
        //     state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
        // },

        setselectedTask: (state, action) => {
            state.selectedTask = action.payload
        }
    },
    //lifecycle operations:
    extraReducers: (builder) => {  //to use lifecycle methods we used builder
        builder
            //get
            .addCase(getTasksFromServer.pending, (state) => { //running state
                state.isLoading = true
            })
            .addCase(getTasksFromServer.fulfilled, (state, action) => { //success state
                state.isLoading = false
                state.error = ""
                state.tasksList = action.payload
            })
            .addCase(getTasksFromServer.rejected, (state, action) => {  //failed state
                state.error = action.payload.error
                state.isLoading = false
                state.tasksList = []
            })

            //post
            .addCase(addTaskToServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addTaskToServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ""
                state.tasksList.push(action.payload) //adding data to be updated and created
            })
            .addCase(addTaskToServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false

            })
            //Patch
            .addCase(updateTaskInServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTaskInServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ""
                state.tasksList.map((task)=>task.id===action.payload.id?action.payload:task)
            })
            .addCase(updateTaskInServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false

            })
            //delete
            .addCase(deleteTaskFromServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ""
               
            })
            .addCase(deleteTaskFromServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false

            })

    }


}
)

export const { addTaskToList, removeTaskFromList, updateTaskInList, setselectedTask } = tasksSlice.actions;
export default tasksSlice.reducer