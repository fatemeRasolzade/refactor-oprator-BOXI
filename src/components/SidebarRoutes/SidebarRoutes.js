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
    label: "داشبورد",
    childs: [
      {
        to: "/",
        component: <Dashboard />,
        label: "داشبورد",
      },
    ],
  },
  {
    Icon: <MdDeviceHub size={"25"} />,
    label: "مدیریت هاب",
    childs: [
      {
        to: "/hub",
        component: <Hub />,
        label: "هاب",
      },
    ],
  },

  {
    Icon: <MdForwardToInbox size={"25"} />,
    label: "مدیریت مرسوله",
    childs: [
      {
        to: "/label-print-request",
        component: <LabelPrintRequest />,
        label: "درخواست چاپ برچسب",
      },
      {
        to: "/download-request",
        component: <DownloadRequest />,
        label: "درخواست دانلود",
      },
    ],
  },

  {
    Icon: <MdPeopleAlt size={"25"} />,
    label: "مدیریت پرسنل",
    childs: [
      {
        to: "/personnel",
        component: <Personnel />,
        label: "پرسنل",
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
        label: "مدیریت جمع‌آوری",
      },
      {
        to: "/delivery-management",
        component: <DeliveryManagement />,
        label: "مدیریت تحویل",
      },
      {
        to: "/trip-management",
        component: <TripManagement />,
        label: "مدیریت سفر",
      },
      {
        to: "/shelf-management",
        component: <ShelfManagement />,
        label: "مدیریت قفسه",
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
        label: "بررسی",
      },
      {
        to: "/trips",
        component: <Trips />,
        label: "سفرها",
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
        label: "مدیریت مرسوله",
      },
      {
        to: "/CRM-managment/consignment",
        component: <CRMManagment />,
        label: "گروه بندی مشتریان",
      },
      {
        to: "/CRM-managment/salesChannel",
        component: <SaleChannel />,
        label: "کانال فروش",
      },
    ],
  },
  {
    Icon: <MdPersonSearch size={"25"} />,
    label: "مدیریت نقش ها",
    childs: [
      {
        to: "/roles",
        component: <Roles />,
        label: "نقش",
      },
    ],
  },

  // {
  //   Icon: <MdInfoOutline size={"25"} />,
  //   label: "اطلاعات پایه محصول",
  //   childs: [
  //     {
  //       to: "/roles",
  //       component: <Roles />,
  //       label: "نقش",
  //     },
  //   ],
  // },
  {
    Icon: <MdOutlineAllInbox size={"25"} />,
    label: "مدیریت سرویس",
    childs: [
      {
        to: "/service-information/product",
        component: <ProductDefine />,
        label: "تعریف محصول",
      },
      {
        to: "/service-information/product-info",
        component: <ProductInfo />,
        label: "تعریف مشخصات محصول",
      },
      {
        to: "/service-information/service-definition",
        component: <ServiceDefinition />,
        label: "تعریف سرویس",
      },
      {
        to: "/basic-information/service-provision",
        component: <ServiceProvision />,
        label: "ارائه سرویس",
      },
      {
        to: "/service-information/price",
        component: <Price />,
        label: "نرخ نامه",
      },
    ],
  },
  {
    Icon: <MdManageAccounts size={"25"} />,
    label: "مدیریت اطلاعات پایه",
    childs: [
      {
        to: "/basic-information/thirdparty",
        component: <Thirdparty />,
        label: "اشخاص حقیقی/حقوقی",
      },
      {
        to: "/basic-information/transportation",
        component: <Transportation />,
        label: "حمل و نقل",
      },
      {
        to: "/basic-information/ADMVehicle",
        component: <ADMVehicle />,
        label: "وسایل نقلیه اجاره‌ای",
      },
      {
        to: "/basic-information/customer-management",
        component: <CustomerManagement />,
        label: "مدیریت مشتریان",
      },
      // {
      //   to: "/basic-information/shelf-management",
      //   component: <ShelfManagement />,
      //   label: "مدیریت قفسه‌ها",
      // },
      {
        to: "/basic-information/product-group",
        component: <ProductGroup />,
        label: "گروه بندی محصولات",
      },
      {
        to: "/basic-information/service-time",
        component: <ServiceTime />,
        label: "تعریف مدت ارئه خدمت",
      },
      // {
      //   to: "/basic-information/pincode-management",
      //   component: <PincodeManagement />,
      //   label: "مدیریت پین‌کد",
      // },
      {
        to: "/basic-information/custom-geographic-category",
        component: <CustomGeographic />,
        label: "رده جغرافیایی سفارشی",
      },
    ],
  },
  {
    Icon: <BiLogOut size={"25"} onClick={() => UserService.doLogout()} />,
    label: "خروج",
    childs: [],
  },
];
