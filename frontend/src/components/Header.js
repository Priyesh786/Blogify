import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { authActions } from "../store";

const Header = () => {
 const dispatch = useDispatch();
 const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(193,0,255,0.9971638313528537) 19%, rgba(0,163,255,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h4">Blogify</Typography>
       {isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
          <Tabs
            textColor="inherit"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
            <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
          </Tabs>
        </Box>}
        <Box display="flex"></Box>
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && <><Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: "1", borderRadius: 10 }}
            color="warning"
          >
            LOGIN
          </Button></>}
         {!isLoggedIn && <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: "1", borderRadius: 10, marginLeft: 1 }}
            color="warning"
          >
            SIGNUP
          </Button>}
          {isLoggedIn && <Button
            onClick={()=>dispatch(authActions.logout())}
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: "1", borderRadius: 10, }}
            color="warning"
          >
            LOGOUT
          </Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
