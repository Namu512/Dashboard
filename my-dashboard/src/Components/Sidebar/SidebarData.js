import React from 'react';
import { HiOutlineCube, HiOutlinePlus } from 'react-icons/hi';
import { BsFileBarGraph } from 'react-icons/bs';
import { GiCash } from 'react-icons/gi';
import { TbReport } from 'react-icons/tb';
import { MdOutlineCalendarMonth, MdPlayArrow } from 'react-icons/md';
import { RiSettings4Line, RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Master Data',
        path: '/masterdata',
        icon: <HiOutlineCube />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        subNav: [
            { title: 'Taxation', path: '/masterdata/taxation', icon: <MdPlayArrow /> },
            { title: 'Salary Data', path: '/masterdata/salarydata', icon: <MdPlayArrow /> },
            { title: 'Salary Deduction', path: '/masterdata/salarydeduction', icon: <MdPlayArrow /> },
            { title: 'Franchisee Terms', path: '/masterdata/franchiseeterms', icon: <MdPlayArrow /> }, // Fixed path casing
            { title: 'Client Terms', path: '/masterdata/clientterms', icon: <MdPlayArrow /> },
            { title: 'Expenses', path: '/masterdata/expenses', icon: <MdPlayArrow /> },
        ]
    },
    {
        title: 'In-House Data',
        path: '/in-housedata',
        icon: <BsFileBarGraph />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        subNav: [
            { title: 'Employee Data', path: '/in-housedata/employee', icon: <MdPlayArrow /> },
            { title: 'Franchisee Data', path: '/in-housedata/franchisee', icon: <MdPlayArrow /> },
            { title: 'Client Data', path: '/in-housedata/client', icon: <MdPlayArrow /> },
            { title: 'Legal Data', path: '/in-housedata/legal', icon: <MdPlayArrow /> }, // Fixed path casing
            { title: 'Billing Data', path: '/in-housedata/billing', icon: <MdPlayArrow /> },
            { title: 'Enquiry Data', path: '/in-housedata/enquiry', icon: <MdPlayArrow /> },
            { title: 'Vendor Data', path: '/in-housedata/vendor', icon: <MdPlayArrow /> },
        ]
    },
    {
        title: 'Transaction Data',
        path: '/transactiondata',
        icon: <GiCash />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
    },
    {
        title: 'Reports',
        path: '/reports',
        icon: <TbReport />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
    },
    {
        title: 'MIS Reports',
        path: '/misreports',
        icon: <MdOutlineCalendarMonth />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
    },
    {
        title: 'Add On Feature',
        path: '/addonfeature',
        icon: <HiOutlinePlus />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
    },
    {
        title: 'Admin Page',
        path: '/adminpage',
        icon: <RiSettings4Line />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
    },
];

export default SidebarData;