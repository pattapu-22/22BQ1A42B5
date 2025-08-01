import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UrlContext } from "../context/UrlContext.jsx";
import { Box, CircularProgress, Typography } from "@mui/material";

// Dummy function for IP->Location. In reality you'd call a free API client-side, if allowed.
async function getGeo() {
  return "Unknown"; // Or fetch("https://ip-api.io/json/") etc.
}

export default function RedirectHandler() {
  const { shortCode } = useParams();
  const { urls, dispatch } = useContext(UrlContext);
  const navigate = useNavigate();

  useEffect(() => {
    const match = urls.find(u => u.shortCode === shortCode);
    if (!match) {
      setTimeout(() => navigate("/"), 1500);
      return;
    }
    if (new Date(match.expiryAt) < new Date()) {
      setTimeout(() => navigate("/"), 2000);
      return;
    }
    getGeo().then(geo => {
      dispatch({
        type: "ADD_CLICK",
        payload: {
          shortCode: match.shortCode,
          click: {
            timestamp: new Date().toISOString(),
            referrer: document.referrer || "Direct",
            geo
          }
        }
      });
      window.location.replace(match.longUrl);
    });
    // eslint-disable-next-line
  }, [shortCode]);

  return (
    <Box m={8} textAlign="center">
      <Typography variant="h5">Redirecting...</Typography>
      <CircularProgress />
    </Box>
  );
}
