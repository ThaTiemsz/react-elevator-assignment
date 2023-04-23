import { Dispatch, createContext, useContext, useReducer } from "react"

type Action =
    | {
        type: "call"
        direction: "up" | "down"
        floor: number
    }
    | {
        type: "move"
        moveTo: number
    }

type State = {
    totalFloors: number
    currentFloor: number
    pendingFloors: {
        direction: "up" | "down"
        floor: number
    }[]
}

const initialState = {
    totalFloors: 0,
    currentFloor: 0,
    pendingFloors: [],
} satisfies State

// handle actions dispatched by the dispatcher
function elevatorReducer(state: State, action: Action): State {
    switch (action.type) {
        // call the elevator to a floor
        case "call": {
            const pendingFloors = [...state.pendingFloors]
            // if the floor is not already in the queue, add it to the queue
            if (!pendingFloors.find(p => p.floor === action.floor && p.direction === action.direction))
                pendingFloors.push({
                    direction: action.direction,
                    floor: action.floor,
                })
            return {
                ...state,
                pendingFloors,
            }
        }
        // move the elevator to a floor
        case "move": {
            const pendingFloors = state.pendingFloors.filter(p => p.floor !== action.moveTo)
            return {
                ...state,
                currentFloor: action.moveTo,
                pendingFloors,
            }
        }
    }
}

export const ElevatorContext = createContext<State>(null)
export const ElevatorDispatchContext = createContext<Dispatch<Action>>(null)

export function ElevatorProvider({ children, floors }: {
    children: React.ReactNode
    floors: number
}) {
    const [state, dispatch] = useReducer(elevatorReducer, initialState)

    return (
        <ElevatorContext.Provider value={{ ...state, totalFloors: floors }}>
            <ElevatorDispatchContext.Provider value={dispatch}>
                {children}
            </ElevatorDispatchContext.Provider>
        </ElevatorContext.Provider>
    )
}

export function useElevator() {
    return useContext(ElevatorContext)
}

export function useElevatorDispatch() {
    return useContext(ElevatorDispatchContext)
}