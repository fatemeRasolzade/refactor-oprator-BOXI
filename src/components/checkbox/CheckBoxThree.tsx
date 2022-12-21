import React, { ChangeEvent, FC, useEffect, useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import {
  MdAddBox,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdChevronLeft,
  MdIndeterminateCheckBox,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { BeatLoader } from "react-spinners";

interface CheckBoxThreeProps {
  title: string;
  treeCheckedError: string;
  loadingNode: boolean;
  nodes: Array<any>;
  treeChecked: Array<string>;
  setTreeChecked?: (value: Array<string>) => void;
  nodeChecked?: (value: any) => void;
}
const CheckBoxThree: FC<CheckBoxThreeProps> = ({
  loadingNode,
  treeChecked,
  nodes,
  title,
  treeCheckedError,
  setTreeChecked,
  nodeChecked,
}): JSX.Element => {
  const [expanded, setExpanded] = useState([]);
  const [filtertree, setFiltertree] = useState<string>("");
  const [treeData, setTreeData] = useState<Array<any>>(nodes ? nodes : []);

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiltertree(e.target.value);
    setTreeData(filterBy(nodes, e.target.value));
  };
  useEffect(() => {
    setTreeData(nodes);
  }, [nodes]);

  return (
    <div className="w-full relative ">
      <div className="flex justify-center pr-[10px] text-[0.875rem] font-sm text-[#686a68] dark:text-white absolute top-[-10px] right-[15px] bg-[white]">
        {title}
        <span className="text-[#ef5644]">&nbsp;* &nbsp;</span>
      </div>
      <div className="h-[300px]  border border-[#ababab] text-gray-900 text-sm rounded-lg w-[100%] focus:border-blue-500 block px-2.5 py-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {loadingNode && (
          <div className="flex w-full h-[200px] justify-center items-center">
            <BeatLoader color="#EF5644" />
          </div>
        )}
        <input
          value={filtertree}
          placeholder="جستجو ..."
          onChange={onFilterChange}
          className="my-3 w-full  p-2 border  border-[#ababab] rounded-lg outline-0"
        />
        {!loadingNode && (
          <>
            <CheckboxTree
              direction="rtl"
              nodes={treeData}
              checked={treeChecked}
              expanded={expanded}
              onCheck={(checked: Array<string>, node: any) => {
                setTreeChecked && setTreeChecked(checked);
                // nodeChecked &&
                //   nodeChecked(getByID(node?.parent, node.value) || {});
                nodeChecked && nodeChecked(node);
                console.log("node", node);

                console.log("sdgnsdvdv", getByID(node?.parent, node.value));
              }}
              onExpand={(expanded: any) => setExpanded(expanded)}
              icons={icons}
            />
          </>
        )}
      </div>
      <p className="text-[#d05372] text-[10px]">
        {treeCheckedError && treeCheckedError}
      </p>
    </div>
  );
};
export default CheckBoxThree;
const icons = {
  check: <MdCheckBox className="rct-icon rct-icon-check text-[#EF5644] " />,
  uncheck: <MdCheckBoxOutlineBlank className="rct-icon rct-icon-uncheck" />,
  halfCheck: (
    <MdIndeterminateCheckBox className="rct-icon rct-icon-half-check" />
  ),
  expandClose: <MdChevronLeft className="rct-icon rct-icon-expand-close" />,
  expandOpen: <MdKeyboardArrowDown className="rct-icon rct-icon-expand-open" />,
  expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
  collapseAll: (
    <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />
  ),
  parentClose: <></>,
  parentOpen: <></>,
  leaf: <></>,
};

const filterBy = (arr: Array<any>, query: string): Array<any> => {
  return query
    ? arr.reduce((acc, item) => {
        if (item.children?.length) {
          const filtered = filterBy(item.children, query);
          if (filtered.length) return [...acc, { ...item, children: filtered }];
        }

        const { children, ...itemWithoutChildren } = item;
        return item.label?.toLowerCase().includes(query.toLowerCase())
          ? [...acc, itemWithoutChildren]
          : acc;
      }, [])
    : arr;
};

const getByID = (tree: any, value: string) => {
  let result = null;

  if (value === tree?.value) {
    return tree;
  } else {
    if (tree.children) {
      tree.children.some((node: any) => (result = getByID(node, value)));
    }
    return result;
  }
};
