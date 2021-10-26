import React, {Component} from "react";
import * as Icon from 'react-bootstrap-icons'
import {Button} from "react-bootstrap";

export default class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editTitle: props.noteList[props.index].title ,
            editCategory: props.noteList[props.index].editCategory,
            editContent: props.noteList[props.index].content
        }
    }

    onChange(e) {
        let name = e.target.id
        this.setState({
            [name]: e.target.value
        })
    }

    render () {
        const {index, noteList, onClose, editNote} = this.props
        return (
            <div className={"alertForm"}>
                <span>
                    <Icon.XCircleFill color={"dimgray"} size={18} onClick={() => onClose}/>
                </span>
                <div className={"noteTitleEdit"}>
                    <label>Title</label>
                    <input type={"text"} id={"editTitle"} defaultValue={noteList[index].title}
                           style={{border:'none'}} onChange={(e) => this.onChange(e)}/>
                </div>
                <div className={"noteCategoryEdit"}>
                    <label>Category</label>
                    <input type={"text"} id={"editCategory"} defaultValue={noteList[index].category}
                           style={}{{border:'none'}} onChange={(e) => this.onChange(e)}/>
                    <datalist id={"categoryList"}>
                        <option>TO DO</option>
                        <option>Hobby</option>
                        <option>Sport</option>
                        <option>Science</option>
                        <option>Home Duties</option>
                        <option>Work</option>
                    </datalist>

                </div>
                <div className={"noteContentEdit"}>
                    <label>Content</label>
                    <input type={"text"} id={"editContent"} defaultValue={noteList[index].content}
                           style={}{{border:'none'}} onChange={(e) => this.onChange(e)}/>

                </div>
                <div className={"noteEditButton"}>
                    <Button variant={"primary"} onClick={() => editNote(index, this.state)}>Save</Button>
                </div>
            </div>

        )
    }


}