import { ElevatorProvider } from "../contexts/ElevatorContext"
import Elevator from "./Elevator"

export default function App() {
    const numOfFloors = 5

    return (
        <div className="app">
            <h1>Elevator</h1>
            <ElevatorProvider floors={numOfFloors}>
                <Elevator numOfFloors={numOfFloors} />
            </ElevatorProvider>
        </div>
    )
}