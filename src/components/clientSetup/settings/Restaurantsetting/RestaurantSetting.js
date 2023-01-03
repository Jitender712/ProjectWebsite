import React, { useEffect, useState } from "react";
import "./RestaurantSetting.css";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, Link, TextField } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client_URL } from "../../../Constants/Constant";
const RestaurantSetting = () => {
  const [displayAddress, setDisplayAddress] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [domainName, setDomainName] = useState("");
  const [country, setCountry] = useState("India");
  const [Details, setDetails] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState({});
  const [webFile, setWebFile] = useState();
  const [mobileFile, setMobileFile] = useState();

  const navigate = useNavigate();
  // const ClientId = useSelector((state) => state.setClientId);
  // const Client_id = ClientId.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const token = userInfo.data.token;

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  function handleChangeWeb(e) {
    console.log(e.target.files);
    setWebFile(URL.createObjectURL(e.target.files[0]));
  }
  function handleChangeMobile(e) {
    console.log(e.target.files);
    setMobileFile(URL.createObjectURL(e.target.files[0]));
  }

  const setImageAction = async (event) => {
    event.preventDefault();

    const data = await fetch(`${Client_URL}/v1/client/Settings/uploadImage`, {
      method: "put",
      headers: { "Content-Type": "multipart/form-data" },
    });
    const uploadedImage = await data.json();
    if (uploadedImage) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
    }
  };

  const collectData1 = async () => {
    console.log(
      "token",
      token,
      "display Address",
      displayAddress,
      "Store name",
      storeName,
      "Description",
      description,
      "Slug",
      slug,
      "BgColor",
      bgColor
    );
    let result = await fetch(`${Client_URL}/v1/client/Settings/store`, {
      method: "PUT",
      body: JSON.stringify({
        displayAddress,
        storeName,
        description,
        slug,
        bgColor,
        name,
        companyName,
        address,
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("Bussines", result);
    if (result.statusCode === 200) {
      alert("SuccessFully Saved");
      navigate("/Restaurant");
    } else {
      setMessage(result.message);
    }
  };

  useEffect(() => {
    let headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = token;
    }
    if (!storeId) {
      fetch(`${Client_URL}/v1/client`, { headers }).then((result) => {
        result.json().then((resp) => {
          setDetails(resp);
          if (resp.statusCode === 200) {
            setName(resp.data[0].name);
            setEmail(resp.data[0].email);
            setDomainName(resp.data[0].setupDomain);
            setPhoneNo(resp.data[0].phoneNo);
            setStoreName(resp.data[0].businessId[0].storeName);
            setStoreId(resp.data[0].businessId[0].storeId);
          }
        });
      });
    } else {
      fetch(
        `${Client_URL}/v1/client/customer/businessDetails?storeId=${storeId}`
      ).then((result) => {
        result.json().then((resp) => {
          setDetails(resp.data);
          if (resp.statusCode === 200) {
            setDisplayAddress(resp.data.displayAddress);
            setDescription(resp.data.storedescription);
            setSlug(resp.data.slug);
            setBgColor(resp.data.bgColor);
            setCompanyName(resp.data.companyName);
            setAddress(resp.data.address);
          }
        });
      });
    }
  }, [token, storeId]);

  console.log(Details, email, "Store Id", storeId);

  return (
    <div className="Container4">
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 2,
            p: 1,
            // width: 1010,
            borderRadius: 5,
          },
        }}
      >
        <Paper elevation={3}>
          <div className="Topic">
            <div className="Topic1">
              <h3>Account Details</h3>
            </div>
            <div className="Topic2">
              <Link href="#" underline="none">
                <h3>Change Password</h3>
              </Link>
            </div>
          </div>
          <div className="Address_Field_Container">
            <div className="Address_details">
              <div className="Name">
                <span>Display Address*</span>
              </div>
              <div className="TextFeild1">
                <div className="Text">
                  <TextField
                    id="outlined-basic"
                    placeholder="Enter Display Address"
                    size="small"
                    variant="outlined"
                    value={displayAddress}
                    sx={{ width: 300, borderRadius: 4 }}
                    onChange={(e) => setDisplayAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="Address_details">
              <div className="Name">
                <span>Store Name</span>
              </div>
              <div className="TextFeild1">
                <div className="Text">
                  <TextField
                    id="outlined-basic"
                    placeholder="Black Paris"
                    size="small"
                    value={storeName}
                    variant="outlined"
                    sx={{ width: 300, borderRadius: 10 }}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="Address_details">
              <div className="Name">
                <span>Description</span>
              </div>
              <div className="TextFeild1">
                <div className="Text">
                  <TextField
                    id="outlined-basic"
                    placeholder="Enter Description"
                    size="small"
                    variant="outlined"
                    value={description}
                    sx={{ width: 300, borderRadius: 10 }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="Address_details">
              <div className="Name">
                <span>
                  Slug<span>(Max 100 Characters)</span>
                </span>
              </div>
              <div className="TextFeild1">
                <div className="Text">
                  <TextField
                    id="outlined-basic"
                    placeholder="Black Paris"
                    size="small"
                    variant="outlined"
                    value={slug}
                    sx={{ width: 300, borderRadius: 10 }}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="Address_details">
              <div className="Name">
                <span>Background Color</span>
              </div>
              <div className="TextFeild1">
                <div className="Text">
                  <TextField
                    id="outlined-basic"
                    placeholder="Color"
                    size="small"
                    variant="outlined"
                    value={bgColor}
                    sx={{ width: 300, borderRadius: 4 }}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="Address_details" />
          </div>
          <div className="Logo_Container_For_Restaurant">
            <div className="Restaurant_Image_Logo">
              <div className="Logoname">
                <span>Logo</span>
              </div>
              <div className="Logo">
                <div className="Img">
                  <img
                    style={{
                      height: "70px",
                      width: "70px",
                    }}
                    src={webFile}
                    alt=""
                  />
                </div>
                <div className="texting">
                  Drag & Drop Image, Or{" "}
                  <span>
                    <input type="file" onChange={handleChangeWeb} />
                  </span>
                  from computer
                </div>
              </div>
              <div className="RestaurantPreview">
                <span onClick={setImageAction}>Upload</span>
              </div>
            </div>
            <div className="Restaurant_Image_Logo">
              <div className="Logoname">
                <span>Logo</span>
              </div>
              <div className="Logo">
                <div className="Img">
                  <img
                    style={{
                      height: "70px",
                      width: "70px",
                    }}
                    src={file}
                    alt=""
                  />
                </div>
                <div className="texting">
                  Drag & Drop Image, Or{" "}
                  <span>
                    <input type="file" onChange={handleChange} />
                  </span>
                  from computer
                </div>
              </div>
              <div className="RestaurantPreview">
                <span>Upload</span>
              </div>
            </div>
            <div className="Restaurant_Image_Logo">
              <div className="Logoname">
                <span>Logo</span>
              </div>
              <div className="Logo">
                <div className="Img">
                  <img
                    style={{
                      height: "70px",
                      width: "70px",
                    }}
                    src={mobileFile}
                    alt=""
                  />
                </div>
                <div className="texting">
                  Drag & Drop Image, Or{" "}
                  <span>
                    <input type="file" onChange={handleChangeMobile} />
                  </span>
                  from computer
                </div>
              </div>
              <div className="RestaurantPreview">
                <span>Upload</span>
              </div>
            </div>
          </div>
          {/* <div className="Buttons_Save">
            <Button
              variant="contained"
              sx={{ borderRadius: 2, background: "grey" }}
            >
              Cancel
            </Button>
            <Button variant="contained" sx={{ borderRadius: 2 }}>
              Save
            </Button>
          </div> */}
        </Paper>
      </Box>
      {/* Billing Details  */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 2,
            p: 1,
            // width: 1010,
            borderRadius: 5,
          },
        }}
      >
        <Paper elevation={3}>
          <div className="Topic">
            <div className="Topic1">
              <h3>Account Details</h3>
            </div>
          </div>
          <div className="Address_Field_Container">
            <div className="Address_details">
              <div className="Name">
                <span>Display Address*</span>
              </div>
              <div className="TextFeild1">
                <div className="Text">
                  <TextField
                    id="outlined-basic"
                    placeholder="Enter Display Address"
                    size="small"
                    variant="outlined"
                    value={displayAddress}
                    sx={{ width: 300, borderRadius: 4 }}
                    onChange={(e) => setDisplayAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="Address_details">
              <div className="Name">
                <span>Name</span>
              </div>
              <div className="TextFeild1">
                <div className="Text">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    value={name}
                    sx={{ width: 300, borderRadius: 10 }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="Address_details">
              <div className="Name">
                <span>Email</span>
              </div>
              <div className="TextFeild1">
                <div className="Text">
                  <TextField
                    id="outlined-basic"
                    placeholder="jeetu712@gmail.com"
                    size="small"
                    disabled
                    variant="outlined"
                    value={email}
                    sx={{ width: 300, borderRadius: 10 }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="Address_details">
              <div className="Name">
                <span>Phone</span>
              </div>
              <div className="TextFeild1">
                <div className="Mobile_New">
                  <MuiPhoneNumber
                    name="phone"
                    // variant="outlined"
                    data-cy="user-phone"
                    style={{
                      width: "300px",
                      border: "none",
                      display: "grid",
                      margin: "10x",
                    }}
                    value={phoneNo}
                    defaultCountry={"in"}
                    // value={phoneNo}
                    // onChange={setPhoneNo}
                  ></MuiPhoneNumber>
                </div>
              </div>
            </div>
            <div className="Address_details">
              <div className="Name">
                <span>Company Name</span>
              </div>
              <div className="TextFeild1">
                <div className="Text">
                  <TextField
                    id="outlined-basic"
                    placeholder="Enter Company Name"
                    size="small"
                    variant="outlined"
                    value={companyName}
                    sx={{ width: 300, borderRadius: 4 }}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="Address_details">
              <div className="Name">
                <span>Domain Name</span>
              </div>
              <div className="TextFeild1">
                <div className="Text">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    disabled
                    value={domainName}
                    sx={{ width: 300, borderRadius: 4 }}
                    onChange={(e) => setDomainName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="Address_details">
              <div className="Name">
                <span>Country</span>
              </div>
              <div className="TextFeild1">
                <div className="Text">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    value={country}
                    disabled
                    sx={{ width: 300, borderRadius: 4 }}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="Address_details">
              <div className="Name">
                <span>Address</span>
              </div>
              <div className="TextFeild1">
                <div className="Text">
                  <TextField
                    id="outlined-basic"
                    placeholder="Display Address"
                    size="small"
                    variant="outlined"
                    value={address}
                    sx={{ width: 300, borderRadius: 4 }}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="Address_details" />
          </div>
          {<div className="MessageError">{message}</div>}
        </Paper>
      </Box>
      <div className="Buttons_Save1">
        <Button
          variant="contained"
          sx={{ borderRadius: 2, background: "grey" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: 2 }}
          onClick={collectData1}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default RestaurantSetting;
