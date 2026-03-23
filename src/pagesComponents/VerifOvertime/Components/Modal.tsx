import React from "react";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Field, Form, FormikProvider, useFormik } from "formik";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { ButtonPrimary } from "@/components/Button";
import { SelectValidation } from "@/components/Input/Select";
import { TextFieldValidation } from "@/components/Input/TextField";
import { useUtils } from "@/contexts";
import { logout } from "@/hooks/unauthorized";
import { DetailOvertime, ModalVerifOvertimeProps } from "../VerifOvertime.types";
import { VerifOvertimeSchema } from "../VerifOvertime.schema";

const ModalVerifOvertime: React.FC<ModalVerifOvertimeProps> = ({ keys }) => {
  const { states, actions } = useUtils();
  const { mutate } = useSWRConfig();
  const { modal_detail } = states;

  const [overtime, setOvertime] = React.useState<DetailOvertime | null>(null);

  const router = useRouter();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      status: "",
      notes: "",
    },
    validationSchema: VerifOvertimeSchema,
    onSubmit: async (values) => {
      const response = await fetch("/api/overtime/approved", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: overtime?.id,
          status: +values.status,
          notes: values.notes,
        }),
      });

      const getResponse = await response.json();

      if (response.status === 201) {
        mutate(keys);
        actions.SHOW_SNACKBAR({
          show: true,
          type: "success",
          message: getResponse.data.message,
          position: {
            horizontal: "right",
            vertical: "bottom",
          },
        });
        actions.SHOW_MODAL_DETAIL({
          show: false,
          id: 0,
        });
        formik.resetForm();
      }
      if (response.status >= 400) {
        if (response.status === 403) {
          await logout(router);
          return;
        }
        actions.SHOW_SNACKBAR({
          show: true,
          type: "error",
          message: getResponse.data.message,
          position: {
            horizontal: "right",
            vertical: "bottom",
          },
        });
      }
    },
  });

  const statusOptions = [
    {
      id: 2,
      name: "Rejected",
    },
    {
      id: 1,
      name: "Approved",
    },
  ];

  const handleClose = () => {
    formik.resetForm();
    actions.SHOW_MODAL_DETAIL({
      show: false,
      id: 0,
    });
    setTimeout(() => {
      setOvertime(null);
    }, 500);
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchNews = async () => {
      if (modal_detail.id) {
        const response = await fetch(`/api/overtime/detail?id=${modal_detail.id}`, {
          method: "GET",
          signal,
        });
        const getResponse = await response.json();

        if (response.status === 200) {
          setOvertime(getResponse.data);
        }

        if (response.status === 403) {
          await logout(router);
        }
      }
    };

    fetchNews();

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal_detail.id]);

  return (
    <Dialog
      open={modal_detail.show}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { maxHeight: 735, borderRadius: "12px", background: theme.palette.common.white, boxShadow: "none" } }}
    >
      <DialogTitle sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Typography fontSize="16px" fontWeight={500}>
          Konfirmasi Approval
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            ":hover": {
              background: "transparent",
            },
          }}
        >
          <Close sx={{ color: theme.palette.grey["300"] }} />
        </IconButton>
      </DialogTitle>
      <FormikProvider value={formik}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Form style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid
                  container
                  rowGap={2}
                  sx={{
                    maxHeight: 400,
                    background: theme.palette.grey["100"],
                    borderRadius: "12px",
                    border: `1px solid ${theme.palette.grey["200"]}`,
                    px: 2.5,
                    py: 2,
                    overflowY: "scroll",
                  }}
                >
                  <Grid item xs={12}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      fullWidth
                    >
                      <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.25 }}>
                        Nama Pegawai
                      </FormLabel>
                      {overtime ? (
                        <Typography fontSize="12px" color={theme.palette.text.secondary}>
                          {overtime.name}
                        </Typography>
                      ) : (
                        <Skeleton height={15} width={100} />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      fullWidth
                    >
                      <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.25 }}>NIP</FormLabel>
                      {overtime ? (
                        <Typography fontSize="12px" color={theme.palette.text.secondary}>
                          {overtime.nip}
                        </Typography>
                      ) : (
                        <Skeleton height={15} width={100} />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      fullWidth
                    >
                      <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.25 }}>
                        Departement
                      </FormLabel>
                      {overtime ? (
                        <Typography fontSize="12px" color={theme.palette.text.secondary}>
                          {overtime.departement}
                        </Typography>
                      ) : (
                        <Skeleton height={15} width={100} />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      fullWidth
                    >
                      <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.25 }}>Jam</FormLabel>
                      {overtime ? (
                        <Typography fontSize="12px" color={theme.palette.text.secondary}>
                          {overtime.startTime} {"->"} {overtime.endTime}
                        </Typography>
                      ) : (
                        <Skeleton height={15} width={100} />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      fullWidth
                    >
                      <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.25 }}>
                        Jenis Lembur
                      </FormLabel>
                      {overtime ? (
                        <Typography fontSize="12px" color={theme.palette.text.secondary}>
                          {overtime.category}
                        </Typography>
                      ) : (
                        <Skeleton height={15} width={100} />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.5 }}>
                        Deskripsi Lembur
                      </FormLabel>
                      {overtime ? (
                        <Typography fontSize="12px" color={theme.palette.text.secondary}>
                          {overtime.description}
                        </Typography>
                      ) : (
                        <Skeleton height={15} />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.5 }}>Dokumen</FormLabel>
                      {overtime ? (
                        <>
                          {overtime.documents.length > 0 ? (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                              {overtime.documents.map((doc, index) => (
                                <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <Typography fontSize="12px" color={theme.palette.text.secondary}>
                                    {doc.description || "-"}
                                  </Typography>
                                  {doc.document && (
                                    <Typography
                                      fontSize="12px"
                                      color={"#36597D"}
                                      sx={{ display: "inline-block", width: "auto", textDecoration: "underline", cursor: "pointer" }}
                                      onClick={() => (doc.document ? window.open(doc.document) : undefined)}
                                    >
                                      Download
                                    </Typography>
                                  )}
                                </Box>
                              ))}
                            </Box>
                          ) : (
                            <Typography fontSize="12px" color={theme.palette.primary.main}>
                              -
                            </Typography>
                          )}
                        </>
                      ) : (
                        <Skeleton height={15} />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      fullWidth
                    >
                      <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.5 }}>
                        Approval Asistent Manager
                      </FormLabel>
                      {overtime ? (
                        <Typography fontSize="12px" color={theme.palette.text.secondary}>
                          {overtime.approvals.find((approval) => approval.position === "ASISTEN MANAGER")?.statusText || "-"}
                        </Typography>
                      ) : (
                        <Skeleton height={15} width={100} />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      fullWidth
                    >
                      <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.5 }}>
                        Approval Manager
                      </FormLabel>
                      {overtime ? (
                        <Typography fontSize="12px" color={theme.palette.text.secondary}>
                          {overtime.approvals.find((approval) => approval.position === "MANAGER")?.statusText || "-"}
                        </Typography>
                      ) : (
                        <Skeleton height={15} width={100} />
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel>Status</FormLabel>
                  {overtime?.status !== "Approved" ? (
                    <Field component={SelectValidation} name="status" placeholder="Pilih Status" options={statusOptions} />
                  ) : (
                    <Field component={TextFieldValidation} name="status" value={overtime?.status ?? ""} placeholder="Status" disabled />
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel>Alasan (Apabila Rejected)</FormLabel>
                  <Field
                    component={TextFieldValidation}
                    name="notes"
                    placeholder="Tulis Alasan"
                    disabled={+formik.values.status === 1 || overtime?.status === "Approved"}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Form>
        </DialogContent>
        <DialogActions sx={{ py: 2.5, px: 3 }}>
          <ButtonPrimary
            onClick={handleClose}
            sx={{
              background: "#36597D",
              ":hover": { background: "#36597D" },
            }}
            fullWidth
          >
            Kembali
          </ButtonPrimary>
          <ButtonPrimary onClick={handleSubmit} disabled={formik.isSubmitting} fullWidth>
            Submit
          </ButtonPrimary>
        </DialogActions>
      </FormikProvider>
    </Dialog>
  );
};

export default ModalVerifOvertime;
