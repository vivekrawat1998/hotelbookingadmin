import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import {
  createCategory,
  editCategory,
  fetchSingleCategory,
  resetCategoryState,
} from "../../features/category/CategoriesSlice";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const categoryId = location.pathname.split("/")[3];

  const {
    isSuccess,
    isError,
    isLoading,
    singleCategory,
  } = useSelector((state) => state.category);

  // Fetch or reset category state on mount
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSingleCategory(categoryId));
    } else {
      dispatch(resetCategoryState());
    }
  }, [categoryId, dispatch]);

  // Show toast messages on success/failure
  useEffect(() => {
    if (isSuccess && !categoryId) toast.success("Category added successfully!");
    if (isSuccess && categoryId) toast.success("Category updated successfully!");
    if (isError) toast.error("Something went wrong!");
  }, [isSuccess, isError, categoryId]);

  // Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: singleCategory?.name || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (categoryId) {
        dispatch(editCategory({ id: categoryId, name: values.name }));
      } else {
        dispatch(createCategory(values));
      }
      formik.resetForm();
      setTimeout(() => dispatch(resetCategoryState()), 300);
    },
  });

  return (
    <>
      <h3 className="mb-4 title">{categoryId ? "Edit" : "Add"} Category</h3>
      <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
        <CustomInput
          type="text"
          label="Enter Category Name"
          name="name"
          onCh={formik.handleChange("name")}
          val={formik.values.name}
          onBl={formik.handleBlur("name")}
        />
        <div className="error">{formik.touched.name && formik.errors.name}</div>
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-5 w-100"
          disabled={isLoading}
        >
          {categoryId ? "Update" : "Add"} Category
        </button>
      </form>
    </>
  );
};

export default AddCategory;
