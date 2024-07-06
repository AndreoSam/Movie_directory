import React, { useEffect, useState } from 'react'
import "./Header.css"
import { useDispatch } from 'react-redux'
// import { Button } from 'react-bootstrap'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { userProfile } from '../Reducer/mediaSlice';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const Header = () => {
  const [img, setImg] = useState("")
  const [state, setState] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userProfile())
      .then((res) => {
        // console.log(res.payload.data[0]);
        setImg(res.payload.data[0].image)
        setState(res.payload.data[0])
      })
  }, [dispatch])
  const navigate = useNavigate();

  //logout
  // const handleLogout = () => {
  //   dispatch(logoutUser())
  //     .then((res) => {
  //       navigate("/login")
  //     })
  //     .catch((err) => { console.log(err); })
  // }

  return (
    <div className='header_css'>
      <div>Test Server</div>
      <div>
        Welcome Mr.{state.name}
      </div>
      <div>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Link variant="contained" style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap:"5px" }} {...bindTrigger(popupState)}>
                <img src={`https://webskitters-student.onrender.com/${img}`} style={{ height: "30px", borderRadius: "20px" }} />
                <div>
                Profile
                </div>
              </Link>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>
                  <Link to={"/user/dashboard"} style={{ textDecoration: "none" }}>
                    My Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={popupState.close}>
                  <Link to={"/user/dashboard"} style={{ textDecoration: "none" }}>
                    Logout
                  </Link>
                </MenuItem>
                {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
    </div>
  )
}

export default Header