import { State } from "@/app/index";
import { View } from "react-native";
import CircleButton from "./CircleButton";

type ResetAndFinishButtonsType = {
    state: State,
    setState: (state: State) => void,
    history: any[],
    setHistory: (h: any[]) => void,
    time: number,
    setTime: (n: number) => void
};

const ResetAndFinishButtons = ({ state, setState, history, setHistory, time, setTime }: ResetAndFinishButtonsType) => {
    console.log('hi',State.results.toString());
    return (

        <View style={{ position: 'absolute', bottom: -100, flexDirection: 'row', gap: 12, justifyContent: 'center', alignSelf: 'center' }}>
            {(state === State.focus ||
                state === State.break ||
                state === State.results) && (
                    <CircleButton
                        name="reset"
                        imageSource={require('@/assets/images/reset.png')}
                        onClick={() => {
                            setState(State.initial);
                            setHistory([]);
                            setTime(0);
                        }}
                    />
                )}

            {(state === State.focus || state === State.break) && (
                <CircleButton
                    name="finish"
                    imageSource={require('@/assets/images/finish.png')}
                    onClick={() => {
                        setState(State.results);
                        setHistory([...history, time]);
                    }}
                />
            )}
        </View>)
}

export default ResetAndFinishButtons;