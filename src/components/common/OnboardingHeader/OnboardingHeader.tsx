import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { IOnboardingHeaderProp } from './OnboardingHeader.types';
import { theme } from 'native-base';
import { header } from '../../../assets';
import { Colors } from '../../../utils/Colors';

const OnboardingHeader: FC<IOnboardingHeaderProp> = ({
  title,
  subtitle,
  image,
}) => {
  return image ? (
    <View style={[styles.centeredContent]}>
      <Image source={image} />
    </View>
  ) : (
    <ImageBackground source={header} style={{ flex: 1 }}>
      <View style={styles.content}>
        <Text style={{ color: Colors.paynesGray }}>{title}</Text>
        <Text style={{ color: Colors.paynesGray, fontSize: 26 }}>
          {subtitle}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default OnboardingHeader;

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 30,
  },
  centeredContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black,
  },
});
