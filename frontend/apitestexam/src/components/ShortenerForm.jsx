    import React, { useState } from "react";
import { Box, TextField, Button, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

// helpers
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch { return false; }
}

function genShortCode(existing) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code;
  do {
    code = "";
    for(let i=0; i<6; i++) code += charset[Math.floor(Math.random()*charset.length)];
  } while(existing.has(code));
  return code;
}

export default function ShortenerForm({ setResult, dispatch, urls }) {
  const [inputs, setInputs] = useState([{
    longUrl: "", validMinutes: "", shortCode: "", error: {}
  }]);
  const maxForms = 5;
  const allCodes = new Set(urls.map(u=>u.shortCode));

  const handleChange = (idx, name, value) => {
    const updated = inputs.map((form,i) =>
      i === idx ? { ...form, [name]: value, error: { ...form.error, [name]: "" } } : form
    );
    setInputs(updated);
  };

  const addForm = () => {
    if (inputs.length < maxForms)
      setInputs([...inputs, { longUrl: "", validMinutes: "", shortCode: "", error: {} }]);
  };
  const removeForm = (idx) => setInputs(inputs.filter((_,i)=>i!==idx));

  const validate = (input) => {
    const error = {};
    if (!isValidUrl(input.longUrl)) error.longUrl = "Invalid URL";
    if (input.shortCode && (!/^[a-zA-Z0-9]{4,20}$/.test(input.shortCode) || allCodes.has(input.shortCode)))
      error.shortCode = "Invalid, not unique or not alphanumeric (4-20)";
    if (input.validMinutes && (isNaN(Number(input.validMinutes)) || Number(input.validMinutes)<1))
      error.validMinutes = "Should be a number >= 1";
    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();
    let hasError = false;
    const newForms = inputs.map(form => {
      const error = validate(form);
      if (Object.keys(error).length) hasError = true;
      return { ...form, error };
    });
    setInputs(newForms);
    if(hasError) return;

    const now = new Date();
    const newUrls = newForms.map(form => {
      const code = form.shortCode || genShortCode(allCodes);
      allCodes.add(code);
      let expiryAt = new Date(now);
      expiryAt.setMinutes(expiryAt.getMinutes() + (form.validMinutes?Number(form.validMinutes):30));
      return {
        id: uuidv4(),
        longUrl: form.longUrl,
        shortCode: code,
        createdAt: now.toISOString(),
        expiryAt: expiryAt.toISOString(),
        clicks: []
      }
    });
    dispatch({ type: "ADD_URLS", payload: newUrls });
    setResult(newUrls);
    setInputs([{ longUrl:"", validMinutes:"", shortCode:"", error:{} }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        {inputs.map((input, idx) => (
          <Grid container item xs={12} spacing={2} key={idx}>
            <Grid item xs={4}>
              <TextField
                label="Long URL"
                fullWidth required
                value={input.longUrl}
                error={!!input.error.longUrl}
                helperText={input.error.longUrl}
                onChange={e => handleChange(idx,"longUrl",e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Minutes (opt)"
                value={input.validMinutes}
                error={!!input.error.validMinutes}
                helperText={input.error.validMinutes||"Default=30"}
                onChange={e => handleChange(idx, "validMinutes", e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Custom Code (opt)"
                value={input.shortCode}
                error={!!input.error.shortCode}
                helperText={input.error.shortCode||"alphanumeric 4-20"}
                onChange={e=>handleChange(idx,"shortCode",e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              {inputs.length > 1 && (
                <Button onClick={()=>removeForm(idx)}>Remove</Button>
              )}
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button onClick={addForm} disabled={inputs.length >= maxForms}>Add</Button>
          <Button type="submit" variant="contained" sx={{ ml: 2 }}>Shorten</Button>
        </Grid>
      </Grid>
    </form>
  );
}
