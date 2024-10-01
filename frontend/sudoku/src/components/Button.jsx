import React from "react";

function Button({ text, onClick, active = false }) {
    return (
        <button
            className={
                "w-40  hover:bg-orange-300 font-bold py-2 px-4 rounded border border-2 border-orange-700" +
                (active ? " bg-orange-200 " : " bg-gray-200 ")
            }
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;
