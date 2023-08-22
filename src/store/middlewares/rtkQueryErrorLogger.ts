import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { Platform, ToastAndroid } from 'react-native';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => next => action => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.error(`We got a rejected action! - ${action.error?.message}`);
      if(Platform.OS === 'android') {
        ToastAndroid.show(`'Async error!' ${action.error?.data?.message}`, 5);
      }
    }
    return next(action);
  };
