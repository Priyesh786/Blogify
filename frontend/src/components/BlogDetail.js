import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id)
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))
    const data = await res.data;
    return data;
  }
  useEffect(()=>{
    fetchDetails().then((data)=>{
    setBlog(data.blog)
    setInputs({title:data.blog.title, description: data.blog.description})
  })
  },[id])
  const sendRequest = async() => {
    const res =axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title: inputs.title,
      description: inputs.description,
    }).catch(err=>console.log(err)) 

    const data = await res.data;
    return data;
  }
  console.log(blog)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs/"));
  }
  return (
    <div> {inputs &&<form onSubmit={handleSubmit}>
    <Box
      border={3}
      borderColor="linear-gradient(90deg, rgba(193,0,255,0.9971638313528537) 19%, rgba(0,163,255,1) 100%)"
      borderRadius={10}
      boxShadow="10px 10px 20px #ccc"
      padding={3}
      margin={"auto"}
      marginTop={3}
      display="flex"
      flexDirection={"column"}
      width={"80%"}
    >
      <Typography
        fontWeight={"bold"}
        padding={3}
        color="black"
        variant="h2"
        textAlign={"center"}
      >
        Post Your Blog
      </Typography>
      <InputLabel
        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
      >
        Title
      </InputLabel>
      <TextField
        name="title"
        onChange={handleChange}
        value={inputs.title}
        margin="normal"
        variant="outlined"
      />
      <InputLabel
        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
      >
        Description
      </InputLabel>
      <TextField
        name="description"
        onChange={handleChange}
        value={inputs.description}
        margin="normal"
        variant="outlined"
      />
      {/* <InputLabel
        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
      >
        ImageURL
      </InputLabel>
      <TextField
        name="imageURL"
        onChange={handleChange}
        value={inputs.imageURL}
        margin="normal"
        variant="outlined"
      /> */}
      <Button
        sx={{ mt: 2, borderRadius: 4 }}
        variant="contained"
        color="warning"
        type="submit"
      >
        Submit
      </Button>
    </Box>
  </form>}</div>
  )
}

export default BlogDetails