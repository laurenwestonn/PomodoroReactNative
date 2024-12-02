import AppPageWrapper from "@/components/AppPageWrapper";
import { HistoriesProvider } from "@/context/HistoriesProvider";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';

export default function RootLayout() {
  return (
    <HistoriesProvider>
      <Tabs>
        <Tabs.Screen
          name="Home"
          options={{
            title: "Pomodoro",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
          }}
        />
        <Tabs.Screen
          name="ResultsTab"
          options={{
            title: "Results",
            tabBarIcon: ({ color }) => <Entypo name="bar-graph" size={24} color={color} />,
          }} />
      </Tabs>
    </HistoriesProvider>
  );
}
