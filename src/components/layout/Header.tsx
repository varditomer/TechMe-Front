import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Grid,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Language as LanguageIcon,
  Code as CodeIcon,
} from "@mui/icons-material";
import { useThemeContext } from "../../hooks/useThemeContext";

export default function Header() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeContext();

  const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setLanguageAnchor(null);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    document.dir = lang === "he" ? "rtl" : "ltr";
    handleClose();
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          wrap="nowrap"
          sx={{ width: "100%" }}
        >
          <Grid>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
              onClick={() => navigate("/")}
            >
              <CodeIcon sx={{ fontSize: 32, mr: 1, color: "primary.main" }} />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TechMe
              </Typography>
            </Box>
          </Grid>

          <Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid>
                <IconButton
                  color="inherit"
                  onClick={handleLanguageClick}
                  aria-label="language"
                  size="large"
                >
                  <LanguageIcon />
                </IconButton>
              </Grid>

              <Grid>
                <IconButton
                  color="inherit"
                  onClick={toggleTheme}
                  aria-label="toggle theme"
                  size="large"
                >
                  {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Menu
          anchorEl={languageAnchor}
          open={Boolean(languageAnchor)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleLanguageChange("en")}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img
                src="https://flagcdn.com/us.svg"
                alt="English"
                style={{ width: 24, height: 16 }}
              />
              English
            </Box>
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange("he")}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img
                src="https://flagcdn.com/il.svg"
                alt="עברית"
                style={{ width: 24, height: 16 }}
              />
              עברית
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
