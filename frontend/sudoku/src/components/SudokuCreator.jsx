import React from "react";

let emptyBoards = [];

const emptyBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function SudokuCreator() {
    const [activeBoard, setActiveBoard] = React.useState(emptyBoard);
    return (
        <div className="flex justify-center">
            <div className="border-2 border-black grid grid-rows-9 h-96 w-96">
                {activeBoard.map((row, X) => {
                    return (
                        <div key={X} className="grid grid-cols-9">
                            {row.map((cell, Y) => {
                                return (
                                    <div
                                        key={X + Y}
                                        className={
                                            " border border-black flex justify-center items-center " +
                                            (X + 1 != 1 &&
                                                X % 3 === 0 &&
                                                " border-t-2 ") +
                                            (Y + 1 != 1 &&
                                                Y % 3 === 0 &&
                                                " border-l-2 ")
                                        }
                                    >
                                        {cell != 0 && cell}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SudokuCreator;
