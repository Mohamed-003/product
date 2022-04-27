import ProductCustomization from "./ProductCustomization";
import { makeStyles } from "@material-ui/core";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  alertActionCreators,
  authActionCreators,
  productsActionCreators,
  State,
} from "../store";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import ShareIcon from "@mui/icons-material/Share";
import { Divider } from "@mui/material";
import Select from "@mui/material/Select";
import data from "../utils/data";

const useStyles = makeStyles((theme) => {
  return {
    prodName: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: "5%",
    },
    imgName: {
      flexDirection: "row",
      justifyContent: "center",
      paddingTop: "2%",
    },
    card: { maxWidth: 640, maxHeight: 460 },
    prodDescription: { paddingTop: "5%" },
    prodButtons: { paddingTop: "10%" },
    buyButtons: {
      paddingTop: "10%",
      paddingX: "10%",
      justifyContent: "space-around",
      display: "flex",
    },
  };
});

const ProductView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state: State) => state.auth.isAuthenticated);
  const product = useSelector((state: State) => state.products.product);
  // const products = useSelector((state: State) => state.products.products)
  const user = useSelector((state: State) => state.auth.user);
  const { setAlert } = bindActionCreators(alertActionCreators, dispatch);
  const { addItemToCart, changeLoginModal } = bindActionCreators(
    authActionCreators,
    dispatch
  );
  const [kg, setkg] = useState<any>(1);
  const uom = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];
  const handleUom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setkg(event.target.value);
  };

  const bool =
    user &&
    user.cartItems.filter((item: any) => {
      return item.productId == product._id;
    }).length === 0
      ? false
      : true;

  const handleAddToCart = () => {
    var item = product;
    item.kg = kg;
    addItemToCart(item);
  };

  const imageName = product.imageName;
  const image = `https://d1x0t3m3tl1ewa.cloudfront.net/${imageName}.jpg`;

  const details = "more details about the cake";

  return (
    <Grid>
      <Grid container>
        <Grid
          item
          justifyContent={"center"}
          xs={12}
          sm={12}
          md={12}
          lg={5}
          xl={5}
        >
          <meta charSet='utf-8' />
          <title>{product.productName}</title>
          <meta name='description' content={product.productDescription} />

          <Card elevation={0} className={classes.card}>
            <CardMedia
              component='img'
              image={`https://d1x0t3m3tl1ewa.cloudfront.net/${imageName}.jpg`}
              alt={product.altText}
              loading='lazy'
            />
          </Card>
        </Grid>
        <Grid item lg={1} xl={1}></Grid>
        <Grid item container xs={12} sm={12} md={12} lg={6} xl={6}>
          <Grid item container className={classes.prodName}>
            <Grid item xs={8} sm={8} md={9} lg={10} xl={10}>
              <Typography variant='h5' noWrap>
                {product.productName} ({product.type})
              </Typography>
            </Grid>
            <Grid textAlign='right' item xs={4} sm={4} md={3} lg={2} xl={2}>
              <Typography variant='h5' noWrap>
                ₹ {product.price.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className={classes.prodDescription}
          >
            <Typography fontSize={16}>{product.productDescription}</Typography>
          </Grid>
          <ProductCustomization kg={kg} uom={uom} handleUom={handleUom} />
          <Grid
            alignItems='baseline'
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            className={classes.prodButtons}
          >
            {auth === true ? (
              <Button
                disableElevation
                sx={{ width: "100%" }}
                onClick={bool ? () => {} : () => handleAddToCart()}
                variant='contained'
              >
                {bool ? "Already in cart" : "ADD TO CART"}
              </Button>
            ) : (
              <Button
                disableElevation={true}
                onClick={() => {
                  setAlert("Login to Continue", "error");
                  changeLoginModal(true);
                }}
                fullWidth
                variant='contained'
              >
                ADD TO CART{" "}
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Box padding={20}></Box>
      {/* ************************************************************************************************************************************************** */}
      <Grid container>
        <Grid
          item
          justifyContent={"center"}
          xs={12}
          sm={12}
          md={12}
          lg={5}
          xl={5}
        >
          <Card elevation={0} className={classes.card}>
            <CardMedia
              component='img'
              image={data[0].imgurl}
              alt={product.altText}
              loading='lazy'
            />
          </Card>
          <Grid item container className={classes.imgName}>
            <Box paddingLeft={2}>
              <img src={data[0].imgurl} style={{ height: 80, width: 100 }} />
            </Box>
            <Box paddingLeft={2}>
              <img src={data[0].imgurl} style={{ height: 80, width: 100 }} />
            </Box>
            <Box paddingLeft={2}>
              <img src={data[0].imgurl} style={{ height: 80, width: 100 }} />
            </Box>
          </Grid>
          {/* </Card> */}
        </Grid>
        <Grid item lg={1} xl={1}></Grid>
        <Grid item container xs={12} sm={12} md={12} lg={6} xl={6}>
          <Grid item container className={classes.prodName}>
            <Grid item xs={8} sm={8} md={9} lg={10} xl={10}>
              <Typography variant='h5'>{data[0].productName}</Typography>
              {/* /**********************************************************************************************/}
              {console.log(data[0].productName)}
              <Grid
                sx={{
                  alignItems: "right",
                  marginLeft: "500px",
                }}
              >
                <Button
                  variant='outlined'
                  href='#outlined-buttons'
                  style={{ borderRadius: 50 }}
                >
                  Customize
                </Button>
                <ShareIcon />
              </Grid>
              <Grid
                container
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
              >
                {/* </Grid> */}

                <Rating name='read-only' value={4} readOnly />
                <Typography variant='body1' component='p' marginLeft={0.5}>
                  4
                </Typography>
                <Typography marginLeft={0.3}>(145 Reviews)</Typography>
              </Grid>
              <Divider />
            </Grid>

            {/* <Grid item xs={4} sm={4} md={3} lg={2} xl={2}  > */}
            <Box>
              <Typography variant='h5' noWrap>
                ₹ {data[0].price}
              </Typography>

              <Typography variant='subtitle1'>
                Inclusive of all taxes
              </Typography>
            </Box>
          </Grid>
          {/* </Grid> */}

          <Box
            sx={{
              padding: "2px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Stack direction='row' spacing={2}>
                <Button variant='contained'>500GM</Button>
                <Button variant='contained'>750GM</Button>
                <Button variant='contained'>1Kg</Button>
                <Button variant='contained'>2Kg</Button>

                <Button variant='contained' href='#contained-buttons'>
                  Custom
                </Button>
              </Stack>
            </Box>

            <FormControlLabel control={<Checkbox />} label='Eggless' />

            <Typography variant='h6'>Message on the cake</Typography>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id='outlined-basic'
                label='You can enter upto 30 characters'
                variant='outlined'
              />
            </FormControl>
          </Box>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className={classes.prodDescription}
          >
            <Typography variant='h6' fontWeight='600'>
              Description
            </Typography>
            <Typography fontSize={16}>{data[0].productDescription}</Typography>
          </Grid>

          {/* <ProductCustomization kg={kg} uom={uom} handleUom={handleUom} /> */}

          <FormControl fullWidth>
            <InputLabel id='details'></InputLabel>
            <Select
              labelId='details'
              id='demo-simple-select'
              value={details}
              label='Age'
            >
              {/* <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>

          <Grid
            alignItems='baseline'
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            className={classes.prodButtons}
          >
            {auth === true ? (
              <Button
                disableElevation
                sx={{ width: "100%" }}
                onClick={bool ? () => {} : () => handleAddToCart()}
                variant='contained'
              >
                {bool ? "Already in cart" : "ADD TO CART"}
              </Button>
            ) : (
              <Button
                disableElevation={true}
                onClick={() => {
                  setAlert("Login to Continue", "error");
                  changeLoginModal(true);
                }}
                fullWidth
                variant='contained'
              >
                ADD TO CART{" "}
              </Button>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            className={classes.buyButtons}
          >
            <Button variant='contained'>BUY NOW</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductView;
