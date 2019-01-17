import { User } from "firebase";
import UpdatePasswordForm from "./core/components/UpdatePasswordForm";
// Misc types

export interface ReduxState {
  core: CoreState;
}

export interface Errors {
  loginError: string;
  logoutError: string;
  registerError: string;
  passwordEmailError: string;
  updatePasswordError: string;
}

export enum LoadingStates {
  Loading,
  Loaded,
  Failed
}

interface ApplyForm {
  resumeTimestamp?: string;
  formData: ApplyFormData;
}

interface UpdatePasswordForm {
  isSubmitting: boolean;
}

interface ApplyFormData {}

export interface CoreState {
  viewportWidth: number;
  viewportHeight: number;
  user: User;
  errors: Errors;
  loadingState: LoadingStates;
  applyForm: ApplyForm;
  updatePasswordForm: UpdatePasswordForm;
}
