import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocalData = async (datakey: string, data: any) => {
  try {
    const dataStored: any = await AsyncStorage.getItem(datakey);
    await AsyncStorage.setItem(
      datakey,
      dataStored !== null
        ? JSON.stringify({
            ...dataStored,
            ...data,
          })
        : JSON.stringify(data),
    );
  } catch (e: any) {
    console.error(`Could not save  data in storage - message: ${e.message}`);
  }
};

export const retrieveLocalData = async (datakey: string) => {
  try {
    const data = await AsyncStorage.getItem(datakey);
    return data != null ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Could not retrieve any data');
  }
};
