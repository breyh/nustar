import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Flex, Text, View, Image, StatusBar } from 'native-base';
import { logoTransparent } from '../../../assets';
import NustarButton from '../NustarButton/NustarButton';
import { Colors } from '../../../utils/Colors';
import { PublicNavigationScreen } from '../../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle='light-content' />
      <View style={styles.imageContainer}>
        <Image
          source={logoTransparent}
          style={{ width: '100%', height: '100%', padding: 20 }}
          alt="logo"
        />
      </View>
      <View style={styles.buttonContainer}>
        <NustarButton
          primary
          onPress={() => navigation.navigate(PublicNavigationScreen.LOGIN)}>
          Sign in
        </NustarButton>
        <Flex mx="3" direction="row" h="60" alignItems="center">
          <Divider
            orientation="horizontal"
            w="40%"
            _light={{
              bg: 'muted.800',
            }}
            _dark={{
              bg: 'muted.50',
            }}
          />
          <Text marginX={5}> OR </Text>
          <Divider
            orientation="horizontal"
            w="40%"
            _light={{
              bg: 'muted.800',
            }}
            _dark={{
              bg: 'muted.50',
            }}
          />
        </Flex>
        <NustarButton onPress={() => navigation.navigate(PublicNavigationScreen.JOIN)}>
          <Text style={{ color: Colors.white }}>Create a Profile</Text>
        </NustarButton>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '20%',
  },
  imageContainer: {
    flex: 0.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
});
