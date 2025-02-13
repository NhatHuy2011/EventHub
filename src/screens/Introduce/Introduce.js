import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const App = ({navigation}) => {
    const [countdown, setCountdown] = useState(1);
    useEffect(() => {
      const timeout = setTimeout(() => {
        navigation.navigate('Home');
      }, countdown * 10000);
      const interval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 10000);
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }, [countdown, navigation]);

    return (
      <View style={styles.bg}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/dogcute.jpg')}
            style={styles.profilePic}></Image>
        </View>
        <View>
          <Text
            style={{fontSize: 16, alignContent: 'center', textAlign: 'center'}}>
            Nguyễn Nhất Huy
          </Text>
          <Text style={{fontSize: 16}}> 
                Sinh viên Khoa CNTT - ĐHSPKTHCM
          </Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    bg: {
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      paddingHorizontal: 40,
    },
      container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      width: 150,
      height: 150,
    },
    profilePic: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 20,
    },
});

export default App;