import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../pages/clients/route'; // Import des routes

// const pages = ['Home', 'Search Cars', 'Bookings','Contact','Abouts'];
const pages = [
  { name: 'Home', route: ROUTES.HOME },
  { name: 'Search Cars', route: ROUTES.SEARCH_CARS },
  { name: 'Bookings', route: ROUTES.BOOKINGS },
  { name: 'Contact', route: ROUTES.CONTACT },
  { name: 'Abouts', route: ROUTES.ABOUT },
];

// const settings = ['Profile', 'My Resirvation', 'Logout'];
const settings = [
  { name: 'Profile', route: ROUTES.PROFILE },
  { name: 'My Reservation', route: ROUTES.RESERVATION },
  { name: 'Logout', action: 'logout' },
];

function ClientAppBar({ isLoggedIn, onLogin, onSignUp, onLogout }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // fonction va etre utiliser pour la navigation entre les pages
  const handleNavigation = (route, action) => {
    if (action === 'logout') {
      onLogout();
    } else {
      navigate(route);
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" sx={{ background: '#ffffff', top: 0, left: 0, right: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: '.3rem',
              color: '#be1f2c',
              textDecoration: 'none',
            }}
          >
            AZULCar
          </Typography>

          {/* Navigation Menu (Responsive) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#111111"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    navigate(page.route);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo (Mobile View) */}
          <Typography
            variant="h5"
            noWrap
            onClick={() => navigate(ROUTES.HOME)}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#be1f2c',
              cursor: 'pointer',
            }}
          >
            AZULCar
          </Typography>

          {/* Navigation Menu (Desktop View) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.route)}
                sx={{ my: 2, color: '#111111', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User Section */}
          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              // Menu utilisateur avec avatar
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Name" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={() => handleNavigation(setting.route, setting.action)}
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              // Boutons Login/Sign Up pour les utilisateurs non connectés
              <>
                <Button onClick={onLogin} sx={{ color: '#111111', marginRight: 1 }}>
                  Login
                </Button>
                <Button onClick={onSignUp} variant="outlined" sx={{ color: '#111111', borderColor: 'white' }}>
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ClientAppBar;
