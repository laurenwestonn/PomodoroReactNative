import { State } from '@/constants/State';
import { Text, View } from "react-native";
import FooterButton from "./FooterButton";

type ResetAndFinishButtonsType = {
    state: State,
    setState: (state: State) => void,
    history: any[],
    setHistory: (h: any[]) => void,
    time: number,
    setTime: (n: number) => void
};

const ResetAndFinishButtons = ({ state, setState, history, setHistory, time, setTime }: ResetAndFinishButtonsType) => {
    return (

        <View style={{ height: 60, width: '100%', position: 'absolute', bottom: 0, flexDirection: 'row' }}>
            {(state === State.focus ||
                state === State.break ||
                state === State.results) && (
                    <FooterButton
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
                <FooterButton
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