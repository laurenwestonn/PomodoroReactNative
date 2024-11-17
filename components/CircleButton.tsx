import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CircleButtonInterface {
  onClick: () => void;
  name: string;
  imageSource: any;
}

const CircleButton = (props: CircleButtonInterface) => {
  // Does the accessible property group the button and image?
  // is it correct?
  // Does the a11y label go onto the image or the button?
  // Does the grouping change things?
  return (
    <TouchableOpacity
      accessibilityLabel={props.name}
      accessible={true}
      onPress={props.onClick}
      style={{
        borderWidth: 0,
        borderRadius: 30,
        width: 60,
        height: 60,
        backgroundColor: '#f3e8d8'
      }}
    >
      <Image
        source={props.imageSource}
        accessibilityLabel={props.name}
        style={{
          width: "70%",
          height: "70%",
          margin: 10
        }}
      >
      </Image>
    </TouchableOpacity>
  );
};

export default CircleButton;
