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
    if (state.currentFloor === number) {
        for (let i = state.totalFloors; i >= 0; i--) {
            const floorIsPending = state.pendingFloors.find(p => p.floor === i)
            floorButtons.push(
                <button key={i}
                        className={floorIsPending ? "active" : ""}
                        onClick={() => dispatch({ type: "floorButtonPress", floor: i })}
                >
                    {i}
                </button>
            )
        }
    }

    function handleCallButton(direction: "up" | "down") {
        dispatch({
            type: "call",
            direction,
            floor: number,
        })
    }

    useEffect(() => {
        setUpButtonCalled(state.pendingFloors.find(p => p.floor === number && p.direction === "up") ? true : false)
        setDownButtonCalled(state.pendingFloors.find(p => p.floor === number && p.direction === "down") ? true : false)
    }, [state.pendingFloors])

    return (
        <div className="row">
            <div className="callButtons">
                <button className={upButtonCalled ? "active" : ""}
                        onClick={() => handleCallButton("up")}
                        disabled={number === state.totalFloors || number === state.currentFloor}>
                    ▲
                </button>
                <button className={downButtonCalled ? "active" : ""}
                        onClick={() => handleCallButton("down")}
                        disabled={number === 0 || number === state.currentFloor}>
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