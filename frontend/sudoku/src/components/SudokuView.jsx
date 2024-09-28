import React, { useEffect, useState } from "react";

const dumpData = [
    [
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 3, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 4, 0],
        [{}, 2, 0],
        [{}, 0, 0],
    ],
    [
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 6, 0],
        [{}, 7, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 5, 0],
        [{}, 0, 0],
        [{}, 0, 0],
    ],
    [
        [{}, 9, 0],
        [{}, 1, 0],
        [{}, 5, 0],
        [{}, 4, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 6, 0],
        [{}, 3, 0],
        [{}, 0, 0],
    ],
    [
        [{}, 0, 0],
        [{}, 2, 0],
        [{}, 7, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 9, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 5, 0],
    ],
    [
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 8, 0],
        [{}, 5, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 6, 0],
    ],
    [
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 8, 0],
        [{}, 6, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 1, 0],
        [{}, 0, 0],
        [{}, 0, 0],
    ],
    [
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 7, 0],
        [{}, 8, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 0, 0],
    ],
    [
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 5, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 0, 0],
    ],
    [
        [{}, 1, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 0, 0],
        [{}, 4, 0],
        [{}, 0, 0],
        [{}, 9, 0],
        [{}, 0, 0],
        [{}, 0, 0],
    ],
];
const borderHorizontalAtEveryThirdRow = (iX) => {
    if (iX === 0) return " ";
    return iX % 3 === 0 ? " border-t-2 border-black " : " ";
};
const borderVerticalAtEveryThirdColumn = (iY) => {
    if (iY === 0) return " ";
    return iY % 3 === 0 ? " border-l-2 border-black " : " ";
};
function checkSudoku({ data, setData, status, setStatus }) {
    checkRows({ data, setData });
    checkColumn({ data, setData });
    checkBoxes({ data, setData });
    setStatus(!status);
}
function checkRows({ data, setData }) {
    let isRowsValis = true;
    //iterate over all rows horizontal (X -)
    for (let iX = 0; iX < 9; iX++) {
        //get all numbers in the column
        const numbers = [];
        for (let iY = 0; iY < 9; iY++) {
            //reset fail status
            data[iX][iY][0].failRow = false;
            const cell = data[iX][iY];
            cell[1] != 0 && numbers.push(cell[1]);
            cell[2] != 0 && numbers.push(cell[2]);
        }
        //get a set of all numbers with no duplicates
        const uniqueNumbers = [...new Set(numbers)];
        //get duplicates from numbers and uniqueNumbers
        const duplicates = [
            ...new Set(
                numbers.filter(
                    (el) => numbers.indexOf(el) !== numbers.lastIndexOf(el)
                )
            ),
        ];
        //set fail status to cells with duplicates in this row
        duplicates.length > 0 &&
            duplicates.forEach((d) => {
                for (let iY = 0; iY < 9; iY++) {
                    const cell = data[iX][iY];
                    (d == cell[1] || d == cell[2]) && (cell[0].failRow = true);
                }
            });

        //console.log("numbers", numbers, "uniqueNumbers", uniqueNumbers);
        if (uniqueNumbers.length < numbers.length) {
            console.log("row", iX, "is not valid");
            isRowsValis = false;
        }
    }
    return isRowsValis;
}
function checkColumn({ data, setData }) {
    let isColumnsValid = true;
    //iterate over all columns vertical (Y |)
    for (let iY = 0; iY < 9; iY++) {
        //get all numbers in the column
        const numbers = [];
        for (let iX = 0; iX < 9; iX++) {
            //reset fail status
            data[iX][iY][0].failColumn = false;
            const cell = data[iX][iY];
            cell[1] != 0 && numbers.push(cell[1]);
            cell[2] != 0 && numbers.push(cell[2]);
        }
        //get a set of all numbers with no duplicates
        const uniqueNumbers = [...new Set(numbers)];
        //get duplicates from numbers and uniqueNumbers
        const duplicates = [
            ...new Set(
                numbers.filter(
                    (el) => numbers.indexOf(el) !== numbers.lastIndexOf(el)
                )
            ),
        ];
        //set fail status to cells with duplicates in this row
        duplicates.length > 0 &&
            duplicates.forEach((d) => {
                for (let iX = 0; iX < 9; iX++) {
                    const cell = data[iX][iY];
                    (d == cell[1] || d == cell[2]) &&
                        (cell[0].failColumn = true);
                }
            });
        //console.log("numbers", numbers, "uniqueNumbers", uniqueNumbers);
        if (uniqueNumbers.length < numbers.length) {
            console.log("column", iY, "is not valid");
            isColumnsValid = false;
        }
    }
    return isColumnsValid;
}
function checkBoxes({ data, setData }) {
    let isBoxesValid = true;
    for (let iX = 0; iX < 3; iX++) {
        for (let iY = 0; iY < 3; iY++) {
            //reset fail status

            const numbers = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const cell = data[iX * 3 + i][iY * 3 + j];
                    cell[0].failBox = false;
                    cell[1] != 0 && numbers.push(cell[1]);
                    cell[2] != 0 && numbers.push(cell[2]);
                }
            }
            const duplicates = [
                ...new Set(
                    numbers.filter(
                        (el) => numbers.indexOf(el) !== numbers.lastIndexOf(el)
                    )
                ),
            ];
            //set fail status to cells with duplicates in this row
            duplicates.length > 0 &&
                duplicates.forEach((d) => {
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            const cell = data[iX * 3 + i][iY * 3 + j];
                            (d == cell[1] || d == cell[2]) &&
                                (cell[0].failBox = true);
                        }
                    }
                });
            const uniqueNumbers = [...new Set(numbers)];
            if (uniqueNumbers.length < numbers.length) {
                console.log("box", iX, iY, "is not valid");
                isBoxesValid = false;
            }
        }
    }
    return isBoxesValid;
}
function SudokuView() {
    const [data, setData] = useState(dumpData);
    const [selectedCell, setSelectedCell] = useState(null);
    const [showSelfHelping, setShowSelfHelping] = useState(false);
    const [status, setStatus] = useState(true);
    useEffect(() => {
        //selectedCell && console.log("selectedCell", selectedCell);
        //data && console.log("data", data);
        checkSudoku({ data, setData, status, setStatus });
    }, [data, selectedCell]);
    return (
        <>
            <div className=" text-2xl border-2 border-black select-none self-center m-2">
                {data?.map((row, iX) => {
                    return (
                        <div key={iX} className="flex justify-between w-72 ">
                            {row?.map((cell, iY) => {
                                return (
                                    <SudokuCell
                                        key={iX + iY}
                                        idxY={iY}
                                        idxX={iX}
                                        data={data}
                                        setData={setData}
                                        selectedCell={selectedCell}
                                        setSelectedCell={setSelectedCell}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <SudokuFieldMenu
                data={data}
                setData={setData}
                selectedCell={selectedCell}
            />
        </>
    );
}
function SudokuCell({
    idxX,
    idxY,
    data,
    setData,
    selectedCell,
    setSelectedCell,
}) {
    useEffect(() => {
        setText(data[idxX][idxY]);
    }, [data]);
    const [text, setText] = useState(data[idxX][idxY]);
    return (
        <div
            onClick={() => {
                text[1] == 0 && setSelectedCell({ y: idxY, x: idxX });
            }}
            className={
                "w-8 h-8 flex items-center justify-center border border-black cursor-pointer " +
                borderVerticalAtEveryThirdColumn(idxY) +
                borderHorizontalAtEveryThirdRow(idxX) +
                (selectedCell?.y === idxY && selectedCell?.x === idxX
                    ? " bg-orange-200 "
                    : " hover:bg-gray-200 ")
            }
            type="text"
        >
            {text[1] != 0 && (
                <span
                    className={
                        "flex items-center justify-center h-full w-full bg-gray-400 font-extrabold " +
                        ((text[0].failRow ||
                            text[0].failColumn ||
                            text[0].failBox) &&
                            " text-red-500 ")
                    }
                >
                    {text[1]}
                </span>
            )}
            {text[1] == 0 && text[2] != 0 ? (
                <span
                    className={
                        "flex items-center justify-center h-full w-full font-cookie font-extrabold " +
                        ((text[0].failRow ||
                            text[0].failColumn ||
                            text[0].failBox) &&
                            " text-red-500 ")
                    }
                >
                    {text[2]}
                </span>
            ) : null}
        </div>
    );
}

function SudokuFieldMenu({ data, setData, selectedCell }) {
    function handleNumberClick(number) {
        if (selectedCell) {
            const newData = data.map((row, iX) => {
                return row.map((cell, iY) => {
                    if (selectedCell.y === iY && selectedCell.x === iX) {
                        return number === cell[2]
                            ? [cell[0], 0, 0, ...cell.slice(3)]
                            : [cell[0], 0, number, ...cell.slice(3)];
                    }
                    return cell;
                });
            });
            setData(newData);
        }
    }
    return (
        <div className="border-2 border-black select-none self-center m-2">
            <div className="flex justify-between w-72 ">
                <div
                    onClick={() => handleNumberClick(1)}
                    className="w-8 h-8 flex items-center justify-center border
                    border-black cursor-pointer hover:bg-gray-200 "
                    type="text"
                >
                    {" "}
                    1
                </div>
                <div
                    onClick={() => handleNumberClick(2)}
                    className="w-8 h-8 flex items-center justify-center border border-black cursor-pointer hover:bg-gray-200 "
                    type="text"
                >
                    2
                </div>
                <div
                    onClick={() => handleNumberClick(3)}
                    className="w-8 h-8 flex items-center justify-center border border-black cursor-pointer hover:bg-gray-200 "
                    type="text"
                >
                    3
                </div>
                <div
                    onClick={() => handleNumberClick(4)}
                    className="w-8 h-8 flex items-center justify-center border border-black cursor-pointer hover:bg-gray-200  border-l-2 "
                    type="text"
                >
                    4
                </div>
                <div
                    onClick={() => handleNumberClick(5)}
                    className="w-8 h-8 flex items-center justify-center border border-black cursor-pointer hover:bg-gray-200 "
                    type="text"
                >
                    5
                </div>
                <div
                    onClick={() => handleNumberClick(6)}
                    className="w-8 h-8 flex items-center justify-center border border-black cursor-pointer hover:bg-gray-200 "
                    type="text"
                >
                    6
                </div>
                <div
                    onClick={() => handleNumberClick(7)}
                    className="w-8 h-8 flex items-center justify-center border border-black cursor-pointer hover:bg-gray-200  border-l-2 "
                    type="text"
                >
                    7
                </div>
                <div
                    onClick={() => handleNumberClick(8)}
                    className="w-8 h-8 flex items-center justify-center border border-black cursor-pointer hover:bg-gray-200 "
                    type="text"
                >
                    8
                </div>
                <div
                    onClick={() => handleNumberClick(9)}
                    className="w-8 h-8 flex items-center justify-center border border-black cursor-pointer hover:bg-gray-200 "
                    type="text"
                >
                    9
                </div>
            </div>
        </div>
    );
}

export default SudokuView;
