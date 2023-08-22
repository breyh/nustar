import { Provider } from 'react-redux';
import store, { persistor } from './src/store';
import { NativeBaseProvider } from 'native-base';
import MainNavigation from './src/navigation';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
            <MainNavigation />
        </NativeBaseProvider>
        </PersistGate>
    </Provider>
  );
}

