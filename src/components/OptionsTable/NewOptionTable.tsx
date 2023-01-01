interface NewOptionTableProps {}
const NewOptionTable = ({ items }: any) => {
  return (
    <div className="mt-6">
      <ul className="flex gap-4 justify-start items-center flex-wrap">
        {items.map((value: any) => {
          return <li>{value.item}</li>;
        })}
      </ul>
    </div>
  );
};

export default NewOptionTable;
