import Elevator from "./Elevator"

export default function App() {
    return (
        <div className="app">
            <h1>Elevator</h1>
            <Elevator numOfFloors={5} />
        </div>
    )
}