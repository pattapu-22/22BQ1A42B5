import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function AnalyticsTable({ clicks }) {
  if (!clicks || clicks.length === 0) return <div>No clicks yet.</div>;
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Timestamp</TableCell>
          <TableCell>Referrer</TableCell>
          <TableCell>Geolocation</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {clicks.map((c, idx) =>
          <TableRow key={idx}>
            <TableCell>{new Date(c.timestamp).toLocaleString()}</TableCell>
            <TableCell>{c.referrer || "Direct/Unknown"}</TableCell>
            <TableCell>{c.geo || "Unknown"}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
