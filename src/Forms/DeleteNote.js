import React, {Component} from "react";
import * as Icon from 'react-bootstrap-icons'
import {Button} from "react-bootstrap";


const DeleteForm = (props) => {
    const {index, onClose, deleteNote} = props
    return (
        <div className={"alertForm"}>
            <span className={"closeButton"}>
                <Icon.XCircleFill color={"dimgray"} size={18} onClick={() => onClose()}/>
            </span>
            <div className={"importantInfoInAlert"}>
                <Icon.Info size={60} color={"blue"}/>
                Are you sure you want to delete this note?

            </div>
            <div className={"noteDeleteButtons"}>
                <Button variant={"primary"} onClick{() => onClose()}>No</Button>
                <Button variant={"danger"} style={{marginLeft:"10px"}} onClick{() => {
                    deleteNote(index)
                    onClose()
                }}>No</Button>

            </div>
        </div>
    )
}

export default DeleteForm