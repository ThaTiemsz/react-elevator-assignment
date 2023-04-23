import { useEffect } from "react"
import { ElevatorProvider, useElevator, useElevatorDispatch } from "../contexts/ElevatorContext"
import Floor from "./Floor"

interface ElevatorProps {
    numOfFloors: number
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default function Elevator({ numOfFloors }: ElevatorProps) {
    const state = useElevator()
    const dispatch = useElevatorDispatch()

    const floors = []
    for (let i = numOfFloors; i >= 0; i--) {
        floors.push(<Floor key={i} number={i} />)
    }

    // TODO: prioritise most call with same direction
    // useEffect(() => {
    //     if (state.pendingFloors.length > 0) {
    //         for (let i = 0; i >= state.currentFloor; i--) {
    //             if (state.pendingFloors.find(p => p.floor === i))
    //                 break
    //             setTimeout(() => {
    //                 dispatch({
    //                     type: "move",
    //                     moveTo: i,
    //                 })
    //             }, 1000)
    //         }
    //         // const intervalId = setTimeout(() => {
    //         //     console.log(state)
    //         //     if (state?.pendingFloors.length > 0) {
    //         //         const sortedNextFloors = [...state.pendingFloors].sort((a, b) => b.floor - a.floor)
    //         //         const floorToMoveTo = sortedNextFloors[0].floor
    //         //         dispatch({
    //         //             type: "move",
    //         //             moveTo: floorToMoveTo,
    //         //         })
    //         //     }
    //         // }, 1000)
    //         // return () => clearTimeout(intervalId)
    //     }
    // }, [state.pendingFloors])

    return (
        <div className="elevator">
            {floors}
        </div>
    )
}