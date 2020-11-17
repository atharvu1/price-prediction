import React, { useState } from "react";
import Axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import logo from "./assets/logo.svg";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import "./App.css";
import { CircularProgress } from "@material-ui/core";

function App() {
  const [text, setText] = useState("");
  const [bhkValue, setValueBhk] = React.useState("1");
  const [bathroomValue, setValueBathroom] = React.useState("1");
  const [locationValue, setValueLocation] = React.useState("");
  const [pending, setPending] = useState(false);
  const [op, setOp] = useState("Enter Area, BHK, Bathroom and Location to predict price");

  const handleChangeBhk = (event) => {
    setValueBhk(event.target.value);
    console.log(event.target.value)
  };
  const handleChangeBathroom = (event) => {
    setValueBathroom(event.target.value);
    console.log(event.target.value)
  };

  const handleChangeLocation = (event) => {
    setValueLocation(event.target.value)
    console.log(event.target.value)
  }
  const handleSubmit = async () => {
    setPending(true);
    const res = await Axios.post("http://127.0.0.1:5000/get_sentiment", { text }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    console.log(res)
    setOp(res.data);
    setPending(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>REAL STATE PRICE PREDICTION!</h1>
        <br/>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <div className="container">
          <p className="attr_heading">Area(in Sq. feet)</p>
          <TextField
            fullWidth
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
            label="Enter Area in Sq. feet"
            className="input"
            type="number"
          />
          <br />
          <br />
          <p className="attr_heading">BHK</p>
          <FormControl component="fieldset">
            <RadioGroup aria-label="bhk" name="bhk1" value={bhkValue} onChange={handleChangeBhk} row>
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
          </FormControl>
          <br />
          <br />
          <p className="attr_heading">Bathroom</p>
          <FormControl component="fieldset">
            <RadioGroup aria-label="bathroom" name="bathroom1" value={bathroomValue} onChange={handleChangeBathroom} row>
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
          </FormControl>
          <br />
          <br />
          <p className="attr_heading">Location</p>
          <TextField
            fullWidth
            onChange={handleChangeLocation}
            variant="outlined"
            label="Enter Location"
            className="input"
          />
          <Divider />
          <br />

          {pending ? <CircularProgress /> : <div className="output">{op}</div>}

          <br />

          <Button
            disabled={!text.length}
            onClick={handleSubmit}
            variant="outlined"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
