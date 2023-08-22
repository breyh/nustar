import { IDevice } from "../../../utils/device";

export interface ILoginFields {
  email: string;
  password: string;
}

export interface ILoginPayload {
  formData: ILoginFields;
  device: IDevice;
  location?: string;
}
