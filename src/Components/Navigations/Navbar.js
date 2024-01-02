import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { getDataRequest } from '../../Axios/dataRequests';
import ShowMessage from '../Notifications/Toastify';
import { useNavigate } from 'react-router-dom';
import { loadStateFromLocalStorage } from '../../Storage/Localstorage';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  //State Variables_______________________________________
  const user = loadStateFromLocalStorage('user');
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElSettingsMenu, setAnchorElSettingsMenu] = React.useState(null);
  const [anchorElSystemMenu, setAnchorElSystemMenu] = React.useState(null);
  const [pages, SetPages] = React.useState([]);

  //Hooks_______________________________________
  React.useEffect(() => {
    const getNavbarLinks = async () => {
      try {
        const response = await getDataRequest('/ItemType/getNavigationLinks');
        if (response) {
          const tempVal = [];
          response.forEach(element => {
            tempVal.push({ Name: element.Name, Code: element.Code })
          });
          SetPages(tempVal);
        }
      } catch (error) {
        ShowMessage('error', 'An Error Accured for requesting Navbar Links r')
      }
    }
    getNavbarLinks();
  }, [])

  const navigate = useNavigate();


  //Functions and Methods_______________________________________
  const handleOpenNavMenu = (event) => {
    //Mobile Menu Icon Open Event
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    //Mobile Menu Icon Close Event
    setAnchorElNav(null);
  };


  const handleOpenUserMenu = (event) => {
    //User Profile Menu Open Event
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    //User Profile Menu Close Event
    setAnchorElUser(null);
  };


  const handleOpenSettingsMenu = (event) => {
    //Settings Menu Open Event
    setAnchorElSettingsMenu(event.currentTarget);
  };
  const handleCloseSettingsMenu = () => {
    //Settings Menu Close Event
    setAnchorElSettingsMenu(null);
  };


  const handleOpenSystemMenu = (event) => {
    //System Menu Open Event
    setAnchorElSystemMenu(event.currentTarget);
  };
  const handleCloseSystemMenu = () => {
    //System Menu Close Event
    setAnchorElSystemMenu(null);
  };

  const handleNavigate = (url) => {
    navigate(url);
  }


  return (
    <AppBar position="static" sx={{ background: '#0f172a' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DataObjectIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Spes Engine
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.Code} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.Name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <DataObjectIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Spes Engine
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.Code}
                onClick={() => navigate(`/Item/List/${page.Code}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.Name}
              </Button>

            ))}


            <Button
              key='Settings'
              onClick={handleOpenSettingsMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Settings
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElSettingsMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElSettingsMenu)}
              onClose={handleCloseSettingsMenu}
            >
              <MenuItem key={1} onClick={() => navigate('/AttributeGroups')}>
                <Typography textAlign="center">Attribute Groups</Typography>
              </MenuItem>
              <MenuItem key={2} onClick={() => navigate('/Attributes')}>
                <Typography textAlign="center">Attributes</Typography>
              </MenuItem>
              <MenuItem key={3} onClick={() => navigate('/Families')}>
                <Typography textAlign="center">Families</Typography>
              </MenuItem>
              <MenuItem key={4} onClick={() => navigate('/ItemTypes')}>
                <Typography textAlign="center">Item Types</Typography>
              </MenuItem>
              <MenuItem key={5} onClick={() => navigate('/Categories')}>
                <Typography textAlign="center">Categories</Typography>
              </MenuItem>
            </Menu>


            <Button
              key='System'
              onClick={handleOpenSystemMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              System
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElSystemMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElSystemMenu)}
              onClose={handleCloseSystemMenu}
            >
              <MenuItem key={11} onClick={() => navigate('/System/Localizations')}>
                <Typography textAlign="center">Localizations</Typography>
              </MenuItem>
              <MenuItem key={22} onClick={() => navigate('/System/Users')}>
                <Typography textAlign="center">System Users</Typography>
              </MenuItem>
              <MenuItem key={33} onClick={() => navigate('/System/Permissions')}>
                <Typography textAlign="center">Permissions</Typography>
              </MenuItem>
              <MenuItem key={44} onClick={() => navigate('/System/Roles')}>
                <Typography textAlign="center">Roles</Typography>
              </MenuItem>
            </Menu>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.Name && user.Name} src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={() => handleNavigate('/' + setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;