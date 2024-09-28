import SudokuView from "./components/SudokuView";

function App() {
    return (
        <>
            <h1 className="self-center text-4xl text-orange-500 underline">
                Sudoku v0.0.1
            </h1>
            <a
                className="self-center underline text-blue-500"
                href="https://github.com/fchristian1/sudoku-react"
                target="_blank"
            >
                myGitHub Link
            </a>
            <br />
            <SudokuView />
        </>
    );
}

export default App;
