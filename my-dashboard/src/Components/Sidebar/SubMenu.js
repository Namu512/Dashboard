import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
    display: flex;
    color: black;
    justify-content: space-between;
    align-items: center;
    padding: 10px; /* Slightly reduced padding */
    list-style: none;
    height: 50px; /* Slightly reduced height */
    text-decoration: none;
    padding-top: 2em;
    font-family: 'Inter', sans-serif; /* Inter font */

    &:hover {
        background: white;
        border-left: 4px solid #632ce4;
        cursor: pointer;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 16px; /* Slightly reduced margin */
`;

const DropdownLink = styled(Link)`
    background: #3B2858;
    height: 50px; /* Slightly reduced height */
    padding-left: 2.5rem; /* Slightly reduced padding */
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-family: 'Inter', sans-serif; /* Inter font */

    &:hover {
        background: #632ce4;
        cursor: pointer;
    }
`;

const SubMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            <SidebarLink to={item.path} onClick={showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {/* Always show the arrow icons */}
                    {subnav ? item.iconOpened : item.iconClosed}
                </div>
            </SidebarLink>
            {subnav &&
                item.subNav.map((item, index) => {
                    return (
                        <DropdownLink to={item.path} key={index}>
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </DropdownLink>
                    );
                })}
        </>
    );
};

export default SubMenu;