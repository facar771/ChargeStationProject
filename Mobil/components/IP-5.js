import React from 'react';
import { View, Text } from 'react-native';

const WarningScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Kişi bilgileri değerli oldugundan bu sayfa IP-5 ile birlikte tamamlanacaktir.
      </Text>
    </View>
  );
};

export default WarningScreen;