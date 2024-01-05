import React from 'react';
import { View, Text } from 'react-native';

const WarningScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Kişi bilgileri değerli olduğundan bu sayfa IP-5 ile birlikte tamamlanacaktır.
      </Text>
    </View>
  );
};

export default WarningScreen;