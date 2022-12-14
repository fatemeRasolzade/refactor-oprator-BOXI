import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { Button } from "@material-tailwind/react";
import InputText from "../../../../global/InputText/InputText";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import DatePickers from "../../../../global/DatePicker/DatePicker";
import Checkbox from "../../../../components/checkbox/Checkbox";
import {
  EditDataParams,
  getDataHeaderServer,
} from "../../../../services/Service_call";
import { apiRoute } from "../../../../services/apiRoute";
import { ErrorAlert, SuccessAlert } from "../../../../global/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { clearEdit } from "../../../../redux/HubData/EditData";
import Modal from "../../../../global/Modal/Modal";
const HubEdit = ({
  setActive,
  active,
  dataEdit,
}: {
  setActive?: any;
  active?: any;
  dataEdit?: any;
}) => {
  // const {editData} =useSelector((state:any)=>state.editHub)
  const dispatch = useDispatch();

  useEffect(() => {
    function getDataSelect() {
      try {
        getDataHeaderServer(apiRoute().get.get_hub_type).then((res) => {
          if (res.status === "OK") settypeHub(res.payload);
        });
        getDataHeaderServer(apiRoute().get.select_hub_category).then((res) => {
          if (res.status === "OK") setCatHub(res.payload.content);
        });
        getDataHeaderServer(apiRoute().get.get_province_city).then((res) => {
          if (res.status === "OK") setCities(res.payload.content);
        });
        getDataHeaderServer(apiRoute().get.get_province_loc).then((res) => {
          if (res.status === "OK") setProvinceLoc(res.payload.content);
        });
        getDataHeaderServer(apiRoute().get.get_select_province).then((res) => {
          if (res.status === "OK") setSelectProvince(res.payload.content);
        });
        getDataHeaderServer(apiRoute().get.select_hub).then((res) => {
          if (res.status === "OK") setselectHub(res.payload.content);
        });
      } catch (error) {
        ErrorAlert("???????????? ???????? ???? ???????? ?????????? ????");
      }
    }
    getDataSelect();

    return () => {
      dispatch(clearEdit());
    };
  }, []);

  const [typeHub, settypeHub] = useState([]);
  const [catHub, setCatHub] = useState([]);
  const [citys, setCities] = useState([]);
  const [provinceLoc, setProvinceLoc] = useState([]);
  const [selectProvince, setSelectProvince] = useState([]);
  const [selectHub, setselectHub] = useState([]);


console.log("first",dataEdit)


  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: dataEdit?.id,
          code: dataEdit?.code,
          name: dataEdit?.name,
          selectHubType: {
            id: dataEdit?.selectHubType?.id,
            text: dataEdit?.selectHubType?.text,
          },
          selectHubCategory: {
            id: dataEdit?.selectHubCategory?.id,
            text: dataEdit?.selectHubCategory?.text,
          },
          selectParentHub: {
            id: dataEdit?.selectParentHub?.id,
            text: dataEdit?.selectParentHub?.text,
          },
          pinCode: dataEdit?.pinCode,
          locationStartDate: {
            day: dataEdit?.locationStartDate?.day,
            month: dataEdit?.locationStartDate?.month,
            year: dataEdit?.locationStartDate?.year,
          },
          mandatoryArrivalScan: dataEdit?.mandatoryArrivalScan,
          isActive: dataEdit?.isActive,
          dropOffAllowed: dataEdit?.dropOffAllowed,
          selectState: {
            id: dataEdit?.selectState?.id,
            text: dataEdit?.selectState?.text,
          },
          selectCity: {
            id: dataEdit?.selectCity?.id,
            text: dataEdit?.selectCity?.text,
          },
          selectRegion: {
            id: dataEdit?.selectRegion?.id,
            text: dataEdit?.selectRegion?.text,
          },
          plateNumber: dataEdit?.plateNumber,
          addressLine1: dataEdit?.addressLine1,
          addressLine2: dataEdit?.addressLine2,
          locLate: dataEdit?.locLate,
          locLong: dataEdit?.locLong,
        }}
        //validationSchema={addHubschema}
        onSubmit={(values) => {
          console.log("ttt", values);
          EditDataParams(apiRoute().post.hub, values).then((res) => {
            if (res.status === "OK") {
              SuccessAlert("???? ???????????? ???????????? ????");
            } else {
              ErrorAlert("?????? ???? ?????????????? ??????????????");
            }
          });
        }}
      >
        {(formik) => (
          <Modal visible={active} setVisible={setActive} title="???????????? ??????">
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full grid grid-cols-5 gap-2">
                <div>
                  <InputText
                  readOnly
                    label="??????????"
                    name="code"
                    handleChange={formik.handleChange}
                    values={formik.values.code}
                    important
                    type={"text"}
                    wrapperClassName="!w-full"
                    error={formik.touched.code && formik.errors.code}
                  />
                </div>
                <div>
                  <InputText
                    label="?????? ??????"
                    name="name"
                    handleChange={formik.handleChange}
                    values={formik.values.name}
                    important
                    type={"text"}
                    wrapperClassName="!w-full min-w-0"
                    error={formik.touched.name && formik.errors.name}
                  />
                </div>
                <div>
                  {" "}
                  <InputSelect
                    label="?????? ??????"
                    name="selectHubType"
                    handleChange={formik.setFieldValue}
                    values={formik.values.selectHubType}
                    options={typeHub}
                    wrapperClassName="!w-full min-w-0"
                    important
                  />
                </div>
                <div>
                  <InputSelect
                    label="???????? ??????"
                    name="selectHubCategory"
                    handleChange={formik.setFieldValue}
                    values={formik.values.selectHubCategory}
                    options={catHub}
                    wrapperClassName="!w-full min-w-0"
                    important
                  />
                </div>

                {formik.values.selectHubType.text === "????????" ? (
                  <div>
                    <InputSelect
                      label="?????? ????????"
                      name="selectParentHub"
                      handleChange={formik.setFieldValue}
                      values={formik.values.selectParentHub}
                      options={selectHub}
                      wrapperClassName="!w-full min-w-0"
                      important
                    />
                  </div>
                ) : null}

                {/* <div ><InputText label='?????? ????'  name="pinCode" handleChange={formik.handleChange} values={formik.values.pinCode} type={"text"} wrapperClassName="!w-full min-w-0"/></div> */}
                <div className="col-span-5">
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <DatePickers
                        title="?????????? ???????? ????????????"
                        name="locationStartDate"
                        handleChange={formik.setFieldValue}
                        values={formik.values.locationStartDate}
                        important
                      />
                    </div>
                    <div>
                      <Checkbox
                        title="???????? ???????????? ???? ?????????? ?????? ???????????? ???? ????????"
                        name="mandatoryArrivalScan"
                        handleChange={formik.handleChange}
                        values={formik.values.mandatoryArrivalScan}
                      />
                    </div>

                    <div>
                      <Checkbox
                        title="????????"
                        name="isActive"
                        handleChange={formik.handleChange}
                        values={formik.values.isActive}
                      />
                    </div>
                    {formik.values.selectHubType.text === "????????" ? (
                      <div>
                        <Checkbox
                          title="?????????? ?????????? ???????????? ????????"
                          name="dropOffAllowed"
                          handleChange={formik.handleChange}
                          values={formik.values.dropOffAllowed}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-span-5">
                  <div className="grid grid-cols-5 gap-4">
                    {" "}
                    <InputSelect
                      label="??????????"
                      name="selectState"
                      handleChange={formik.setFieldValue}
                      values={formik.values.selectState}
                      options={selectProvince}
                      wrapperClassName="!w-full min-w-0"
                    />
                    <div>
                      <InputSelect
                        label="??????"
                        name="selectCity"
                        handleChange={formik.setFieldValue}
                        values={formik.values.selectCity}
                        options={citys}
                        wrapperClassName="!w-full min-w-0"
                      />
                    </div>
                    <div>
                      <InputSelect
                        label="??????????"
                        name="selectRegion"
                        handleChange={formik.setFieldValue}
                        values={formik.values.selectRegion}
                        options={provinceLoc}
                        wrapperClassName="!w-full min-w-0"
                      />
                    </div>
                    <div>
                      <InputText
                        label="????????"
                        name="plateNumber"
                        handleChange={formik.handleChange}
                        values={formik.values.plateNumber}
                        type={"number"}
                        wrapperClassName="!w-full min-w-0"
                      />
                    </div>
                    <div>
                      <InputText
                        label="???????? 1"
                        name="addressLine1"
                        handleChange={formik.handleChange}
                        values={formik.values.addressLine1}
                        type={"text"}
                        wrapperClassName="!w-full min-w-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="!col-span-2 ">
                  <InputText
                    label="???????? 2"
                    name="addressLine2"
                    handleChange={formik.handleChange}
                    values={formik.values.addressLine2}
                    type={"text"}
                    wrapperClassName="!w-full min-w-0"
                  />
                </div>
                {/* <div>????????</div> */}
                <div className="col-span-5 flex flex-row justify-end items-center">
                  <Button
                    className="border-none bg-secondaryColor text-dark"
                    onClick={() => setActive(false)}
                  >
                    ??????
                  </Button>
                  <Button className="border-none bg-tomato mr-3" type="submit">
                    ????????????
                  </Button>
                </div>
              </div>
            </form>
           </Modal>
        )}
      </Formik>
    </>
  );
};

export default HubEdit;
