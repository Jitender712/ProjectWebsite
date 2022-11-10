import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import {
  UilUsdSquare,
  UilClipboardAlt,
} from "@iconscout/react-unicons";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
// Sidebar Data
export const SidebarData = [
  {
    name: "Dashboard",
    icon: HomeOutlinedIcon,
    heading : "Home"
  },
  {
    name : "Product",
    icon: Inventory2OutlinedIcon,
    heading : "Products"
  },
  {
    name : "Marketing",
    icon: CampaignOutlinedIcon,
    heading : "Marketing"
  },
  {
    name : "Settings",
    icon: SettingsOutlinedIcon,
    heading : "Settings"
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Customers",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 0,
    value: "01",
    png: Person2OutlinedIcon,
    series: [
      {
        name: "Customers",
        // data: [31, 40, 28, 51, 42, 109, 100],
        data: [0],
      },
    ],
  },
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 0,
    value: "0.0",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [0],
        // data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Orders",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 0,
    value: "00",
    png: UilClipboardAlt,
    series: [
      {
        name: "Orders",
        // data: [10, 25, 15, 30, 12, 15, 20],
        data: [0],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    // img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    // img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    // img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];

export const RemindersData = [
  {
    id:1,
    name: "Booking Reminder",
    icon: ErrorOutlineOutlinedIcon,
    msg: "Contrairement à une opinion répand",
  },
  {
    id :2,
    name: "New Message",
    icon: MailOutlinedIcon,
    msg: "Contrairement à une opinion répand",
  },
  {
    id : 3,
    name: "Upcoming Booking",
    icon: ErrorOutlineOutlinedIcon,
    msg: "Contrairement à une opinion répand",
  },
  {
    id :4,
    name: "New Message",
    icon: MailOutlinedIcon,
    msg: "Contrairement à une opinion répand",
  },
];

export const categoryData=[]