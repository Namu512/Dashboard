// Navbar.js
import React, { useState } from 'react';
import './Navbar.css';
import logo_light from '../../assets/Talent_Corner_Logo.jpeg';
import logo_dark from '../../assets/Talent_Corner_Logo_Dark.png';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from '../Sidebar/SidebarData';
import SubMenu from '../Sidebar/SubMenu';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaMoneyBill, FaExclamationTriangle, FaHandshake, FaChartLine, FaUsers, FaTrophy, FaCoins} from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

const Navbar = ({ theme, setTheme }) => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const toggle_mode = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true);

    const toggleRightSidebar = () => {
        setIsRightSidebarVisible(!isRightSidebarVisible);
    };

    const [openDropdowns, setOpenDropdowns] = useState({});

    const rightSidebarItems = [
        { title: 'Outstanding Dues', icon: <FaMoneyBill />, hasDropdown: true },
        { title: 'Over Due', icon: <FaExclamationTriangle />, hasDropdown: true },
        { title: 'Franchisee Payment Dues', icon: <FaHandshake />, hasDropdown: true },
        { title: 'Outstanding Expenditure', icon: <FaChartLine />, hasDropdown: true },
        { title: 'Client with no Requirement', icon: <FaUsers />, hasDropdown: true},
        { title: 'Team Performance', icon: <FaTrophy />, hasDropdown: true },
        { title: 'Incentive Dues', icon: <FaCoins />, hasDropdown: true },
    ];
    
    return (
        <div className={`app-container ${theme}`}>
            <div className={`navbar ${theme}`}>
                <div className="navbar-left">
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} className="sidebar-toggle" />
                    </NavIcon>
                    <img src={theme === 'light' ? logo_light : logo_dark} alt="Logo" className="logo" />
                    <span className="company-name">Talent Corner Hr Services Pvt Ltd</span>
                </div>

                <div className="navbar-right">
                    <ul>
                        <li>About</li>
                    </ul>
                    <img
                        onClick={toggle_mode}
                        src={theme === 'light' ? toggle_light : toggle_dark}
                        alt="Toggle Theme"
                        className="toggle-icon"
                    />
                    <RightSidebarToggleButton onClick={toggleRightSidebar}>
                        <GiHamburgerMenu />
                    </RightSidebarToggleButton>
                </div>
            </div>

            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <NavIcon to="#">
                        <AiIcons.AiOutlineClose onClick={showSidebar} />
                    </NavIcon>
                    {SidebarData.map((item, index) => {
                        return <SubMenu item={item} key={index} />;
                    })}
                </SidebarWrap>
            </SidebarNav>

                        <RightSidebar isVisible={isRightSidebarVisible}>
                <ul className="right-sidebar-list">
                    {rightSidebarItems.map((item, index) => (
                        <li 
                            key={index} 
                            className="right-sidebar-item"
                            onClick={() => {
                                if (item.hasDropdown) {
                                    setOpenDropdowns(prevState => ({
                                        ...prevState,
                                        [index]: !prevState[index],  // Toggle state
                                    }));
                                }
                            }}
                        >
                            {item.icon}  {/* Main icon */}
                            <span>{item.title}</span>

                            {/* Dropdown Icon Logic */}
                            {item.hasDropdown && (
                                <DropdownArrow>
                                    {openDropdowns[index] ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                                </DropdownArrow>
                            )}
                        </li>
                    ))}
                </ul>
            </RightSidebar>

            <div className="content">
                {/* Your application's main content */}
            </div>
        </div>
    );
};

// Styled Components
const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 0px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
    text-decoration: none;
`;

const SidebarNav = styled.nav`

    background: white;
    width: 250px;
    height: 100vh; 
    height: calc(100vh - 80px - 150px); /* Calculate height */
    justify-content: center;
    position: fixed;
    top: 80px; /* Match navbar height */
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
    padding-top: -100px;
    overflow-y: auto; /* Add scroll if content overflows */
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const RightSidebar = styled.aside`
    width: 300px; /* Match left sidebar width */
    background: white;
    position: absolute;
    top: 80px;
    right: ${({ isVisible }) => (isVisible ? '0' : '-100%')}; /* Similar to left sidebar behavior */
    height: calc(100vh - 80px - 150px); /* Match left sidebar height */
    overflow-y: auto;
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;


const RightSidebarToggleButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 1.8rem; /* Reduce size to match */
    color: ${({ theme }) => (theme === 'dark' ? 'white' : 'black')};
    display: flex;
    align-items: center;
    color: purple;
`;

const DropdownArrow = styled.span`
    margin-left: auto;  /* Push icon to the right */
    padding-left: 20px;
    display: flex;
    align-items: center;
    font-size: 10px;
    color: black;
    cursor: pointer;
`;

export default Navbar;