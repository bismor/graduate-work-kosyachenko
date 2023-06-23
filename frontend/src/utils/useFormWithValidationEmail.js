import { useCallback, useState } from "react";

export default function useFormWithValidationEmail() {
  const [value, setValue] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("");
  const [IsErrorEmail, setIsErrorEmail] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const onChange = useCallback((event, setErrorRequest) => {
    if (event.target.value === "") {
      setIsDirty(false);
    }

    setValue(event.target.value);
    setIsEmailValid(isValidEmail(event.target.value));
    setIsErrorEmail("Некорректный Email");

    setErrorRequest(false);
  }, []);

  return {
    value,
    isEmailValid,
    IsErrorEmail,
    isDirty,
    setValue,
    setIsEmailValid,
    setIsErrorEmail,
    setIsDirty,
    onChange,
  };
}
