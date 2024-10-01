import { useState } from "react";
import Button from "./components/Button";
import SudokuView from "./components/SudokuView";
import SudokuCreator from "./components/SudokuCreator";

function App() {
    const [menu, setMenu] = useState("play");
    return (
        <>
            <h1 className="self-center text-4xl text-orange-500 underline">
                Sudoku v0.0.2
            </h1>
            <a
                className="self-center underline text-blue-500"
                href="https://github.com/fchristian1/sudoku-react"
                target="_blank"
            >
                myGitHub Link
            </a>
            <br />
            <div className="flex flex-row gap-2 justify-center m-2">
                <Button
                    text="Play Game"
                    active={menu == "play"}
                    onClick={() => {
                        setMenu("play");
                    }}
                />
                <Button
                    text="Create Game"
                    active={menu == "create"}
                    onClick={() => {
                        setMenu("create");
                    }}
                />
            </div>
            {menu == "play" && <SudokuView />}
            {menu == "create" && <SudokuCreator />}
        </>
    );
}

export default App;
