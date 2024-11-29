import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

interface FooterButtonInterface {
  onClick: () => void;
  name: string;
  imageSource: any;
}

const FooterButton = (props: FooterButtonInterface) => {
  // Does the accessible property group the button and image?
  // is it correct?
  // Does the a11y label go onto the image or the button?
  // Does the grouping change things?
  return (
    <TouchableOpacity
      accessibilityLabel={props.name}
      accessibilityRole='button'
      onPress={props.onClick}
      style={{
        flex: 1,
        backgroundColor: '#f3e8d8',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={props.imageSource}
        accessible={false} // image is decorative only. the action will be described in the touchableopacity
        style={{
          width: 30,
          height: 30,
          margin: 10
        }}
      >
      </Image>
    </TouchableOpacity>
  );
};

export default FooterButton;
