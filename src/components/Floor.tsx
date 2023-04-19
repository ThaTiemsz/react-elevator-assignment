import { useState, useEffect } from "react"
import { useElevator, useElevatorDispatch } from "../contexts/ElevatorContext"

interface FloorProps {
    number: number
}

export default function Floor({ number }: FloorProps) {
    const state = useElevator()
    const dispatch = useElevatorDispatch()
    const [upButtonCalled, setUpButtonCalled] = useState(false)
    const [downButtonCalled, setDownButtonCalled] = useState(false)

    const floorButtons = []
    for (let i = state.totalFloors; i >= 0; i--) {
        floorButtons.push(
            <button key={i} className={false ? "active" : ""} onClick={() => dispatch({ type: "move", moveTo: number })}>
                {i}
            </button>
        )
    }

    function handleCallButton(direction: "up" | "down") {
        dispatch({
            type: "call",
            direction,
            floor: number,
        })
    }

    useEffect(() => {
        state.pendingFloors.filter(p => p.floor === number).map(p => {
            if (p.direction === "up") {
                setUpButtonCalled(true)
            } else {
                setDownButtonCalled(true)
            }
        })
    }, [state.pendingFloors])

    return (
        <div className="row">
            <div className="callButtons">
                <button className={upButtonCalled ? "active" : ""}
                        onClick={() => handleCallButton("up")}
                        disabled={number === state.totalFloors}>
                    ▲
                </button>
                <button className={downButtonCalled ? "active" : ""}
                        onClick={() => handleCallButton("down")}
                        disabled={number === 0}>
                    ▼
                </button>
            </div>
            <div className={["floor", state.currentFloor === number ? "active" : ""].join(" ")}>
                <span>{number}</span>
                <div className="floorButtons">
                    {floorButtons}
                </div>
            </div>
        </div>
    )
}