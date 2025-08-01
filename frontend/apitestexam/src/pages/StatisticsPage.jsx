import React, { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { UrlContext } from "../context/UrlContext.jsx";
import UrlStats from "../components/UrlStats.jsx";

function StatisticsPage() {
  const { urls } = useContext(UrlContext);
  return (
    <Box p={3}>
      <Typography variant="h4">Shortened URL Statistics</Typography>
      <UrlStats urls={urls} />
      <Button href="/" sx={{ mt: 2 }}>Back</Button>
    </Box>
  );
}
export default StatisticsPage;
