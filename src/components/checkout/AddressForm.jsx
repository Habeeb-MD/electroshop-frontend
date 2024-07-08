import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/system";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({ addressFormData, setAddressFormData }) {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
      case "address1":
      case "city":
      case "state":
      case "country":
        if (!value.trim()) {
          error = "This field is required";
        }
        break;
      case "zip":
        if (!value.trim()) {
          error = "Zip code is required";
        } else if (!/^\d{5}(-\d{4})?$/.test(value)) {
          error = "Invalid zip code";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newData = {
      ...addressFormData,
      [name]: value,
    };
    setAddressFormData(newData);
    validateField(name, value);
  };

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="firstName" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="firstName"
          name="firstName"
          type="name"
          placeholder="John"
          autoComplete="first name"
          value={addressFormData.firstName}
          onChange={handleChange}
          required
          error={!!errors.firstName}
        />
        {errors.firstName && (
          <FormHelperText error>{errors.firstName}</FormHelperText>
        )}
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="lastName" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="lastName"
          name="lastName"
          type="lastName"
          placeholder="Snow"
          autoComplete="last name"
          value={addressFormData.lastName}
          onChange={handleChange}
          required
          error={!!errors.lastName}
        />
        {errors.lastName && (
          <FormHelperText error>{errors.lastName}</FormHelperText>
        )}
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
          Address line 1
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="address1"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          value={addressFormData.address1}
          onChange={handleChange}
          required
          error={!!errors.address1}
        />
        {errors.address1 && (
          <FormHelperText error>{errors.address1}</FormHelperText>
        )}
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address2">Address line 2</FormLabel>
        <OutlinedInput
          id="address2"
          name="address2"
          type="address2"
          placeholder="Apartment, suite, unit, etc. (optional)"
          autoComplete="shipping address-line2"
          value={addressFormData.address2}
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder="New York"
          autoComplete="City"
          value={addressFormData.city}
          onChange={handleChange}
          required
          error={!!errors.city}
        />
        {errors.city && <FormHelperText error>{errors.city}</FormHelperText>}
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="state"
          placeholder="NY"
          autoComplete="State"
          value={addressFormData.state}
          onChange={handleChange}
          required
          error={!!errors.state}
        />
        {errors.state && <FormHelperText error>{errors.state}</FormHelperText>}
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="12345"
          autoComplete="shipping postal-code"
          value={addressFormData.zip}
          onChange={handleChange}
          required
          error={!!errors.zip}
        />
        {errors.zip && <FormHelperText error>{errors.zip}</FormHelperText>}
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="country"
          placeholder="United States"
          autoComplete="shipping country"
          value={addressFormData.country}
          onChange={handleChange}
          required
          error={!!errors.country}
        />
        {errors.country && (
          <FormHelperText error>{errors.country}</FormHelperText>
        )}
      </FormGrid>
      <FormGrid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        />
      </FormGrid>
    </Grid>
  );
}
