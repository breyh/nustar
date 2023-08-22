import { AnyAction } from 'redux';

export interface IErrorResponse extends Error {
  data: IErrorMessage;
  status: string;
}

export interface IErrorMessage {
  errorMessage?: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export type UserResponse = {
  profile: {
    id: number;
    firstName: string;
    lastName: string;
    socialProviders?: any;
    phoneNumber: string;
    notificationSettings: any;
    companies?: AnyAction;
    email: string;
    emailVerified: boolean;
    loginCount: number;
    portfolioLinks?: string;
    workField?: string;
    currentYearIncome?: number;
    dateOfBirth?: string;
    ssn?: string;
  };
  addressBook: any;
  auth: {
    token: string;
    provider: string;
  };
  onboarding: {
    currentStep: any;
    toStep: [];
    completed: boolean;
    status: string;
    completedSteps: string[];
  };
  role: {
    id: number;
    name: string;
  };
  plaid: {
    authRequiredInstitutions: any;
  };
  security?: any;
};
