import { View, Text, TouchableOpacity } from 'react-native';
import { valueToTime } from '@/utils/timeHelpers';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

interface HistoryProps {
  history: number[];
}

export const Timeline = (props: HistoryProps) => {
  const [show, setShow] = useState(true);
  return ( <>
    {props.history.length > 0 &&
      <View>
        <TouchableOpacity
          style={{ flexDirection: 'row', backgroundColor: '#f3e8d8', height: 26, padding: 12, borderRadius: 13, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setShow(!show)}
          accessible={true}
          accessibilityLabel="Show your previous time frames"
        >
          <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 8}} >History</Text>
          <AntDesign name={show ? "up" : "down"} size={16} color="black" />
        </TouchableOpacity>
        {show && <ScrollView style={{height: 200, backgroundColor: '#766', padding: 10}}>
          {
            props.history.map((x,i) => (
              <Text key={i} style={{color: (i%2 === 0 ? 'orange' : 'powderblue')}}>
                { valueToTime(x/60000) }
              </Text>
            ))
          }
        </ScrollView>}
      </View>
    }
  </>)
}