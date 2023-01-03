import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Card.css";
import { useState } from "react";
import ProductAdd from "../../ProductAdd/ProductAdd";
import CategoryAdd from "../../CategoryAdd/CategoryAdd";
import VarientAdd from "../../VarientAdd/VarientAdd";
import PopupCategory from "../../../../Control/PopUpCategory";
import PopupProduct from "../../../../Control/PopupProduct";
import PopUpVariant from "../../../../Control/PopUpVariant";
import Options from "./Options";
import Productoption from "./Productoption";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Client_URL } from "../../../../Constants/Constant";

const Card = () => {
  const [openPopupCategory, setOpenPopupCategory] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupAdd, setOpenPopupAdd] = useState(false);
  const [productCategoryId, setProductCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [product, setProduct] = useState([]);
  const [option, setOption] = useState(false);
  const [productoption, setProductoption] = useState(false);

  let page = 1;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const clientId = userInfo.data._id;

  const handleOnClick = () => {
    setOpenPopup(true);
  };

  const ShowProducts = (id) => {
    setProductCategoryId(id);
    if (productCategoryId) {
      fetch(
        `${Client_URL}/v1/client/listProduct?productCategoryId=${productCategoryId}&page=${page}&clientId=${clientId}`
      )
        .then((result) => {
          result.json().then((resp) => {
            setProduct(resp.data);
          });
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } else {
      setProduct([]);
    }
  };
  console.log("Product List", product);

  useEffect(() => {
    fetch(
      `${Client_URL}/v1/client/listProductCategories?clientId=${clientId}
      &page=${page}`
    ).then((result) => {
      result.json().then((resp) => {
        console.log("doing worst ho rha h", resp);
        if (resp.statusCode === 200) {
          setCategoryList(resp.data);
        }
      });
    });
  }, [clientId, page]);
  console.log("==>", clientId, categoryList);

  return (
    <div className="CardContainerP">
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 2,
            // width: 300,
            width: "-webkit-fill-available",
            height: 272,
            borderRadius: 5,
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: "45px",
            padding: 1,
            flexDirection: "column",
            display: "flex",
          }}
        >
          {" "}
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <h3>Category(2)</h3>
            <AddIcon
              sx={{
                fontSize: 30,
                marginTop: 1,
                color: "#0088FF",
                cursor: "pointer",
              }}
              onClick={() => setOpenPopupCategory(true)}
            />
          </div>
          <div className="Listing">
            {categoryList.map((item, id) => {
              return (
                <div className="CategoryData" key={id}>
                  {/* <div onClick={() => ShowProducts(item._id)}>{item.name}</div> */}
                  <MoreVertIcon
                    style={{ color: "black" }}
                    onClick={() => setOption(!option)}
                  />
                </div>
              );
            })}
          </div>
          {option ? <Options /> : ""}
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 2,
            // width: 300,
            width: "-webkit-fill-available",
            height: 272,
            borderRadius: 5,
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 1,
            flexDirection: "column",
            alignItems: "",
            display: "flex",
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <h3>Product(1)</h3>
            <SearchIcon
              sx={{
                fontSize: 30,
                marginTop: "9px",
                marginLeft: "153px",
                color: "#0088FF",
              }}
            />
            <AddIcon
              sx={{
                fontSize: 30,
                marginTop: 1,
                color: "#0088FF",
                cursor: "pointer",
              }}
              onClick={handleOnClick}
            />
          </div>
          <div className="Listing">
            {product.map((item, id) => {
              return (
                <div className="CategoryData" key={id}>
                  <div>{item.name}</div>
                  <MoreVertIcon
                    style={{ color: "black" }}
                    onClick={() => setProductoption(!option)}
                  />
                </div>
              );
            })}
          </div>
          {productoption ? <Productoption /> : ""}
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 2,
            // width: 300,
            width: "-webkit-fill-available",
            height: 272,
            borderRadius: 5,
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 1,

            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3>Product Detail</h3>
          <div className="ProductDetail">
            <div className="ImgContainer"></div>
            <div className="ProductData">
              <span
                style={{
                  fontFamily: "Inter",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "14px",
                  lineHeight: "17px",
                  /* identical to box height */

                  color: "#222324",
                }}
              >
                Black Paris shoes
              </span>
              <br />
              <span
                style={{
                  fontFamily: "Inter",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "17px",

                  color: "#0088FF",
                }}
              >
                ₹ 4800.00
              </span>
              <br />
              <span
                style={{
                  fontFamily: "Inter",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "14px",
                  lineHeight: "17px",

                  color: "#222324",
                }}
              >
                Grain Leather shoes
              </span>
            </div>
          </div>
          <div className="Line"></div>
          <span style={{ color: "#11141A", fontWeight: 700 }}>
            Variants / Add-ons
          </span>
          <span
            style={{
              color: "#11141A",
              justifyContent: "space-between",
            }}
          >
            No Variants / Add- ons added
            <span
              style={{
                color: "#0088FF",
                marginLeft: "75px",
                cursor: "pointer",
              }}
              onClick={() => setOpenPopupAdd(true)}
            >
              Add
            </span>
          </span>
        </Paper>
      </Box>
      <PopupCategory
        title="Modify Available"
        openPopupCategory={openPopupCategory}
        setOpenPopupCategory={setOpenPopupCategory}
      >
        <CategoryAdd />
      </PopupCategory>
      <PopupProduct
        title="Add product to Available Items"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProductAdd />
      </PopupProduct>
      <PopUpVariant
        title="Add variants/add-ons"
        openPopupAdd={openPopupAdd}
        setOpenPopupAdd={setOpenPopupAdd}
      >
        <VarientAdd />
      </PopUpVariant>
    </div>
  );
};

export default Card;
