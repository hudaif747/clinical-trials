import { Card, Grid } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import burceMars from "assets/images/bruce-mars.jpg";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";

function ProfileNavbarCard() {
  return (
    <>
      <MDBox display="flex" justifyContent="space-between" py={1} px={1}>
        <Grid container display="flex" justifyContent="space-between" spacing={6}>
          <Grid item display="flex" alignItems={"center"}>
            <MDBox mr={1}>
              <MDAvatar src={burceMars} alt="profile image" shadow="md" />
            </MDBox>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="center"
            >
              <MDTypography variant="button" fontWeight="medium">
                Luigi Mario
              </MDTypography>
              <MDTypography variant="caption" color="text">
                Logged In
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid
            item
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <MDButton component={Link} to={"/profile"} variant="text" color="info">
              Profile
            </MDButton>
            <MDButton component={Link} variant="text" color="error">
              Logout
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

export default ProfileNavbarCard;
