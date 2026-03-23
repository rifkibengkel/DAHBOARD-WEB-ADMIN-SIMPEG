import React from "react";
import { useRouter } from "next/router";
import {
  Dialog,
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
import { useUtils } from "@/contexts";
import { logout } from "@/hooks/unauthorized";
import { DetailAbsence } from "../Absence.types";

const ModalDetailAbsence: React.FC = () => {
  const { states, actions } = useUtils();
  const { modal_detail } = states;

  const [absence, setAbsence] = React.useState<DetailAbsence | null>(null);

  console.log(absence);

  const router = useRouter();
  const theme = useTheme();

  const handleClose = () => {
    actions.SHOW_MODAL_DETAIL({
      show: false,
      id: 0,
    });
    setTimeout(() => {
      setAbsence(null);
    }, 500);
  };

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchNews = async () => {
      if (modal_detail.id) {
        const response = await fetch(`/api/absence/detail?id=${modal_detail.id}`, {
          method: "GET",
          signal,
        });
        const getResponse = await response.json();

        if (response.status === 200) {
          setAbsence(getResponse.data);
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
          Detail Absen
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
      <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                  {absence ? (
                    <Typography fontSize="12px" color={theme.palette.text.secondary}>
                      {absence.employeName}
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
                  {absence ? (
                    <Typography fontSize="12px" color={theme.palette.text.secondary}>
                      {absence.nip}
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
                  <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.25 }}>Departement</FormLabel>
                  {absence ? (
                    <Typography fontSize="12px" color={theme.palette.text.secondary}>
                      {absence.departement}
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
                  <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.25 }}>Tanggal</FormLabel>
                  {absence ? (
                    <Typography fontSize="12px" color={theme.palette.text.secondary}>
                      {absence.date}
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
                  <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.25 }}>Jam Masuk</FormLabel>
                  {absence ? (
                    <Typography fontSize="12px" color={theme.palette.text.secondary}>
                      {absence.clockIn} ({absence.clockInTypeText})
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
                  <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.25 }}>Jam Keluar</FormLabel>
                  {absence ? (
                    <Typography fontSize="12px" color={theme.palette.text.secondary}>
                      {absence.clockOut} ({absence.clockOutTypeText})
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
                  <FormLabel sx={{ color: theme.palette.text.primary, fontSize: "12px", fontWeight: 500, mb: 0.25 }}>Status</FormLabel>
                  {absence ? (
                    <Typography fontSize="12px" color={theme.palette.text.secondary}>
                      {absence.statusText}
                    </Typography>
                  ) : (
                    <Skeleton height={15} width={100} />
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetailAbsence;
