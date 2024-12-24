import { Container, Typography, Button, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "none",
      }}
    >
      <Box
        sx={{
          minHeight: "90vh",
          maxWidth: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          sx={{
            backgroundColor: "#ffffff",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 120, color: "#d81324" }} />
          <Typography
            variant="h1"
            sx={{ color: "#0b2153", fontWeight: "bold" }}
          >
            404
          </Typography>
          <Typography variant="h4" sx={{ color: "#0b2153", marginBottom: 2 }}>
            Page Not Found
          </Typography>
          <Typography sx={{ color: "#0b2153", marginBottom: 4 }}>
            We’re sorry, the page you have looked for does not exist on our
            website! Maybe go to our home page or try to use a search?
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d81324",
              color: "#ffffff",
              borderRadius: "50px",
              padding: "12px 24px",
              "&:hover": {
                backgroundColor: "#b0101b",
              },
            }}
            href="/"
          >
            Go Back To Home
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default PageNotFound;
