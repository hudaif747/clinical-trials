import { Card } from "@mui/material";
import MDBox from "components/MDBox";

function TransparentPlaceholder() {
  return (
    <Card sx={(theme) => transparentCard(theme)}>
      <MDBox px={4} py={4} textAlign="center">
        Transparent placeholder
      </MDBox>
    </Card>
  );
}

// style

function transparentCard(theme) {
  const { palette, boxShadows, functions, transitions, breakpoints, borders } = theme;
  const { dark, white, text, transparent, background } = palette;
  return {
    boxShadow: "none",
    backdropFilter: "none",
    backgroundColor: `${transparent.main} !important`,
    color: text.main,
  };
}

export default TransparentPlaceholder;
