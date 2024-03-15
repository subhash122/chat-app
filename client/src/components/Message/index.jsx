import React from 'react'
import "./index.css";


const Message = ({ username, message, classs }) => {
    if (username) {
        return (
            <div className={`messageBox ${classs}`}  >
                {`${username}: ${message}`}
            </div>
        )
    }
    else {
        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export { Message }