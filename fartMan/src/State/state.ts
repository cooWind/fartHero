
interface State{
    nextState?:State;
    handle(manager: Manager);
}