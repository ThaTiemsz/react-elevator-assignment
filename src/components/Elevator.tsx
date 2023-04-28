import { useEffect } from "react"
import { useElevator, useElevatorDispatch } from "../contexts/ElevatorContext"
import Floor from "./Floor"

interface ElevatorProps {
    numOfFloors: number
    moveTime: number
}

export default function Elevator({ numOfFloors, moveTime }: ElevatorProps) {
    const state = useElevator()
    const dispatch = useElevatorDispatch()

    const floors = []
    for (let i = numOfFloors; i >= 0; i--) {
        floors.push(<Floor key={i} number={i} />)
    }

    // move elevator to the next floor
    useEffect(() => {
        if (state.pendingFloors.length > 0) {
            // find the closest pending floor
            const closestPendingFloor = state.pendingFloors
                .reduce((prev, curr) =>
                    Math.abs(curr.floor - state.currentFloor) < Math.abs(prev.floor - state.currentFloor)
                        ? curr
                        : prev
                )

            // the number of the next floor to go to
            const nextFloor = closestPendingFloor.floor > state.currentFloor
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
            }, moveTime)
        }
    }, [state.pendingFloors])

    return (
        <div className="elevator">
            {floors}
        </div>
    )
}