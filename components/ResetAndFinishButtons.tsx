import { State } from '@/constants/State';
import { View } from "react-native";
import FooterButton from "./FooterButton";

type ResetAndFinishButtonsType = {
    state: State,
    setInitialState: () => void,
    showResults: () => void
};

const ResetAndFinishButtons = ({ state, setInitialState, showResults }: ResetAndFinishButtonsType) => {
    
    return (
        <View style={{ height: 60, width: '100%', position: 'absolute', bottom: 0, flexDirection: 'row' }}>
            {(state === State.focus || state === State.break || state === State.pause) && (
                <>
                    <FooterButton
                        name="reset"
                        imageSource={require('@/assets/images/reset.png')}
                        onClick={setInitialState}
                    />
                    <FooterButton
                        name="finish"
                        imageSource={require('@/assets/images/finish.png')}
                        onClick={() => {
                            // todo: move this functionality to the results tab
                            showResults();
                            setInitialState();
                        }}
                    />
                </>
            )}
        </View>)
}

export default ResetAndFinishButtons;