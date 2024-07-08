import * as React from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";

import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

import { styled } from "@mui/system";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function PaymentForm({ paymentDetails, setPaymentDetails }) {
  const [paymentType, setPaymentType] = React.useState("creditCard");
  const [cardNumber, setCardNumber] = React.useState(paymentDetails.cardNumber);
  const [cardName, setCardName] = React.useState(paymentDetails.cardName);
  const [cvv, setCvv] = React.useState(paymentDetails.cvv);
  const [expirationDate, setExpirationDate] = React.useState(
    paymentDetails.expDate,
  );
  const [errors, setErrors] = React.useState({});

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "cardName":
        if (!value.trim()) {
          error = "Name is required";
        }
        break;
      case "cardNumber":
        if (!value.trim()) {
          error = "Card number is required";
        } else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(value)) {
          error = "Invalid card number";
        }
        break;
      case "cvv":
        if (!value.trim()) {
          error = "CVV is required";
        } else if (!/^\d{3}$/.test(value)) {
          error = "Invalid CVV";
        }
        break;
      case "expDate":
        if (!value.trim()) {
          error = "Expiration date is required";
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          error = "Invalid expiration date";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleNameChange = (event) => {
    const value = event.target.value.trimStart();
    setCardName(value);
    setPaymentDetails((paymentDetails) => ({
      ...paymentDetails,
      cardName: value,
    }));
    validateField("cardName", value);
  };

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setCardNumber(formattedValue);
      setPaymentDetails((paymentDetails) => ({
        ...paymentDetails,
        cardNumber: formattedValue,
      }));
      validateField("cardNumber", formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
      setPaymentDetails((paymentDetails) => ({
        ...paymentDetails,
        cvv: value,
      }));
      validateField("cvv", value);
    }
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
      setPaymentDetails((paymentDetails) => ({
        ...paymentDetails,
        expDate: formattedValue,
      }));
      validateField("expDate", formattedValue);
    }
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            flexDirection: { sm: "column", md: "row" },
            gap: 2,
          }}
        >
          <Card
            raised={paymentType === "creditCard"}
            sx={{
              maxWidth: { sm: "100%", md: "50%" },
              flexGrow: 1,
              outline: "1px solid",
              outlineColor:
                paymentType === "creditCard" ? "primary.main" : "divider",
              backgroundColor:
                paymentType === "creditCard" ? "background.default" : "",
            }}
          >
            <CardActionArea onClick={() => setPaymentType("creditCard")}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CreditCardRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Card</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            raised={paymentType === "bankTransfer"}
            sx={{
              maxWidth: { sm: "100%", md: "50%" },
              flexGrow: 1,
              outline: "1px solid",
              outlineColor:
                paymentType === "bankTransfer" ? "primary.main" : "divider",
              backgroundColor:
                paymentType === "bankTransfer" ? "background.default" : "",
            }}
          >
            <CardActionArea onClick={() => setPaymentType("bankTransfer")}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <AccountBalanceRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Bank account</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      {paymentType === "creditCard" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              height: { xs: 300, sm: 350, md: 375 },
              width: "100%",
              borderRadius: "20px",
              border: "1px solid ",
              borderColor: "divider",
              backgroundColor: "background.paper",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle2">Credit card</Typography>
              <CreditCardRoundedIcon sx={{ color: "text.secondary" }} />
            </Box>
            <SimCardRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                transform: "rotate(90deg)",
                color: "text.secondary",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-number" required>
                  Card number
                </FormLabel>
                <OutlinedInput
                  id="card-number"
                  autoComplete="card-number"
                  placeholder="0000 0000 0000 0000"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  error={!!errors.cardNumber}
                />
                {errors.cardNumber && (
                  <FormHelperText error>{errors.cardNumber}</FormHelperText>
                )}
              </FormGrid>
              <FormGrid sx={{ maxWidth: "20%" }}>
                <FormLabel htmlFor="cvv" required>
                  CVV
                </FormLabel>
                <OutlinedInput
                  id="cvv"
                  autoComplete="CVV"
                  placeholder="123"
                  required
                  value={cvv}
                  onChange={handleCvvChange}
                  error={!!errors.cvv}
                />
                {errors.cvv && (
                  <FormHelperText error>{errors.cvv}</FormHelperText>
                )}
              </FormGrid>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-name" required>
                  Name
                </FormLabel>
                <OutlinedInput
                  id="card-name"
                  autoComplete="card-name"
                  placeholder="John Smith"
                  value={cardName}
                  onChange={handleNameChange}
                  required
                  error={!!errors.cardName}
                />
                {errors.cardName && (
                  <FormHelperText error>{errors.cardName}</FormHelperText>
                )}
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-expiration" required>
                  Expiration date
                </FormLabel>
                <OutlinedInput
                  id="card-expiration"
                  autoComplete="card-expiration"
                  placeholder="MM/YY"
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                  required
                  error={!!errors.expDate}
                />
                {errors.expDate && (
                  <FormHelperText error>{errors.expDate}</FormHelperText>
                )}
              </FormGrid>
            </Box>
          </Box>
          <FormControlLabel
            control={<Checkbox name="saveCard" />}
            label="Remember credit card details for next time"
          />
        </Box>
      )}

      {paymentType === "bankTransfer" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            Your order will be processed once we receive the funds.
          </Alert>
          <Typography variant="subtitle1" fontWeight="medium">
            Bank account
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please transfer the payment to the bank account details shown below.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Bank:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              Mastercredit
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Account number:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              123456789
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Routing number:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              987654321
            </Typography>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
