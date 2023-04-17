import React, { ReactNode } from "react";
import {
  Box,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface DocumentDrawerProps {
  title?: string;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  children: ReactNode;
  errorMessage?: string;
}

export const DocumentDrawer: React.FC<DocumentDrawerProps> = ({
  title,
  drawerOpen,
  setDrawerOpen,
  children,
  errorMessage = '',
}) => {
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <Stack height={1} sx={{ width: 300, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Stack flexGrow={1} >{children}</Stack>
        {errorMessage && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
              color: "error.main",
            }}
          >
            <ErrorOutlineIcon />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              {errorMessage}
            </Typography>
          </Box>
        )}
      </Stack>
    </Drawer>
  );
};