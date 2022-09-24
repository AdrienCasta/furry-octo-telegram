import { useMemo, useState } from "react";
import { RegistrationValues } from "../types";

type Values = RegistrationValues;
interface Fields {
  firstname: {
    value: string;
    dirty: boolean;
  };
  lastname: {
    value: string;
    dirty: boolean;
  };
  email: {
    value: string;
    dirty: boolean;
  };
  phone: {
    value: string;
    dirty: boolean;
  };
}

const validateName = (name: string) => {
  return /^[a-zA-Z]+$/.test(name);
};

export const validation = {
  isRequired: {
    check: (value: string) => {
      const error = value === "";
      return {
        error,
        message: error ? "Le champs est requis" : null,
      };
    },
  },
  isAValidHumanName: {
    check: (firstname: string) => {
      const error = !validateName(firstname);
      return {
        error,
        message: error ? "Le champs n'est pas au bon format" : null,
      };
    },
  },
  email: {
    check: (email: string) => {
      const error = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) === false;
      return {
        error,
        message: error ? "Le champs email n'est pas au bon format" : null,
      };
    },
  },
  phone: {
    check: (phone: string) => {
      const error = /^(\+33|0)[1-9](\d\d){4}$/.test(phone) === false;
      return {
        error,
        message: error
          ? "Le numéro de téléphone n'est pas au bon format"
          : null,
      };
    },
  },
};

export const firtnameErrorBag = (firstname: string) => {
  const { isRequired, isAValidHumanName } = validation;
  const isRequiredErrorBag = isRequired.check(firstname);
  const isValidFirstNameErrorBag = isAValidHumanName.check(firstname);
  return {
    error: isRequiredErrorBag.error || isValidFirstNameErrorBag.error,
    message: [
      isRequiredErrorBag.message,
      isValidFirstNameErrorBag.message,
    ].filter(Boolean),
  };
};
export const lastnameErrorBag = (lastname: string) => {
  const { isRequired, isAValidHumanName } = validation;
  const isRequiredErrorBag = isRequired.check(lastname);
  const isValidLastnameErrorBag = isAValidHumanName.check(lastname);
  return {
    error: isRequiredErrorBag.error || isValidLastnameErrorBag.error,
    message: [
      isRequiredErrorBag.message,
      isValidLastnameErrorBag.message,
    ].filter(Boolean),
  };
};

export const emailErrorBag = (value: string) => {
  const { isRequired, email } = validation;
  const isRequiredErrorBag = isRequired.check(value);
  const emailErrorBag = email.check(value);
  return {
    error: isRequiredErrorBag.error || emailErrorBag.error,
    message: [isRequiredErrorBag.message, emailErrorBag.message].filter(
      Boolean
    ),
  };
};

export const phoneErrorBag = (value: string) => {
  const { isRequired, phone } = validation;
  const isRequiredErrorBag = isRequired.check(value);
  const phoneErrorBag = phone.check(value);
  return {
    error: isRequiredErrorBag.error || phoneErrorBag.error,
    message: [isRequiredErrorBag.message, phoneErrorBag.message].filter(
      Boolean
    ),
  };
};

const prepareErrorBags = (
  fields: Fields
): Record<keyof Values, { error: boolean; message: (string | null)[] }> => {
  return {
    firstname: firtnameErrorBag(fields.firstname.value),
    lastname: lastnameErrorBag(fields.lastname.value),
    email: emailErrorBag(fields.email.value),
    phone: phoneErrorBag(fields.phone.value),
  };
};

const initFields = (values: Values) => {
  return Object.entries(values).reduce((acc, [field, value]) => {
    return {
      ...acc,
      [field]: {
        value,
        dirty: false,
      },
    };
  }, {} as Fields);
};

const useForm = (
  initialValues: Values = { firstname: "", lastname: "", email: "", phone: "" }
) => {
  const [fields, setField] = useState<Fields>(() => initFields(initialValues));

  const [setFirstname, setLastname, setEmail, setPhone] = useMemo(
    () =>
      ["firstname", "lastname", "email", "phone"].map(
        (key) => (value: string) =>
          setField({ ...fields, [key]: { value, dirty: true } })
      ),
    [fields]
  );

  const errors = useMemo(() => {
    const { firstname, lastname, email, phone } = prepareErrorBags(fields);
    return {
      firstname,
      lastname,
      email,
      phone,
    };
  }, [fields]);

  const submitable = Object.keys(fields).every(
    (key) => errors[key as keyof Values].error === false
  );

  const isStep1Valid = ["firstname", "lastname"].every(
    (key) => errors[key as keyof Values].error === false
  );

  const actions = {
    setFirstname,
    setLastname,
    setEmail,
    setPhone,
  };

  return {
    fields,
    actions,
    errors,
    submitable,
    isStep1Valid,
  };
};

export default useForm;
