import {useState} from 'react';
import './Main.css';
import {Grid} from '../Grid/Grid';

export function Main () {
    const [columns, setColumns] = useState(1);
    const [rows, setRows] = useState(1);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);

    const [direction, setDirection] = useState('N');

    const [showDirection, setShowDirection] = useState('N');

    const [sequence, setSequence] = useState('');
    const [clicked, setClicked] = useState(false);

    const changeColumns = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColumns(Number(e.target.value));
        if (y > Number(e.target.value)) {
            setX(Number(e.target.value) - 1);
        }
    }
    
    const changeRows = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRows(Number(e.target.value));
        if (x > Number(e.target.value)) {
            setY(Number(e.target.value) - 1);
        }
    }

    const changeX = (e: React.ChangeEvent<HTMLInputElement>) => {
        setX(Number(e.target.value));
    }

    const changeY = (e: React.ChangeEvent<HTMLInputElement>) => {
        setY(Number(e.target.value));
    }

    const changeDirection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDirection(e.target.value);
    }

    const setValues = (x: number, y: number, direction: string) => {
        setGridX(x);
        setGridY(y);
        setShowDirection(direction);
    }

    const handleSequence = (e: React.ChangeEvent<HTMLInputElement>) => {
        const result = e.target.value.replace(/[^(a|d|g)]/gi, '');
        setSequence(result);
       }

    return (
        <div className="main">
            <div className="menu-wrapper">
                <div className="main-menu">
                    <h3 className="label">Grid size</h3>
                    <div className="inputs">
                        <input type="number" placeholder="Rows..." value={rows} min={1} max={8} onChange={(e) => { changeRows(e) }}></input>
                        <input type="number" placeholder="Column..." value={columns} min={1} max={8} onChange={(e) => { changeColumns(e) }}></input>
                    </div>
                    <h3 className="label">Initial position</h3>
                    <div className="inputs">
                        <input type="number" placeholder="x..." value={x} min={0} max={columns - 1} onChange={(e) => { changeX(e) }}></input>
                        <input type="number" placeholder="y..." value={y} min={0} max={rows - 1} onChange={(e) => { changeY(e) }}></input>
                    </div>
                    <h3 className="label">Initial direction</h3>
                    <div className="inputs">
                        <select value={direction} onChange={(e) => { changeDirection(e) }}>
                            <option value="N">North</option>
                            <option value="E">East</option>
                            <option value="S">South</option>
                            <option value="W">West</option>
                        </select>
                    </div>

                    <div style={{marginTop: '2rem', color: '#d1cb84'}}>
                        <h2>Position: {gridX} , {gridY}</h2>
                        <h2>Direction: {showDirection}</h2>
                    </div>
                    <h3 className="label" style={{marginTop: '2rem'}}>Sequence</h3>
                    <div className="inputs" style={{display: 'block'}}>
                        <input type="text" onChange={(e) => handleSequence(e)} value={sequence} className="sequence" placeholder="Sequence..."></input>
                        <button className={clicked ? "go-red" : "go-green"} onClick={() => setClicked(!clicked)}>{clicked ? "back" : "Go"}</button> 
                    </div>
                </div>
            </div>
            <div className="grid">
                <h1 className="label">Grid</h1>
                <Grid tab-index={-1} columns={columns} rows={rows} x={x} y={y}
                    direction={direction} onMove={setValues} clicked={clicked} sequence={sequence} />
            </div>
        </div>
    );
}
