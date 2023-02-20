import React, { useState } from "react";

const Form = ({ addTodo }) => {

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;  
        addTodo({ title: inputValue, completed: false, id: inputValue }); //add id = inputValue to filter in app.jsx for delete values.
        setInputValue("");
    };

    return (

        <form className="ui form" onSubmit={handleFormSubmit}>
            <div className="ui grid center aligned">
                <div className="row">
                    <div className="input-add">
                        <input
                            value={inputValue}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Enter something to do..."
                        />
                    </div>
                    <div className="form-add-button">
                        <button type="submit" className="ui button circular icon green"><i className="white plus icon"></i>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );

};

export default Form;