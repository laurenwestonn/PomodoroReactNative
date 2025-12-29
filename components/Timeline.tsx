import { View, Text, TouchableOpacity } from 'react-native';
import { valueToTimeLine } from '@/utils/timeHelpers';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

interface HistoryProps {
  history: number[];
}

export const Timeline = (props: HistoryProps) => {
  const [show, setShow] = useState(true);
  return props.history.length > 0 && (
    <View className={'flex-1 mb-20 w-32'}>
      <TouchableOpacity
        className={'flex-row bg-amber-100 p-2 rounded-md justify-center items-center w-auto'}
        onPress={() => setShow(!show)}
        accessible={true}
        accessibilityLabel="Show your previous time frames"
      >
        <Text className={'text-stone-800 mr-2 font-bold text-xl'}>
          History
        </Text>
        <AntDesign name={show ? "up" : "down"} size={16} color="black" />
      </TouchableOpacity>
      
      {show && <View className={'bg-stone-500/60 h-60 '}
      >
        <ScrollView className={'my-4'}>
            {
              props.history.map((x,i) => (
                <Text
                  className={`text-center ${(i%2 === 0 ? 'text-yellow-500 text-2xl' : 'text-blue-100 text-xl')}`}
                  key={i}
                >
                  { valueToTimeLine(x/60) } 
                </Text>
              ))
            }
          </ScrollView>
      </View>
      }
    </View>
  )
}