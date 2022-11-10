import EditIcon from "@mui/icons-material/Edit";
import { Switch } from "@mui/material";

const label = { inputProps: { "aria-label": "Switch demo" } };


export const notificationData = [
  {
    id: 1,
    name: "Order Placed",
    sms: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Email: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Notification: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Action: <EditIcon />,
  },
  {
    id: 2,
    name: "Order Failure",
    sms: "NA",
    Email: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Notification: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Action: <EditIcon />,
  },
  {
    id: 3,
    name: "Order Failure",
    sms: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Email: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Notification: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Action: <EditIcon />,
  },
  {
    id: 4,
    name: "Payment Done",
    sms: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Email: "NA",
    Notification: "NA",
    Action: <EditIcon />,
  },
  {
    id: 5,
    name: "Scheduled Order Reminder",
    sms: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Email: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Notification: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Action: <EditIcon />,
  },
  {
    id: 6,
    name: "New Signup",
    sms: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Email: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Notification: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Action: <EditIcon />,
  },
  {
    id: 7,
    name: "Add Restaurant From Dashboard",
    sms: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Email: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Notification: "NA",
    Action: <EditIcon />,
  },
  {
    id: 8,
    name: "Forgot Password",
    sms: "NA",
    Email: "NA",
    Notification: "NA",
    Action: <EditIcon />,
  },
  {
    id: 9,
    name: "Order Reminder",
    sms: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Email: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Notification: (
      <div className="Switch">
        <Switch {...label} defaultChecked />
      </div>
    ),
    Action: <EditIcon />,
  },
];
