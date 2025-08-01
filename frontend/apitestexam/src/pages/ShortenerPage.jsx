import React, { useContext, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ShortenerForm from "../components/ShortenerForm.jsx";
import UrlList from "../components/UrlList.jsx";
import { UrlContext } from "../context/UrlContext.jsx";

function ShortenerPage() {
  const { urls, dispatch } = useContext(UrlContext);
  const [result, setResult] = useState([]);

  return (
    <Box p={3}>
      <Typography variant="h4">URL Shortener</Typography>
      <ShortenerForm setResult={setResult} dispatch={dispatch} urls={urls} />
      <UrlList urls={result} />
      <Button variant="contained" sx={{ mt: 2 }} href="/stats">
        View Statistics
      </Button>
    </Box>
  );
}

export default ShortenerPage;