import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";

import CustomSwitch from "../../../global/Switch/Switch";
import InputText from "../../../global/InputText/InputText";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { SuccessAlert } from "../../../global/alert/Alert";
import CheckBoxThree from "../../../components/checkbox/CheckBoxThree";
import { addDataAPI, filterDataAPI } from "../../../services/CRUDServices";
import { addEditUrls, filterUrls } from "../../../services/api.enums";
import { fetchUpdateRuleData } from "../../../redux/RolsData/RolesData";

interface setRuleAddEditModal {
  isOpen: boolean;
  isActive: boolean;
  data: object | undefined;
}
interface EditRoleProps {
  currentData?: any;
  title: string;
  isActive?: boolean;
  isSomeEdit?: boolean;
  setRuleAddEditModal: (value: setRuleAddEditModal) => void;
}

const validation = yup.object().shape({
  name: yup.string().required("این فیلد اجبرای است"),
});
const AddEditRole: FC<EditRoleProps> = ({
  currentData,
  isSomeEdit,
  setRuleAddEditModal,
}): JSX.Element => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state: any) => state.role);
  const { pageNumbers } = useSelector((state: any) => state.paginate);

  const [treeChecked, setTreeChecked] = useState<Array<string>>([]);

  const [treeCheckedError, setTreeCheckedError] = useState("");
  const [loadingNode, setLoadingNode] = useState(false);
  const [nodes, setNodes] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: {
      name: currentData ? currentData?.name : "",
      isActive: currentData ? currentData?.isActive : true,
    },
    onSubmit: async (values, { resetForm }) => {
      const data = currentData
        ? {
            id: currentData.id,
            name: values.name,
            isActive: values.isActive,
            permsCodes: treeChecked,
          }
        : {
            name: values.name,
            isActive: values.isActive,
            permsCodes: treeChecked,
          };
      if (treeChecked?.length !== 0) {
        try {
          const res = await addDataAPI(
            addEditUrls.rule,
            currentData ? "put" : "post",
            data
          );
          if (200 <= res.status && res.status < 300) {
            dispatch(
              fetchUpdateRuleData({
                ...filter,
                pageSize: 10,
                pageNumber: pageNumbers,
              }) as any
            );
            SuccessAlert(
              currentData
                ? "با موفقیت بروزرسانی گردید"
                : "با موفقیت اضافه گردید"
            );
            values.name = "";
            setTreeChecked([]);
            setRuleAddEditModal({
              isOpen: false,
              isActive: false,
              data: undefined,
            });
          }
        } catch (error) {}
      } else {
        setTreeCheckedError("دسترسی نباید خالی باشد");
      }
    },
  });

  const handleAccess = async () => {
    try {
      setLoadingNode(true);
      const data = await filterDataAPI(filterUrls.rulePermissions, {
        in: "hojjat",
      });
      setNodes(data.data ? data.data : []);
      setLoadingNode(false);
    } catch (error) {
      setLoadingNode(false);
    }
  };

  useEffect(() => {
    handleAccess();
  }, []);

  useEffect(() => {
    if (treeChecked.length !== 0) {
      setTreeCheckedError("");
    }
    if (currentData) {
      setTreeChecked(currentData?.permsCodes);
    }
  }, [currentData, currentData?.permsCodes, treeChecked.length]);

  const { values, errors, handleSubmit, setFieldValue } = formik;

  return (
    <div>
      <form className="grid grid-cols-1  p-6" onSubmit={handleSubmit}>
        <div>
          <div className="w-full flex justify-between gap-x-12">
            <div className="w-[80%] flex-col">
              <InputText
                wrapperClassName="w-full"
                readOnly={isSomeEdit}
                label="عنوان نقش"
                name="name"
                handleChange={formik.handleChange}
                values={formik.values.name ? formik.values.name : ""}
                important
                type={"text"}
                error={errors.name}
              />
            </div>
            <div className="w-[20%] h-full justify-center items-center flex mx-auto mt-[8px]">
              <CustomSwitch
                active={values.isActive}
                handleChange={(checked: any) =>
                  setFieldValue("isActive", checked)
                }
              />
            </div>
          </div>
          <div className="w-full mt-[15px]">
            <CheckBoxThree
              nodes={nodes}
              treeCheckedError={treeCheckedError}
              loadingNode={loadingNode}
              title="دسترسی ها"
              treeChecked={treeChecked}
              setTreeChecked={(checked: Array<string>) => {
                setTreeChecked(checked);
              }}
            />
          </div>

          <div className="flex w-full justify-end gap-3 mt-3">
            <SimpleButton
              type="submit"
              text="بله"
              className="full-tomato-btn px-[50px] "
            />
            <SimpleButton
              type="button"
              text="خیر"
              className="full-lightTomato-btn  px-[50px] "
              handelClick={() => {
                formik.resetForm();
                setRuleAddEditModal({
                  isOpen: false,
                  isActive: false,
                  data: undefined,
                });
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditRole;
