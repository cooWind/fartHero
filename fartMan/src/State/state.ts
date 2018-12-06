
interface State{
    nextState?:State;
    name:String;
    handle(manager: Manager);
}