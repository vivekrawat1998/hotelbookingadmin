import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import {
  fetchCategories,
  removeCategory,
  resetCategoryState,
} from "../../features/category/CategoriesSlice"; // ✅ Correct path & names

const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [catId, setCatId] = useState("");

  useEffect(() => {
    dispatch(resetCategoryState());
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryState = useSelector((state) => state.category.categories);

  const dataSource = categoryState?.map((cat, i) => ({
    key: i + 1,
    name: cat.name,
    action: (
      <button
        className="ms-3 fs-3 text-danger bg-transparent border-0"
        onClick={() => {
          setCatId(cat.id);
          setOpen(true);
        }}
      >
        <AiFillDelete />
      </button>
    ),
  }));

  const handleDelete = () => {
    dispatch(removeCategory(catId));
    setOpen(false);
    setTimeout(() => dispatch(fetchCategories()), 300);
  };

  return (
    <>
      <h3 className="mb-4 title">Category List</h3>
      <Table columns={columns} dataSource={dataSource} />
      <CustomModal
        open={open}
        hideModal={() => setOpen(false)}
        performAction={handleDelete}
        title="Are you sure you want to delete this category?"
      />
    </>
  );
};

export default CategoryList;
