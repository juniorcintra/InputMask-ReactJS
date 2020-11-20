import React, { useState, useEffect, useRef } from "react";
import ReactInputMask from "react-input-mask";
import { useField } from "@rocketseat/unform";

export default function InputMask({
  type,
  label,
  name,
  value,
  onChange,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [realValue, setRealValue] = useState(defaultValue || "");

  let mask = "";
  let formatChars = { 9: "[0-9]", a: "[A-Z, a-z]", "*": "[A-Z, a-z, 0-9]" };

  switch (type) {
    case "telefone":
      const rawTelefone = realValue.replace(/[^\d]+/g, "");
      if (rawTelefone.length > 10) {
        mask = "(99) 99999-9999";
      } else {
        mask = "(99) 9999-9999?";
      }
      formatChars = { 9: "[0-9]", "?": "[0-9]" };
      break;
    case "cpf":
      mask = "999.999.999-99";
      formatChars = { 9: "[0-9]", "?": "[0-9]" };
      break;
    case "cnpj":
      mask = "99.999.999/9999-99";
      formatChars = { 9: "[0-9]", "?": "[0-9]" };
      break;
    case "cep":
      mask = "99999-999";
      formatChars = { 9: "[0-9]", "?": "[0-9]" };
      break;
    case "cvc":
      mask = "999";
      formatChars = { 9: "[0-9]", "?": "[0-9]" };
      break;
    case "card":
      mask = "9999.9999.9999.9999";
      formatChars = { 9: "[0-9]", "?": "[0-9]" };
      break;
    case "date":
      mask = "99/99/9999";
      formatChars = { 9: "[0-9]", "?": "[0-9]" };
      break;
  }

  function handleMask(event) {
    const { value } = event.target;
    if (onChange !== undefined) {
      event.target.value = value;
      onChange(event);
    }
    return setRealValue(value);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: "props.value",
      clearValue: (inputMaskRef) => {
        inputMaskRef.setInputValue(defaultValue);
      },
    });

    if (value !== undefined) {
      setRealValue(value);
    }
  }, [ref.current, fieldName, value]);

  return (
    <>
      {label && <label>{label}</label>}
      <ReactInputMask
        type="text"
        maskChar=""
        name={fieldName}
        value={realValue}
        mask={mask}
        formatChars={formatChars}
        onChange={(e) => handleMask(e)}
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}
