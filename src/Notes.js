import React, {Component} from 'react'
import {Button, Table} from 'react-bootstrap'
import Note from "./Note";
import {confirmAlert} from "react-confirm-alert";

class Notes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            noteList: [
                {
                    title: "Praca",
                    category: "Work",
                    content: "8-16 ",
                    date: '',
                    time: '',
                    status: undefined
                },
                {
                    title: "Praca domowa",
                    category: "TO DO",
                    content: "zad 1 2 3",
                    date: '',
                    time: '',
                    status: undefined
                }
            ],
            title: '',
            category: '',
            time: undefined,
            date: undefined
        }
    }

    onClick() {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div>
                        <h1>Add Content to note</h1>
                        <p>
                            <textarea cols={"50"} rows={"10"} id={"content"} defaultValue={this.state.content}
                                      onChange={(e) => this.onChange(e)}/>
                        </p>
                        <Button style={{float:"right"}} variant={"danger"} onClick={onClose}>Close Window</Button>
                    </div>
                )
            }
        })
    }
    addNote() {
        this.setState(state => {
            let notes = state.noteList
            let date = state.date === undefined ? "" : new Date(state.date)
            let time = state.time === undefined ? "" : state.time
            if (state.category === "TO DO"){
                notes.push({
                    title: state.title,
                    category: state.category,
                    content: state.content,
                    date: date,
                    time: time,
                    status: false

                })
            } else {
                notes.push({
                    title: state.title,
                    category: state.category,
                    content: state.content,
                    date: date,
                    time: time,
                    status: undefined

                })
            }
            return {noteList: notes}
        }, [])
    }
    onChange(e) {
        let name = e.target.id
        this.setState({
            [name]: e.target.value
        })
    }

    render () {
        return (
            <div>
                <h1>List of Notes</h1>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Content</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.noteList.map((v, key) => {
                        return <Note
                            key={key}
                            title={v.title}
                            category={v.category}
                            content={v.content}
                            status={v.status}/>
                    })}
                    </tbody>
                </Table>
                <Table striped bordered>
                    <tbody>
                        <tr>
                            <td colSpan={5} style={{textAlign:"center"}}>Add New Tab</td>
                            <td>
                                <input type={"text"} placeholder={"Title of the note"} onChange={e => this.onChange(e)}/>
                                <input type={"text"} list={"categoryList"} id={"category"} placeholder={"Category of Note"}
                                       onChange={(e) => this.onChange(e)}/>
                                <datalist id={"categoryList"}>
                                    <option>TO DO</option>
                                    <option>Hobby</option>
                                    <option>Sport</option>
                                    <option>Science</option>
                                    <option>Home Duties</option>
                                    <option>Work</option>
                                </datalist>
                            </td>
                            <td>
                                {
                                    this.state.content !== '' ?
                                        <Button variant={"primary"} onClick={() => this.onClick()}>Edit Content</Button> :
                                        <Button variant={"primary"} onClick={() => this.onClick()}>Add Content</Button>
                                }
                            </td>
                            <td>
                                <input type={"date"} id={"date"} onChange={(e) => this.onChange(e)}/>
                                <input type={"time"} id={"time"} onChange={(e) => this.onChange(e)}/>
                            </td>
                            <td>
                                <Button variant={"secondary"} onClick={() => this.addNote()}>
                                    Add note
                                </Button>
                            </td>
                        </tr>
                        <tr>


                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default Notes