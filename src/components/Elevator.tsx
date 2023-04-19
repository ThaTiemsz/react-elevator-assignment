import { useEffect } from "react"
import { ElevatorProvider, useElevator, useElevatorDispatch } from "../contexts/ElevatorContext"
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

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         if (state.pendingFloors.length > 0) {
    //             const floorToMoveTo = state.pendingFloors[0].floor
    //             dispatch({
    //                 type: "move",
    //                 moveTo: floorToMoveTo,
    //             })
    //         }
    //     }, 1000)
    //     return () => clearInterval(intervalId)
    // }, [])

    return (
        <div className="elevator">
            <ElevatorProvider floors={numOfFloors}>
                {floors}
            </ElevatorProvider>
        </div>
    )
}