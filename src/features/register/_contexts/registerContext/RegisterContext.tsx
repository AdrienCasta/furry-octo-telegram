import * as React from "react";
import { RegistrationValues } from "../../types";

const RegisterContext = React.createContext(
  {} as {
    state: RegisterState;
    dispatch: React.Dispatch<RegisterAction>;
  }
);

type RegisterState = RegistrationValues;

interface RegisterAction {
  type: "SET_REGISTER";
  payload: Partial<RegisterState>;
}

function registerReducer(state: RegisterState, action: RegisterAction) {
  switch (action.type) {
    case "SET_REGISTER": {
      return { ...state, ...action.payload };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

interface RegisterProviderProps {
  children: React.ReactNode;
}
function RegisterProvider({ children }: RegisterProviderProps) {
  const [state, dispatch] = React.useReducer(registerReducer, {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const value = { state, dispatch };
  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
}

function useRegister() {
  const context =
    React.useContext<{
      state: RegisterState;
      dispatch: React.Dispatch<RegisterAction>;
    }>(RegisterContext);
  if (context === undefined) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return context;
}

export { RegisterProvider, useRegister };
