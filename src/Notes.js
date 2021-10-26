import React, {Component} from 'react'
import {Button, Table} from 'react-bootstrap'
import Note from "./Note";
import {confirmAlert} from "react-confirm-alert";
import AddNote from "./AddNote";
import NoteClass from "./NoteClass";
import EditForm from "./Forms/EditForm";
import DetailForm from "./Forms/DetailForm";
import DeleteForm from "./Forms/DeleteNote";

class Notes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            noteList: [
                new NoteClass(1, "przewoz gruzu", "praca", "od 6 do 16", "", null, ""),
                new NoteClass(2, "przewoz gruzu", "praca", "od 6 do 16", "", null, ""),
                new NoteClass(3, "przewoz gruzu", "praca", "od 6 do 16", "", "2021-11-11", "6:00")
            ],
        }
        this.showDetailForm = this.showDetailForm.bind(this)
        this.showEditForm = this.showEditForm.bind(this)
        this.showDeleteForm = this.showDeleteForm.bind(this)
        this.showChangeStatusForm = this.showChangeStatusForm.bind(this)
        this.showRemindForm = this.showRemindForm.bind(this)
        this.addNote = this.addNote.bind(this)
        this.editNote = this.editNote.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
        this.changeNoteStatus = this.changeNoteStatus.bind(this)
        this.remindNote = this.remindNote.bind(this)
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
    addNote(s) {
        this.setState(state => {
            //even if function will be trigered many times returned state will be the same
            if (state.noteList.filter(e => e.title === state.title).length > 0) return;

            let notes = state.noteList
            let id = state.noteList.length + 1
            let date = s.date === undefined ? null : s.date
            let time = s.time === undefined ? null : s.time
            let status = ""
            if (status.category === "To do")
                status = false
            else
                status = undefined

            let newNote = new NoteClass(id, s.title, s.category, s.content, status, date, time)
            notes.push(newNote)
            return {noteList: notes}
        })
    }


    editNote(index, s) {
        this.setState(state => {
            let notes = state.noteList

            notes[index].title = s.editTitle
            notes[index].category = s.editCategory
            notes[index].content = s.editContent

            return {noteList: notes}
        })
        this.createNotification('Note was edited successfully')
    }

    deleteNote(index) {
        this.setState(state => {
            let notes = state.noteList
            notes.splice(index, 1)
            return {noteList: notes}
        })
    }

    changeNoteStatus(index) {
        this.setState(state => {
            let notes = state.noteList
            notes[index].status = !notes[index].status
        })
    }

    remindNote(index, date, time) {
        this.setState(state => {
            let notes = state.noteList
            notes[index].date = date
            notes[index].time = time
            return {noteList: notes}
        })
    }

    filter(content) {
        return content.length > 25 ? content.substring(0, 25) + "..." : content
    }

    onChange(e) {
        let name = e.target.id
        this.setState({
            [name]: e.target.value
        })
    }

    showDetailForm(id){
        const { notelist } = this.state;
        // let index = notelist.findIndex((value) => value.id === id)
        let index = notelist.findIndex(function(value) {
            return value.id === id
        })
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <DetailForm
                        notelist={notelist}
                        index={index}
                        onClose={onClose}
                    />
                )
            }
        })
    }

    showEditForm(id){
        const {noteList} = this.state
        let index = noteList.findIndex(function(value) {
            return value.id === id
        })

        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div>
                        <EditForm noteList={noteList}
                                  index={index}
                                  onClose={onClose}
                                  editNote={this.editNote}
                        />
                        <NotificationContainer/>
                    </div>

                )
            }
        })
    }

    showDeleteForm(id){
        const { noteList } = this.state;
        // let index = notelist.findIndex((value) => value.id === id)
        let index = noteList.findIndex(function(value) {
            return value.id === id
        })
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <DeleteForm
                        index={index}
                        onClose={onClose}
                        deleteNote={this.deleteNote}
                    />
                )
            }
        })
    }

    showChangeStatusForm(id) {
        const { noteList } = this.state;
        // let index = notelist.findIndex((value) => value.id === id)
        let index = noteList.findIndex(function(value) {
            return value.id === id
        })
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <ChangeNoteStatusForm
                        notelist={noteList}
                        index={index}
                        onClose={onClose}
                        changeNoteStatus={this.changeNoteStatus}
                        status={noteList[index].status}
                    />
                )
            }
        })
    }

    showRemindForm(id) {
        const { noteList } = this.state;
        // let index = notelist.findIndex((value) => value.id === id)
        let index = noteList.findIndex(function(value) {
            return value.id === id
        })
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div>
                        <RemindForm
                            notelist={noteList}
                            index={index}
                            onClose={onClose}
                            remindNote={this.remindNote}
                        />
                        <NotificationContainer/>
                    </div>
                )
            }
        })
    }


    createNotification(noteWasEditedSuccessfully) {

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
                                     title={v.title}
                                     status={v.status}
                                     category={v.category}
                                     content={this.filter(v.content)}
                                     date={v.date}
                                     time={v.time}
                                     showDetailForm={this.showDetailForm}
                                     showEditForm={this.showEditForm}
                                     showDeleteForm={this.showDeleteForm}
                                     showChangeStatusForm={this.showChangeStatusForm}
                                     showRemindForm={this.showRemindForm}
                        />

                    })}
                    </tbody>
                </Table>
                <AddNote addNote={this.addNote}></AddNote>
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
                                <Button variant={"secondary"} onClick={(e) => this.addNote(e)}>
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