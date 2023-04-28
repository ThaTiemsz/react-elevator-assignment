import { ElevatorProvider } from "../contexts/ElevatorContext"
import Elevator from "./Elevator"

const numOfFloors = 5
const moveTime = 1500

export default function App() {
    return (
        <div className="app">
            <h1>Elevator</h1>
            <ElevatorProvider floors={numOfFloors}>
                <Elevator numOfFloors={numOfFloors} moveTime={moveTime} />
            </ElevatorProvider>
        </div>
    )
}