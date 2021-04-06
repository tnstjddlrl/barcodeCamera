
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

const chwidth = Dimensions.get('screen').width
const chheight = Dimensions.get('screen').height

const App = () => {
  const camera = useRef()
  const [barcc, setBarcc] = useState('바코드 탐지중!')
  return (
    <View>
      <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: 'white' }}>
        <RNCamera
          ref={camera}
          style={{ width: chwidth, height: chheight - 200, alignSelf: "center", backgroundColor: 'white' }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          // onGoogleVisionBarcodesDetected={({ barcodes }) => {
          //   console.log(barcodes);
          // }}
          onBarCodeRead={(data) => {
            setBarcc(data.data)
            console.log(data.data)
          }}

        >
          <BarcodeMask
            width={300} height={200} showAnimatedLine={true} outerMaskOpacity={0.8}
          />
        </RNCamera>
      </View>


      <View style={{ height:200, backgroundColor: 'white',justifyContent: "center", alignItems: "center"}}>
        <Text style={{ width: chwidth - 60, height: 50, fontSize: 18, marginBottom: 10,marginTop:10 }}>{barcc} </Text>
        {barcc !== '바코드 탐지중!' && 
        <TouchableWithoutFeedback onPress={() => {Alert.alert(barcc + '로 확정!'),console.log('클릭')}}>
          <View style={{ width: chwidth - 60, height: 50, backgroundColor: 'yellow', borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
            <Text>위 바코드로 확정</Text>
          </View>
        </TouchableWithoutFeedback>
        }
      </View>


    </View>
  )
}

export default App;
