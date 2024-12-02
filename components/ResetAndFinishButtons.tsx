import { State } from '@/constants/State';
import { View } from "react-native";
import FooterButton from "./FooterButton";

type ResetAndFinishButtonsType = {
    state: State,
    setState: (state: State) => void,
    setHistory: (h: any[]) => void,
    setTime: (n: number) => void,
    showResults: () => void
};

const ResetAndFinishButtons = ({ state, setState, setHistory, setTime, showResults }: ResetAndFinishButtonsType) => {
    
    const clearCurrentSession = () => {
        setState(State.initial);
        setHistory([]);
        setTime(0);
    }

    return (
        <View style={{ height: 60, width: '100%', position: 'absolute', bottom: 0, flexDirection: 'row' }}>
            {(state === State.focus ||
                state === State.break ||
                state === State.results) && (
                    <FooterButton
                        name="reset"
                        imageSource={require('@/assets/images/reset.png')}
                        onClick={clearCurrentSession}
                    />
                )}

            {(state === State.focus || state === State.break) && (
                <FooterButton
                    name="finish"
                    imageSource={require('@/assets/images/finish.png')}
                    onClick={() => {
                        // todo: move this functionality to the results tab
                        showResults();
                        clearCurrentSession();
                    }}
                />
            )}
        </View>)
}

export default ResetAndFinishButtons;