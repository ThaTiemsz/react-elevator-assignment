import { useEffect } from "react"
import { useElevator, useElevatorDispatch } from "../contexts/ElevatorContext"
import Floor from "./Floor"

interface ElevatorProps {
    numOfFloors: number
}

export default function Elevator({ numOfFloors }: ElevatorProps) {
    const state = useElevator()
    const dispatch = useElevatorDispatch()

    const floors = []
    for (let i = numOfFloors; i >= 0; i--) {
        floors.push(<Floor key={i} number={i} />)
    }

    // move elevator to next floor, prioritising the direction with the most pending floors
    useEffect(() => {
        if (state.pendingFloors.length > 0) {
            const upFloors = state.pendingFloors
                .filter(p => p.direction === "up")
                .sort((a, b) => b.floor - a.floor)
            const downFloors = state.pendingFloors
                .filter(p => p.direction === "down")
                .sort((a, b) => a.floor - b.floor)

            // the number of the next floor to go to
            const nextFloor = upFloors.length > downFloors.length
                ? state.currentFloor + 1
                : state.currentFloor - 1

            // elevator can't move to a floor that doesn't exist
            if (nextFloor > state.totalFloors || nextFloor < 0)
                return

            setTimeout(() => {
                dispatch({
                    type: "move",
                    moveTo: nextFloor,
                })
            }, 1000)
        }
    }, [state.pendingFloors])

    return (
        <div className="elevator">
            {floors}
        </div>
    )
}