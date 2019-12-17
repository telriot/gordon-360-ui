import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Switch,
} from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import QuickLinksDialog from '../../../QuickLinksDialog';
import { signOut } from '../../../../services/auth';

import './nav-avatar-right-corner.css';
import '../../../../app.css';
//import '../../../../click.js';
import user from '../../../../services/user';

import { Button } from '@material-ui/core';
//import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class GordonNavAvatarRightCorner extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.handleLinkClickOpen = this.handleLinkClickOpen.bind(this);
    this.handleLinkClose = this.handleLinkClose.bind(this);
    this.openDialogBox = this.openDialogBox.bind(this);
    this.closeDialogBox = this.closeDialogBox.bind(this);

    this.getInitials = this.getInitials.bind(this);

    this.state = {
      email: null,
      image: null,
      name: null,
      username: null,
      linkopen: false,
      anchorEl: null,
      network: 'online',
      clickEf: false,
    };
  }

  onClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  onClose() {
    this.setState({ anchorEl: null });
  }
  onSignOut() {
    this.onClose();
    signOut();
    this.props.onSignOut();
  }
  onSignIn() {
    this.onClose();
  }
  openDialogBox = () => {
    this.setState({ dialogBoxOpen: true });
  };

  closeDialogBox = () => {
    this.setState({ dialogBoxOpen: false });
  };
  handleLinkClickOpen = () => {
    this.setState({
      linkopen: true,
    });
  };

  handleLinkClose = () => {
    this.setState({ linkopen: false });
  };

  async componentWillReceiveProps(newProps) {
    if (this.props.Authentication !== newProps.Authentication) {
      this.loadAvatar(newProps.Authentication);
    }
  }

  openDialogBox = () => {
    this.setState({ dialogBoxOpen: true });
  };

  closeDialogBox = () => {
    this.setState({ dialogBoxOpen: false });
  };

  handleLinkClickOpen = () => {
    this.setState({
      linkopen: true,
    });
  };

  handleLinkClose = () => {
    this.setState({ linkopen: false });
  };

  async componentWillMount() {
    this.loadAvatar(this.props.Authentication);
  }

  componentDidMount() {
    setInterval(this.checkPeer.bind(this), 1500);
  }

  async loadAvatar(Authentication) {
    if (Authentication) {
      const { name, user_name: username } = user.getLocalInfo();
      this.setState({ name, username });
      const [{ Email: email }, { def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getProfileInfo(),
        await user.getImage(),
      ]);
      const image = preferredImage || defaultImage;
      this.setState({ email, image });
    } else {
      this.setState({ name: 'Guest', username: 'Guest' });
    }
  }
  //clicker effect toggle button
  async toggleClickEff() {
    if (this.state.clickEf === false) {
      this.setState({ clickEf: true });
    } else {
      this.setState({ clickEf: false });
    }
  }

  /**
   * This method checks a peer component Profile
   * and rerenders the avatar if the Profile picture is updated
   */
  checkPeer() {
    if (window.didProfilePicUpdate) {
      this.loadAvatar(this.props.Authentication);
      window.didProfilePicUpdate = false;
    }
  }

  getInitials() {
    if (this.state.username) {
      return this.state.username
        .split('.') // Split name into separate words
        .map(name => name[0]) // Get first letter of each part of name
        .join('')
        .toUpperCase(); // Join initials back into a string
    }
    return '';
  }

  render() {
    const open = Boolean(this.state.anchorEl);

    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', event => {
      if (
        event.data === 'online' &&
        this.state.network === 'offline' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'online' });
      } else if (
        event.data === 'offline' &&
        this.state.network === 'online' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'offline' });
        this.handleLinkClose();
      }
    });

    /* Gets status of current network connection for online/offline rendering
     *  Defaults to online in case of PWA not being possible
     */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';
    //clicker effect functions
    function clickEffect(e) {
      var d = document.createElement('div');
      d.className = 'clickEffect';
      d.style.top = e.clientY + 'px';
      d.style.left = e.clientX + 'px';
      document.body.appendChild(d);
      d.addEventListener(
        'animationend',
        function() {
          d.parentElement.removeChild(d);
        },
        //.bind(this),
      );
    }
    function start() {
      var box = document.getElementById('clickerSwitch');
      box.checked = true;
      if (box.checked) {
        document.addEventListener('click', clickEffect);
      }
      /* if (this.state.clickEf === false){
        this.setState({clickEf: true});

      }
      else{
        this.setState({clickEf: false});
      }*/
    }
    //document.addEventListener('click', clickEffect)
    //Creates clicker effect button
    let ClickButton;
    ClickButton = (
      <FormControlLabel
        control={
          <Switch
            //checked={document.addEventListener('click', clickEffect)}
            id="clickerSwitch"
            //checked={this.state.clickEf}
            onChange={start}

            //value="checkedB"
            //color="primary"
          />
        }
        label="Primary"
      />
    );

    // Creates the Links button depending on the status of the network found in local storage
    let LinksButton;
    if (networkStatus === 'online') {
      LinksButton = (
        <MenuItem
          onClick={() => {
            this.onClose();
            this.handleLinkClickOpen();
          }}
          divider="true"
        >
          Links
        </MenuItem>
      );
    } else {
      LinksButton = (
        <div onClick={this.openDialogBox}>
          <MenuItem disabled={networkStatus} divider="true">
            Links
          </MenuItem>
        </div>
      );
    }

    // Creates the Feedback button depending on the status of the network found in local storage
    let FeedbackButton;
    if (networkStatus === 'online') {
      FeedbackButton = (
        <Link to="/feedback" className="gc360-link">
          <MenuItem onClick={this.onClose} divider="true">
            Feedback
          </MenuItem>
        </Link>
      );
    } else {
      FeedbackButton = (
        <div onClick={this.openDialogBox}>
          <MenuItem disabled={networkStatus} divider="true">
            Feedback
          </MenuItem>
        </div>
      );
    }

    let avatar;
    let signInOut;
    let myProfileLink;
    let Admin;
    if (this.props.Authentication) {
      // Set authenticated values for dropdown menu

      let myProfile;
      // Creates the My Profile button link depending on the status of the network found in local storage
      if (networkStatus === 'online') {
        myProfile = '/myprofile';
      } else {
        myProfile = `/profile/${this.state.name.replace(' ', '.')}`;
      }
      myProfileLink = (
        <Link to={myProfile} className="gc360-link">
          <MenuItem onClick={this.onClose} divider={true}>
            My Profile
          </MenuItem>
        </Link>
      );

      avatar = (
        <Avatar className="gc360-nav-avatar-rc_size gc360-nav-avatar-rc_placeholder">
          {this.getInitials()}
        </Avatar>
      );
      if (this.state.image) {
        avatar = (
          <Avatar
            className="gc360-nav-avatar-rc_size"
            src={`data:image/jpg;base64,${this.state.image}`}
          />
        );
      }

      // Creates the Admin button depending on the status of the network found in local storage
      if (networkStatus === 'online') {
        if (user.getLocalInfo().college_role === 'god') {
          Admin = (
            <Link to="/admin" className="gc360-link">
              <MenuItem onClick={this.onClose} divider="true">
                Admin
              </MenuItem>
            </Link>
          );
        }
      } else {
        if (user.getLocalInfo().college_role === 'god') {
          Admin = (
            <div onClick={this.openDialogBox}>
              <MenuItem disabled={networkStatus} divider="true">
                Admin
              </MenuItem>
            </div>
          );
        }
      }

      if (networkStatus === 'online') {
        signInOut = (
          <Link to="/" className="gc360-link">
            <MenuItem onClick={this.onSignOut.bind(this)} divider={true}>
              Sign Out
            </MenuItem>
          </Link>
        );
      } else {
        signInOut = (
          <div onClick={this.openDialogBox}>
            <MenuItem disabled={networkStatus} divider="true">
              Sign Out
            </MenuItem>
          </div>
        );
      }
    } else {
      // Set unauthenticated values for dropdown menu

      avatar = (
        <Avatar
          className="nav-avatar nav-avatar-placeholder"
          src="/images/images.png"
          alt="Guest Icon"
        />
      );

      if (networkStatus === 'online') {
        signInOut = (
          <Link to="/" className="gc360-link">
            <MenuItem onClick={this.onSignIn.bind(this)} divider={true}>
              Sign In
            </MenuItem>
          </Link>
        );
      } else {
        signInOut = (
          <div onClick={this.openDialogBox}>
            <MenuItem disabled={networkStatus} divider="true">
              Sign In
            </MenuItem>
          </div>
        );
      }
    }

    return (
      <section className="right-side-container">
        <Tooltip classes={{ tooltip: 'tooltip' }} id="tooltip-avatar" title={this.state.name}>
          <IconButton
            className="gc360-nav-avatar-rc"
            aria-label="More"
            aria-owns={open ? 'global-menu' : null}
            aria-haspopup="true"
            onClick={this.onClick}
          >
            {avatar}
          </IconButton>
        </Tooltip>
        <Menu
          id="nav-avatar-right-corner"
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={this.onClose}
          disableRestoreFocus // Prevent tooltip from sticking
        >
          {/*This first MenuItem is hidden just to hide the React bug that leaves the first option perpeutally highlighted.*/}
          <MenuItem onClick={this.onClose} style={{ display: 'none' }}>
            My Profile
          </MenuItem>
          {myProfileLink}
          {LinksButton}
          <Link to="/help" className="gc360-link">
            <MenuItem onClick={this.onClose} divider={true}>
              Help
            </MenuItem>
          </Link>
          <Link to="/about" className="gc360-link">
            <MenuItem onClick={this.onClose} divider={true}>
              About
            </MenuItem>
          </Link>
          {FeedbackButton}
          {Admin}
          {signInOut}
          {/**added a clicker effect button */}
          {ClickButton}
        </Menu>

        <QuickLinksDialog
          handleLinkClickOpen={this.handleLinkClickOpen}
          handleLinkClose={this.handleLinkClose}
          linkopen={this.state.linkopen}
        />
        <Dialog
          open={this.state.dialogBoxOpen}
          onClose={clicked => this.closeDialogBox()}
          aria-labelledby="disabled-feature"
          aria-describedby="disabled-feature-description"
        >
          <DialogTitle id="disabled-feature">{'Offline Mode:'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="disabled-feature-description">
              This feature is unavailable offline. Please reconnect to internet to access this
              feature.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={clicked => this.closeDialogBox()} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    );
  }
}

GordonNavAvatarRightCorner.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};
