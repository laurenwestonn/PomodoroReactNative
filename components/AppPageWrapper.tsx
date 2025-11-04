import React from "react";
import { View } from "react-native";

const AppPageWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <View
            style={{
                backgroundColor: '#3a3023ff',
                flex: 1,
                alignItems: "center",
                justifyContent: 'center',
            }}
        >
            {children}
        </View>
    )
}

export default AppPageWrapper;