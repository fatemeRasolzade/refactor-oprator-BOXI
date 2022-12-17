import { useCallback, useEffect, useState } from "react";
import { selectDataFromServerWithHeader, selectHubFromServerWithHeader } from "../../services/Service_call";
import { ErrorAlert } from "../alert/Alert";

export const useGetOptions = (url: string, isModalOpen?: boolean) => {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      selectDataFromServerWithHeader(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("myToken") },
      }).then((res) => {
        setLoading(false);
        if (res.status === "OK") setOptions(res?.payload?.content);
      });
    } catch (error: any) {
      setError(error);
      setLoading(false);
      ErrorAlert("دریافت دیتا با خطلا مواجه شد");
    }
  }, [url]);
  return { options, error, loading };
};
export const useGetHubOptions = (url: string, isModalOpen?: boolean) => {
  const [hubOptions, setOptions] = useState({ options: [], error: "", loading: false });

  useEffect(() => {
    if (isModalOpen) {
      try {
        setOptions({ ...hubOptions, loading: true });
        selectHubFromServerWithHeader(
          url,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("myToken") },
          },
        ).then((res) => {
          if (res.status === "OK") setOptions({ ...hubOptions, options: res?.payload, loading: false });
        });
      } catch (error: any) {
        setOptions({ ...hubOptions, error: error, loading: false });
        ErrorAlert("دریافت دیتا با خطلا مواجه شد");
      }
    }
  }, [isModalOpen]);
  return { hubOptions };
};
export const useGetFuelTypeOptions = (url: string, isModalOpen?: boolean) => {
  const [fuelOptions, setOptions] = useState({ options: [], error: "", loading: false });

  useEffect(() => {
    if (isModalOpen) {
      try {
        setOptions({ ...fuelOptions, loading: true });
        selectDataFromServerWithHeader(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("myToken") },
        }).then((res) => {
          if (res.status === "OK") setOptions({ ...fuelOptions, options: res?.payload, loading: false });
        });
      } catch (error: any) {
        setOptions({ ...fuelOptions, error: error, loading: false });
        ErrorAlert("دریافت دیتا با خطلا مواجه شد");
      }
    }
  }, [isModalOpen]);
  return { fuelOptions };
};

export const useGetVendorOptions = (url: string, isModalOpen?: boolean) => {
  const [vendorOptions, setOptions] = useState({ options: [], error: "", loading: false });
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      try {
        setOptions({ ...vendorOptions, loading: true });
        selectDataFromServerWithHeader(url, {
          headers: { Authorization: "Bearer " + localStorage.getItem("myToken") },
        }).then((res) => {
          if (res.status === "OK") setOptions({ ...vendorOptions, options: res?.payload?.content, loading: false });
        });
      } catch (error: any) {
        setOptions({ ...vendorOptions, error: error, loading: false });
        ErrorAlert("دریافت دیتا با خطلا مواجه شد");
      }
    }
  }, [isModalOpen]);
  return { vendorOptions };
};
