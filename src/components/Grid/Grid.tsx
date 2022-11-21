import * as React from 'react';
import './Grid.css';
import { useEffect, useState } from 'react';

export interface IGridProps {
    columns: number;
    rows: number;
    x: number;
    y: number;
    direction: string;
    clicked: boolean;
    sequence: string;
    onMove: (x: number, y: number, direction: string) => void;   
}

export function Grid (props: IGridProps) {  
    useEffect(() => {
        if (props.clicked) {
            go();  
        }
    }, [props.clicked]);

    const [x, setX] = useState(props.x);
    var tmpX = x;
    const [y, setY] = useState(props.y);
    var tmpY = y;
    const [direction, setDirection] = useState(props.direction);

    useEffect(() => {
        setX(props.x);
        setY(props.y);
        setDirection(props.direction);

    }, [props.x, props.y, props.direction]);

    useEffect(() => {
        props.onMove(x, y, direction);
    }, [x, y, direction]);
    var tmpDirection = direction;
    const rotate = () => {
        switch (direction) {
            case 'N':
                return 0;
            case 'E':
                return 90;
            case 'S':
                return 180;
            case 'W':
                return 270;
            default:
                return 0;
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowUp':
                goForward();
                break;
            case 'ArrowRight':
                turnRight();
                break;
            case 'ArrowDown':
                goBackward();
                break;
            case 'ArrowLeft':
                turnLeft();
                break;
            default:
                break;
        }
    }

    const setDirectionHandler = (
        direction: string,
        northFunction: Function,
        eastFunction: Function,
        southFunction: Function,
        westFunction: Function
    ) => {
        console.log(direction);
        
        switch (direction) {
            case 'N':
                northFunction();
                break;
            case 'E':
                eastFunction();
                break;
            case 'S':
                southFunction();
                break;
            case 'W':
                westFunction();
                break;
            default:
                break;
        }
    }

    const goForward = () => {
        setDirectionHandler(tmpDirection, () => {
            if (tmpY < props.rows - 1) {
                tmpY+=1;
                setY(tmpY);
            }
                
        }, () => {
            if (tmpX > 0){
                tmpX-=1;
                setX(tmpX);
            }
        }, () => {
            if (tmpY > 0){
                tmpY-=1;
                setY(tmpY);
            }
        }, () => {
            if (tmpX < props.columns - 1){
                tmpX+=1;
                setX(tmpX);
            }
        });
    }

    const goBackward = () => {
        setDirectionHandler(tmpDirection, () => {
            if (tmpY > 0){
                tmpY-=1;
                setY(tmpY);
            }
        }, () => {
            if (tmpX < props.columns - 1){
                tmpX+=1;
                setX(tmpX);
            }
        }, () => {
            if (tmpY < props.rows - 1){
                tmpY+=1;
                setY(tmpY);
            }
        }, () => {
            if (tmpX > 0){
                tmpX-=1;
                setX(tmpX);
            }
        });
    }

    const turnRight = () => {
        setDirectionHandler(tmpDirection, () => {
            tmpDirection = 'E';
            setDirection('E');
        }, () => {
            tmpDirection = 'S';
            setDirection('S');
        }, () => {
            tmpDirection = 'W';
            setDirection('W');
        }, () => {
            tmpDirection = 'N';
            setDirection('N');
        });
    }

    const turnLeft = () => {
        setDirectionHandler(tmpDirection, () => {
            tmpDirection = 'W';
            setDirection('W');
        }, () => {
            tmpDirection = 'N';
            setDirection('N');
        }, () => {
            tmpDirection = 'E';
            setDirection('E');
        }, () => {
            tmpDirection = 'S';
            setDirection('S');
        });
    }

    const go = () => {
        let seq = props.sequence.toLowerCase();
        for (let i = 0; i < seq.length; i++) {
            let letter = seq[i];
            
            switch (letter) {
                case 'a':
                    console.log('go forward');
                    goForward();
                    break;
                case 'g':
                    console.log('turn left');
                    turnLeft();
                    break;
                case 'd':
                    console.log('turn right');
                    turnRight();
                    break;
                default:
                    break;
            }
        }
        
        // turnLeft();
        // console.log(x, y, direction);
        
        // setTimeout(() => {
        //     turnRight();    
        //     console.log(x, y, direction);
        // }, 1000)
        // goForward();
        // goForward();
        // goForward();

    }


    return (
        <div className="grid-wrapper" style={{grid: `1fr / repeat(${props.columns}, 1fr)`}} tabIndex={0} onKeyDown={(e) => { handleKeyDown(e) }}>
            {
                Array(props.rows).fill(0).map((_, i) => {
                    return (
                        Array(props.columns).fill(0).map((_, j) => {
                            return (
                                <div className="grid-cell" key={i+j} data-i={i} data-j={j}>
                                    {
                                        i === props.rows - y - 1 && j === props.columns - x - 1 &&
                                        <div className="grid-cell__arrow" style={{
                                            transform: `rotate(${rotate()}deg)`,
                                        }}>😎</div>
                                    }
                                </div>
                            );
                        })
                    );
                })   
            }
        </div>
    );
}


