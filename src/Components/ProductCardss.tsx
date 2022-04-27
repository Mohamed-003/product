import ProductActionCard from "./ProductActionCard";
import { makeStyles } from "@material-ui/core";
import { Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { State } from "../store";
import data from "../utils/data";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => {
  return {
    card: {},
    grid: {
      [theme.breakpoints.up("lg")]: {
        // paddingLeft: '5%',
      },
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    box: {
      width: "100%",
      [theme.breakpoints.down("md")]: {
        padding: "1%",
      },
      [theme.breakpoints.up("md")]: {
        padding: "3%",
        color: "white",
      },
    },
  };
});
// let datas = data;

// const Shuffle = () => {
//   datas = data.sort((a, b) => 0.5 - Math.random());
//   return data;
// };

const ProductCardss = () => {
  const classes = useStyles();
  // const products = useSelector((state:State) => state.products.products);
  let datas = data;
  datas = data.sort((a, b) => 0.5 - Math.random());
  const gridCreator = () => {
    return datas.map((object: any) => (
      <Grid key={object.SKUID} item xs={6} sm={6} md={3} lg={3} xl={3}>
        <Box className={classes.card}>
          {console.log(object)}
          <ProductActionCard object={object} />
        </Box>
      </Grid>
    ));
  };

  return (
    <Paper className={classes.box} elevation={1}>
      <Grid
        container
        className={classes.grid}
        justifyContent='normal'
        spacing={{ xs: 1, sm: 1, md: 5, lg: 5, xl: 5 }}
        columns={12}
      >
        <Button onclick={ProductCardss}>
          <ArrowCircleLeftOutlinedIcon
            sx={{ color: red[800], marginTop: 14, marginLeft: 5, fontSize: 45 }}
          />
        </Button>
        {gridCreator()}
        <Button onclick={ProductCardss}>
          <ArrowCircleRightOutlinedIcon
            sx={{ color: red[800], marginTop: 14, marginLeft: 5, fontSize: 45 }}
          />
        </Button>
      </Grid>
    </Paper>
  );
};

export default ProductCardss;
