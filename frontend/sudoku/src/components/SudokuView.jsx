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
    setHelperReset(data);
    checkRows({ data, setData });
    checkColumn({ data, setData });
    checkBoxes({ data, setData });
    setStatus(!status);
}
function setHelperReset(data) {
    data.forEach((row) => {
        row.forEach((cell) => {
            cell[0].nohelper = [];
        });
    });
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
        setRowsHelper(data[iX], uniqueNumbers);
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
            isRowsValis = false;
        }
    }
    return isRowsValis;
}
function setRowsHelper(row, uniqueNumbers) {
    row.forEach((cell) => {
        cell[0].nohelper = [
            ...new Set([...cell[0].nohelper, ...uniqueNumbers]),
        ];
    });
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
        setColumnsHelper(
            data.map((row) => row[iY]),
            uniqueNumbers
        );
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
            isColumnsValid = false;
        }
    }
    return isColumnsValid;
}
function setColumnsHelper(column, uniqueNumbers) {
    column.forEach((cell) => {
        cell[0].nohelper = [
            ...new Set([...cell[0].nohelper, ...uniqueNumbers]),
        ];
    });
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
            setBoxesHelper(
                data
                    .slice(iX * 3, iX * 3 + 3)
                    .map((row) => row.slice(iY * 3, iY * 3 + 3))
                    .flat(),
                [...new Set(numbers)]
            );
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
                isBoxesValid = false;
            }
        }
    }
    return isBoxesValid;
}
function setBoxesHelper(boxes, uniqueNumbers) {
    boxes.forEach((cell) => {
        cell[0].nohelper = [
            ...new Set([...cell[0].nohelper, ...uniqueNumbers]),
        ];
    });
}

function SudokuView() {
    const [data, setData] = useState(dumpData);
    const [selectedCell, setSelectedCell] = useState(null);
    const [showSelfHelping, setShowSelfHelping] = useState(false);
    const [status, setStatus] = useState(true);
    const [coins, setCoins] = useState(3);
    useEffect(() => {
        //selectedCell && console.log("selectedCell", selectedCell);
        //data && console.log("data", data);
        checkSudoku({ data, setData, status, setStatus });
    }, [data, selectedCell]);
    function checkSolveStep({ data, setData }) {
        return (
            checkRows({ data, setData }) &&
            checkColumn({ data, setData }) &&
            checkBoxes({ data, setData })
        );
    }
    let N = 9;
    function solveStep(x, y, data, setData) {
        setStatus(!status);
        if (x == N - 1 && y == N) {
            return true;
        }
        if (y == N) {
            x++;
            y = 0;
        }
        if (data[x][y][1] != 0) {
            return solveStep(x, y + 1, data, setData);
        }
        for (let num = 1; num < 10; num++) {
            data[x][y][2] = num;
            if (checkSolveStep({ data, setData })) {
                if (solveStep(x, y + 1, data, setData)) {
                    return true;
                }
            }
            data[x][y][2] = 0;
        }
        return false;
    }
    function solve() {
        let solve = solveStep(0, 0, data, setData);
        console.log("solve");
    }
    return (
        <>
            <div className=" text-2xl border-2 border-black select-none self-center min-h-96 min-w-96">
                {data?.map((row, iX) => {
                    return (
                        <div
                            key={iX}
                            className="grid grid-cols-9 justify-between h-11"
                        >
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
                                        showSelfHelping={showSelfHelping}
                                        setShowSelfHelping={setShowSelfHelping}
                                    >
                                        <SudokuSelfHelpingCell
                                            key={iX + iY}
                                            idxY={iY}
                                            idxX={iX}
                                            data={data}
                                            setData={setData}
                                            selectedCell={selectedCell}
                                            setSelectedCell={setSelectedCell}
                                            showSelfHelping={showSelfHelping}
                                            setShowSelfHelping={
                                                setShowSelfHelping
                                            }
                                        />
                                    </SudokuCell>
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
                showSelfHelping={showSelfHelping}
                setShowSelfHelping={setShowSelfHelping}
                coins={coins}
                setCoins={setCoins}
                solve={solve}
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
    children,
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
                "flex items-center justify-center border border-black cursor-pointer w-full h-full" +
                borderVerticalAtEveryThirdColumn(idxY) +
                borderHorizontalAtEveryThirdRow(idxX) +
                (selectedCell?.y === idxY && selectedCell?.x === idxX
                    ? " bg-orange-300 hover:bg-orange-400 "
                    : " hover:bg-orange-200 ")
            }
            type="text"
        >
            {text[1] != 0 && (
                <span
                    className={
                        "flex items-center justify-center  bg-gray-400 font-extrabold w-full h-full " +
                        ((text[0].failRow ||
                            text[0].failColumn ||
                            text[0].failBox) &&
                            " text-red-500 ")
                    }
                >
                    {text[1]}
                </span>
            )}
            {text[1] == 0 && text[2] != 0 && (
                <span
                    className={
                        "flex items-center justify-center  font-cookie font-extrabold w-full h-full " +
                        ((text[0].failRow ||
                            text[0].failColumn ||
                            text[0].failBox) &&
                            " text-red-500 ")
                    }
                >
                    {text[2]}
                </span>
            )}
            {text[1] == 0 && text[2] == 0 && children}
        </div>
    );
}
function SudokuSelfHelpingCell({
    idxX,
    idxY,
    data,
    setData,
    selectedCell,
    setSelectedCell,
    showSelfHelping,
    setShowSelfHelping,
}) {
    return (
        showSelfHelping && (
            <div className="grid grid-cols-3 text-[0.5rem] h-full w-full">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                    return (
                        <div
                            key={"shc" + i}
                            className="flex leading-none justify-center items-center"
                        >
                            {data[idxX][idxY][0].nohelper.length == 8 &&
                                !data[idxX][idxY][0].nohelper.includes(i) &&
                                i}
                        </div>
                    );
                })}
            </div>
        )
    );
}
function SudokuFieldMenu({
    data,
    setData,
    selectedCell,
    showSelfHelping,
    setShowSelfHelping,
    coins,
    setCoins,
    solve,
}) {
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
            showSelfHelping == true && setCoins(coins - 1);
            setShowSelfHelping(false);
        }
    }
    function handleSolveClick() {
        solve();
    }
    return (
        <div className="flex flex-col items-center">
            <div className="border-2 border-black select-none self-center m-2 w-96 h-11 flex justify-between">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                    return (
                        <div
                            key={"fm" + i}
                            onClick={() => handleNumberClick(i)}
                            className={
                                "flex items-center justify-center border-1 border w-full border-black cursor-pointer hover:bg-gray-200 " +
                                (i % 3 === 0 && i != 9 ? " border-r-2 " : " ")
                            }
                            type="text"
                        >
                            {i}
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-row gap-2">
                <button
                    onClick={() =>
                        !(coins == 0) && setShowSelfHelping(!showSelfHelping)
                    }
                    disabled={!(coins > 0)}
                    className={
                        " w-40 border border-1 border-black rounded-sm disabled:opacity-50 " +
                        (showSelfHelping
                            ? " bg-orange-300 hover:bg-orange-400 "
                            : " hover:bg-orange-200 ")
                    }
                >
                    Hilfe {coins}/3
                </button>
                <button
                    onClick={() => handleSolveClick()}
                    className="w-40 border border-1 border-black rounded-sm"
                >
                    Lösen
                </button>
            </div>
        </div>
    );
}

export default SudokuView;
