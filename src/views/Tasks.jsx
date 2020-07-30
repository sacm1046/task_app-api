import React, { useEffect, useState } from 'react'
import FormGroup from '../components/FormGroup'
import TableRow from '../components/TableRow'

const Tasks = () => {
    //Array para visualizar en la tabla
    const [tasks, setTasks] = useState([])
    //Variables del formulario
    const [id, setId] = useState(null)
    const [user, setUser] = useState("")
    const [content, setContent] = useState("")
    //Manejo de mesajes desde el servidor
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    //Modo crear=true, modo editar=false
    const [mode, setMode] = useState(true)

    const getTask = async () => {
        const res = await fetch('http://programacionweb.pythonanywhere.com/posts');
        const data = await res.json();
        setTasks(data)
    }
    //Función para crear tarea
    const postTask = async (e) => {
        e.preventDefault()
        const res = await fetch(`http://programacionweb.pythonanywhere.com/posts`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                user: user
            })
        })
        const data = await res.json()
        if (data.error) {
            setError(data.error)
        } else {
            console.log(data)
            setSuccess(data.success)
            getTask()
            resetForm()
        }
    }
    //Función para actualizar tareas
    const putTask = async (e) => {
        e.preventDefault()
        const res = await fetch(`http://programacionweb.pythonanywhere.com/post/${id}`, {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content
            })
        })
        const data = await res.json()
        if (data.error) {
            setError(data.error)
        } else {
            console.log(data)
            setSuccess(data.success)
            getTask()
            cancel()
        }
    }
    //Función para eliminar tareas
    const deleteTask = async (id) => {
        const res = await fetch(`http://programacionweb.pythonanywhere.com/post/${id}`, {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json'
            },
        })
        const data = await res.json()
        if (data.error) {
            setError(data.error)
        } else {
            setSuccess(data.success)
            getTask()
        }
    }
    //Función para asignar los valores por defecto a su respectiva variable
    const setForm = (user, content, id) => {
        setMode(false)
        setUser(user)
        setContent(content)
        setId(id)
    }
    //Función para limpiar el formulario
    const resetForm = () => {
        setUser("")
        setContent("")
        setId(null)
    }
    //Función para cancelar la edición de una tarea
    const cancel = () => {
        setMode(true)
        resetForm()
    }

    useEffect(() => {
        getTask()
    }, [])

    useEffect(() => {
        setTimeout(()=>{
            setError("")
            setSuccess("")
        },1500)
    }, [success, error])

    return (
        <div className="container mt-2 mt-md-5">
            {
                success && 
                <div className="message message_success" role="alert">
                    { success }
                </div>
            }
            {
                error && 
                <div className="message message_error" role="alert">
                    { error }
                </div>
            }
            <div className="row">
                {/* Formulario de creación y edición de tareas a*/}
                <div className="col-12 col-md-4">
                    <h1>{mode ? "Crear de tarea" : "Editar tarea"}</h1>
                    <form onSubmit={mode ? e => postTask(e) : e => putTask(e)}>
                        {
                            mode && <FormGroup
                                id="inputUser"
                                value={user}
                                label="Usuario"
                                change={e => setUser(e.target.value)}
                            />
                        }
                        <FormGroup
                            id="inputContenido"
                            value={content}
                            label="Contenido"
                            change={e => setContent(e.target.value)}
                        />
                        <button type="submit" className={`btn ${mode ? "btn-primary" : "btn-success"}`}>
                            {mode ? "Agregar" : "Editar"}
                        </button>
                        {
                            !mode &&
                            <button
                                type="button"
                                onClick={() => cancel()}
                                className="btn btn-danger ml-3">
                                Cancelar
                            </button>
                        }
                    </form>


                </div>
                {/* Tabla de tareas */}
                <div className="col-12 col-md-8 mt-5 mt-md-0">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Usuarios</th>
                                <th scope="col">Contenido</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.length > 0 &&
                                tasks.map((task, i) => (
                                    < TableRow
                                        key={i}
                                        id={task.id}
                                        user={task.user}
                                        content={task.content}
                                        edit={() => setForm(task.user, task.content, task.id)}
                                        del={() => deleteTask(task.id)}
                                        mode={mode}
                                        modeEdit={id === task.id ? true : false}
                                    />
                                ))

                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Tasks;
