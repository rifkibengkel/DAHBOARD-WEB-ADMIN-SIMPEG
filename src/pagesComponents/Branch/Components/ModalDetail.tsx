import React from "react";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import { ButtonPrimary } from "@/components/Button";
import { TextFieldValidation } from "@/components/Input/TextField";
import { useUtils } from "@/contexts";
import { logout } from "@/hooks/unauthorized";
import { DetailBranch, ModalDetailBranchProps } from "../Branch.types";
import { EditBranchSchema } from "../Branch.schema";
import MapComponent from "./Map";

const ModalDetailBranch: React.FC<ModalDetailBranchProps> = ({ keys }) => {
  const { states, actions } = useUtils();
  const { mutate } = useSWRConfig();
  const { modal_detail } = states;

  const [branch, setBranch] = React.useState<DetailBranch | null>(null);

  const router = useRouter();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      name: branch?.name ?? "",
    },
    validationSchema: EditBranchSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const response = await fetch("/api/master/update_branch", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          cabangId: branch?.id,
          name: values.name,
          mapPointing: branch?.cabangMapPointings,
        }),
      });

      const getResponse = await response.json();

      if (response.status === 200) {
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

  const handleClose = () => {
    formik.resetForm();
    actions.SHOW_MODAL_DETAIL({
      show: false,
      id: 0,
    });
    setTimeout(() => {
      setBranch(null);
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
        const response = await fetch(`/api/master/detail_branch?id=${modal_detail.id}`, {
          method: "GET",
          signal,
        });
        const getResponse = await response.json();

        if (response.status === 200) {
          setBranch(getResponse.data);
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
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { maxHeight: 735, borderRadius: "12px", background: theme.palette.common.white, boxShadow: "none" } }}
    >
      <DialogTitle sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Typography fontSize="16px" fontWeight={500}>
          Detail Cabang
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
                <FormControl fullWidth>
                  <Field component={TextFieldValidation} name="name" placeholder="Nama" />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ height: 475 }}>
                {branch && <MapComponent type="edited" branch={{ cabangMapPointings: branch.cabangMapPointings }} setBranch={setBranch} />}
              </Grid>
            </Grid>
          </Form>
        </DialogContent>
        <DialogActions sx={{ pb: 2.5, px: 3 }}>
          <ButtonPrimary
            onClick={handleClose}
            sx={{
              width: 150,
              background: "#36597D",
              ":hover": { background: "#36597D" },
            }}
          >
            Kembali
          </ButtonPrimary>
          <ButtonPrimary onClick={handleSubmit} sx={{ width: 150 }} disabled={formik.isSubmitting}>
            Submit
          </ButtonPrimary>
        </DialogActions>
      </FormikProvider>
    </Dialog>
  );
};

export default ModalDetailBranch;
