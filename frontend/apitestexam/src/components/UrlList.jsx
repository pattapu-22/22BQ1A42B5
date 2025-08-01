import React from "react";
import { List, ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function formatDate(iso) {
  return new Date(iso).toLocaleString();
}

export default function UrlList({ urls }) {
  const handleCopy = (txt) => navigator.clipboard.writeText(txt);

  return (
    <List>
      {urls.map((u) => (
        <ListItem key={u.shortCode} divider>
          <ListItemText
            primary={
              <>
                <Typography variant="body2">
                  <strong>Short:</strong> <a href={`/${u.shortCode}`}>{window.location.origin}/{u.shortCode}</a>{" "}
                  <IconButton onClick={()=>handleCopy(`${window.location.origin}/${u.shortCode}`)}>
                    <ContentCopyIcon fontSize="small"/>
                  </IconButton>
                </Typography>
                <Typography variant="body2">
                  <strong>Exp:</strong> {formatDate(u.expiryAt)}<br/>
                  <strong>Original:</strong> {u.longUrl}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}