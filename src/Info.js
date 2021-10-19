import React from "react";

const Info = props => {
    return (
        <div>
            <p>{props.nick}</p>
            <p>{props.selectedLanguage}</p>
            <p>{props.country}</p>
        </div>
    )
}

export default Info