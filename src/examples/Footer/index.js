// prop-types is a library for typechecking of props

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React base styles
import typography from "assets/theme/base/typography";
import { Divider } from "@mui/material";
import { useMaterialUIController } from "context";
import { dark } from "@mui/material/styles/createPalette";
import colors from "assets/theme/base/colors";

function Footer() {
  const { size, fontWeightBold } = typography;
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { white, dark } = colors;

  return (
    <>
      <Divider orientation="horizontal" sx={{ my: 4 }} />

      <MDBox
        width="100%"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        justifyContent="center"
        alignItems="center"
        px={1.5}
      >
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          fontSize={size.md}
          px={1.5}
        >
          <MDBox color={darkMode ? white.main : dark.main}>
            Imagined, Developed & Created by:
            <br />
            <MDBox
              justifyContent="center"
              textAlign="center"
              fontWeight={fontWeightBold}
              color={darkMode ? white.main : dark.main}
            >
              Faris Rahman Thadathil
              <br />
              Hudaif Mohammed Malikathazham
              <br />
              Roshan James
              <br />
              Ali Vahidi
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </>
  );
}

export default Footer;
