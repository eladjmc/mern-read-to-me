import React, { FC } from "react";
import { Typography, Paper, Avatar, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CakeIcon from "@mui/icons-material/Cake";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FolderIcon from "@mui/icons-material/Folder";
import DocumentIcon from "@mui/icons-material/Description";

interface UserDetails {
  name: string;
  age: number;
  createdAt: string;
  totalDirectories: number;
  totalDocuments: number;
}

interface UserDetailsCardProps {
  userDetails: UserDetails;
}

interface DetailRowProps {
  label: string;
  value: string | number;
  icon: React.ReactElement;
}

const DetailRow: FC<DetailRowProps> = ({ label, value, icon }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      textAlign: "left",
      justifyContent: "center",
    }}
  >
    <Typography
    component="span"
      color="textSecondary"
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Box sx={{ width: 30 }}>{React.cloneElement(icon)}</Box>
      {label}: {value}
    </Typography>
  </Box>
);

const UserDetailsCard: FC<UserDetailsCardProps> = ({ userDetails }) => {
  const theme = useTheme();

  const details = [
    { label: "Age", value: userDetails.age, icon: <CakeIcon /> },
    {
      label: "Created at",
      value: userDetails.createdAt,
      icon: <ScheduleIcon />,
    },
    {
      label: "Total Directories",
      value: userDetails.totalDirectories,
      icon: <FolderIcon />,
    },
    {
      label: "Total Documents",
      value: userDetails.totalDocuments,
      icon: <DocumentIcon />,
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 7,
        position: "relative",
        overflow: "visible",
        paddingTop: "30px",
      }}
    >
      <Avatar
        sx={{
          width: 104,
          height: 104,
          fontSize: 32,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          position: "absolute",
          top: -52,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <Box sx={{ textAlign: "center", paddingBottom: 2, paddingTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          {userDetails.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        {details.map((detail) => (
          <DetailRow key={detail.label} {...detail} />
        ))}
      </Box>
    </Paper>
  );
};
export default UserDetailsCard;
