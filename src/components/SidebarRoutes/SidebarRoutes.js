import {
  MdDeviceHub,
  MdDashboard,
  MdForwardToInbox,
  MdPeopleAlt,
  MdDeliveryDining,
  MdCardTravel,
  MdMarkunreadMailbox,
  MdPersonSearch,
  MdInfoOutline,
  MdOutlineAllInbox,
  MdManageAccounts,
} from "react-icons/md";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Hub from "../../pages/Hub/Hub";
import ConsignmentManage from "../../pages/ConsignmentManage/ConsignmentManage";
import LabelPrintRequest from "../../pages/LabelPrintRequest/LabelPrintRequest";
import DownloadRequest from "../../pages/DownloadRequest/DownloadRequest";
import Personnel from "../../pages/Personnel/Personnel";
import CollectManagement from "../../pages/CollectManagement/CollectManagement";
import DeliveryManagement from "../../pages/DeliveryManagement/DeliveryManagement";
import TripManagement from "../../pages/TripManagement/TripManagement";
import ShelfManagement from "../../pages/ShelfManagement/ShelfManagement";
import MDLManagement from "../../pages/MDLManagement/MDLManagement";
import Trips from "../../pages/Trips/Trips";
import CRMManagment from "../../pages/CRMManagment/CRMManagment";
import Roles from "../../pages/Roles/Roles";
import ProductInfo from "../../pages/ServiceManagement/ProductInfo/ProductInfo";

import ServiceProvision from "../../pages/ServiceProvision/ServiceProvision";
import Price from "../../pages/Price/Price";
import Thirdparty from "../../pages/Thirdparty/Thirdparty";
import Transportation from "../../pages/BasicInformations/Transportation";
import ADMVehicle from "../../pages/ADMVehicle/ADMVehicle";
import CustomerManagement from "../../pages/CustomerManagement/CustomerManagement";
import ProductGroup from "../../pages/ProductGroup/ProductGroup";
import ServiceTime from "../../pages/ServiceTime/ServiceTime";
import CustomGeographic from "../../pages/CustomGeographic/CustomGeographic";
import ServiceDefinition from "../../pages/ServiceManagement/ServiceDefinition";
import ProductDefine from "../../pages/ServiceManagement/ProductDefine";
import SaleChannel from "../../pages/SalesChannel/index";
import { BiLogOut } from "react-icons/bi";
import UserService from "../../services/keycloakService";

export const links = [
  {
    Icon: <MdDashboard size={"25"} />,
    label: "??????????????",
    childs: [
      {
        to: "/",
        component: <Dashboard />,
        label: "??????????????",
      },
    ],
  },
  {
    Icon: <MdDeviceHub size={"25"} />,
    label: "???????????? ??????",
    childs: [
      {
        to: "/hub",
        component: <Hub />,
        label: "??????",
      },
    ],
  },

  {
    Icon: <MdForwardToInbox size={"25"} />,
    label: "???????????? ????????????",
    childs: [
      {
        to: "/label-print-request",
        component: <LabelPrintRequest />,
        label: "?????????????? ?????? ??????????",
      },
      {
        to: "/download-request",
        component: <DownloadRequest />,
        label: "?????????????? ????????????",
      },
    ],
  },

  {
    Icon: <MdPeopleAlt size={"25"} />,
    label: "???????????? ??????????",
    childs: [
      {
        to: "/personnel",
        component: <Personnel />,
        label: "??????????",
      },
    ],
  },
  {
    Icon: <MdDeliveryDining size={"25"} />,
    label: "FLM Management",
    childs: [
      {
        to: "/collect-management",
        component: <CollectManagement />,
        label: "???????????? ?????????????????",
      },
      {
        to: "/delivery-management",
        component: <DeliveryManagement />,
        label: "???????????? ??????????",
      },
      {
        to: "/trip-management",
        component: <TripManagement />,
        label: "???????????? ??????",
      },
      {
        to: "/shelf-management",
        component: <ShelfManagement />,
        label: "???????????? ????????",
      },
    ],
  },
  {
    Icon: <MdCardTravel size={"25"} />,
    label: "MDL Management",
    childs: [
      {
        to: "/overview",
        component: <MDLManagement />,
        label: "??????????",
      },
      {
        to: "/trips",
        component: <Trips />,
        label: "??????????",
      },
    ],
  },
  {
    Icon: <MdMarkunreadMailbox size={"25"} />,
    label: "CRM Management",
    childs: [
      {
        to: "/consignment-manage",
        component: <ConsignmentManage />,
        label: "???????????? ????????????",
      },
      {
        to: "/CRM-managment/consignment",
        component: <CRMManagment />,
        label: "???????? ???????? ??????????????",
      },
      {
        to: "/CRM-managment/salesChannel",
        component: <SaleChannel />,
        label: "?????????? ????????",
      },
    ],
  },
  {
    Icon: <MdPersonSearch size={"25"} />,
    label: "???????????? ?????? ????",
    childs: [
      {
        to: "/roles",
        component: <Roles />,
        label: "??????",
      },
    ],
  },

  // {
  //   Icon: <MdInfoOutline size={"25"} />,
  //   label: "?????????????? ???????? ??????????",
  //   childs: [
  //     {
  //       to: "/roles",
  //       component: <Roles />,
  //       label: "??????",
  //     },
  //   ],
  // },
  {
    Icon: <MdOutlineAllInbox size={"25"} />,
    label: "???????????? ??????????",
    childs: [
      {
        to: "/service-information/product",
        component: <ProductDefine />,
        label: "?????????? ??????????",
      },
      {
        to: "/service-information/product-info",
        component: <ProductInfo />,
        label: "?????????? ???????????? ??????????",
      },
      {
        to: "/service-information/service-definition",
        component: <ServiceDefinition />,
        label: "?????????? ??????????",
      },
      {
        to: "/basic-information/service-provision",
        component: <ServiceProvision />,
        label: "?????????? ??????????",
      },
      {
        to: "/service-information/price",
        component: <Price />,
        label: "?????? ????????",
      },
    ],
  },
  {
    Icon: <MdManageAccounts size={"25"} />,
    label: "???????????? ?????????????? ????????",
    childs: [
      {
        to: "/basic-information/thirdparty",
        component: <Thirdparty />,
        label: "?????????? ??????????/??????????",
      },
      {
        to: "/basic-information/transportation",
        component: <Transportation />,
        label: "?????? ?? ??????",
      },
      {
        to: "/basic-information/ADMVehicle",
        component: <ADMVehicle />,
        label: "?????????? ?????????? ?????????????????",
      },
      {
        to: "/basic-information/customer-management",
        component: <CustomerManagement />,
        label: "???????????? ??????????????",
      },
      // {
      //   to: "/basic-information/shelf-management",
      //   component: <ShelfManagement />,
      //   label: "???????????? ???????????????",
      // },
      {
        to: "/basic-information/product-group",
        component: <ProductGroup />,
        label: "???????? ???????? ??????????????",
      },
      {
        to: "/basic-information/service-time",
        component: <ServiceTime />,
        label: "?????????? ?????? ?????????? ????????",
      },
      // {
      //   to: "/basic-information/pincode-management",
      //   component: <PincodeManagement />,
      //   label: "???????????? ?????????????",
      // },
      {
        to: "/basic-information/custom-geographic-category",
        component: <CustomGeographic />,
        label: "?????? ?????????????????? ????????????",
      },
    ],
  },
  {
    Icon: <BiLogOut size={"25"} onClick={() => UserService.doLogout()} />,
    label: "????????",
    childs: [],
  },
];
