import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AnalyticsTable from "./AnalyticsTable.jsx";

function formatDate(iso) {
  return new Date(iso).toLocaleString();
}
export default function UrlStats({ urls }) {
  if (urls.length === 0) return <Typography>No URLs shortened yet.</Typography>
  return (
    <>
      {urls.map(u => (
        <Accordion key={u.shortCode}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography><strong>{window.location.origin}/{u.shortCode}</strong> ({u.clicks.length} clicks)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              <strong>Original:</strong> {u.longUrl} <br/>
              <strong>Created:</strong> {formatDate(u.createdAt)}<br/>
              <strong>Expires:</strong> {formatDate(u.expiryAt)}
            </Typography>
            <AnalyticsTable clicks={u.clicks} />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
