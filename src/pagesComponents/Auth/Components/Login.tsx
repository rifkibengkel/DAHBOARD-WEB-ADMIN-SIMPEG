import React from "react";
import Image from "next/image";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { Box, FormControl, Grid, IconButton, InputAdornment, Stack, Typography, useTheme } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useUtils } from "@/contexts";
import { ContainerPaper } from "@/components/Container";
import { ButtonPrimary } from "@/components/Button";
import { TextFieldValidation } from "@/components/Input/TextField";
import { LoginSchema } from "../Auth.schema";

const Login: React.FC = () => {
  const { actions } = useUtils();

  const theme = useTheme();

  const [show, setShow] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const getResponse = await response.json();

      if (response.status === 201) {
        window.location.href = "/redirect";
      }
      if (response.status >= 400) {
        actions.SHOW_SNACKBAR({
          show: true,
          type: "error",
          message: getResponse.data.message,
          position: {
            horizontal: "center",
            vertical: "top",
          },
        });
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off">
          <ContainerPaper
            width={400}
            sx={{
              px: 3,
              py: 5,
              border: "1px solid #FFFFFF4D",
              backdropFilter: "none",
              borderRadius: "20px",
            }}
          >
            <Box display="flex" flexDirection="column" gap={0.5} mb={4}>
              <Typography fontSize="22px" fontWeight={600}>
                Login
              </Typography>
              <Typography fontSize="14px" color={theme.palette.text.secondary}>
                Silahkan gunakan NIP anda untuk masuk
              </Typography>
            </Box>
            <Grid container spacing={2} mb={10}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Field
                    component={TextFieldValidation}
                    name="username"
                    placeholder="Nomor Induk"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ ml: 1 }}>
                          <Image src={"/assets/icons/ic_employee.png"} alt="Icon" height={24} width={24} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Field
                    component={TextFieldValidation}
                    name="password"
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ ml: 1 }}>
                          <Image src={"/assets/icons/ic_lock.png"} alt="Icon" height={24} width={24} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShow((prev) => !prev)}>
                            {show ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography fontSize="12px" fontWeight={600} sx={{ cursor: "pointer", textDecoration: "underline" }}>
                  Lupa Kata Sandi?
                </Typography>
              </Grid>
            </Grid>
            <Stack alignItems="center" gap={1}>
              <ButtonPrimary type="submit" fullWidth>
                Login
              </ButtonPrimary>
            </Stack>
          </ContainerPaper>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default Login;
