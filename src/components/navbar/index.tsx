import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"
import React from "react"

const Navbar = () => {

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          Star Wars
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;