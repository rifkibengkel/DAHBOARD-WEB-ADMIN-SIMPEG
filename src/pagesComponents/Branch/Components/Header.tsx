import { Add } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useUtils } from "@/contexts";
import { ButtonPrimary } from "@/components/Button";

const BranchHeader = () => {
  const { actions } = useUtils();

  const handleCreate = () => {
    actions.SHOW_MODAL_CREATE(true);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography fontSize="22px">Master Cabang</Typography>
      <Box>
        <ButtonPrimary startIcon={<Add />} onClick={handleCreate}>
          Tambah Baru
        </ButtonPrimary>
      </Box>
    </Box>
  );
};

export default BranchHeader;
