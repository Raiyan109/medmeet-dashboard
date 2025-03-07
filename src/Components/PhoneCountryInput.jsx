import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const PhoneCountryInput = ({ disabled, value, setPhoneNumber }) => {
  const handleCountryChange = (value) => {
    console.log("hello");
  };
  return (
    <PhoneInput
      disabled={disabled}
      className="custom-phone "
      placeholder="Enter your phone number"
      international
      flags={flags}
      defaultCountry="US"
      value={value}
      onChange={setPhoneNumber}
    />
  );
};

export default PhoneCountryInput;
