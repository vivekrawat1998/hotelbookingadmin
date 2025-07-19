import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import CustomInput from "../../components/CustomInput";
import { createBlogThunk, getSingleBlogThunk, resetState, updateBlogThunk } from "../../features/blog/BlogSlice";

let Schema = yup.object().shape({
  heading: yup.string().required("Heading is Required"),
  content: yup.string().required("Content is Required")
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  const navigate = useNavigate();

  const imgState = useSelector((state) => state?.upload?.images);
  const blogState = useSelector((state) => state?.blog);

  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    blogImages,
    blogContent,
    blogHeading,
    updatedBlog,
  } = blogState;

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getSingleBlogThunk(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfully!");
      navigate("/admin/blogs__details__list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [images, imgState]);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const userId = user?._id;

  if (!userId) {
    // Optionally show a message or redirect
    alert("You must be logged in to create a blog.");
    // return or navigate to login page if needed
  }

  const formik = useFormik({
    initialValues: {
      heading: blogHeading || "",
      content: blogContent || "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, progData: values };
        dispatch(updateBlogThunk(data));
        dispatch(resetState());
      } else {
        const newBlog = {
          heading: values?.heading,
          content: values?.content,
          images: [...img],
          user: userId
        };
        dispatch(createBlogThunk(newBlog));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
      [{ 'br': '' }]
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  return (
    <>
      <div>
        <h3 className="mb-4 title">
          {getBlogId !== undefined ? "Edit" : "Add"} Blog
        </h3>
        <div>
          <form
            action=""
            onSubmit={formik.handleSubmit}
            className="d-flex gap-3 flex-column"
          >
            <div className="bg-white border-1 p-5 text-center">
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="showimages d-flex flex-wrap gap-3">
              {imgState?.map((i, j) => {
                return (
                  <div className=" position-relative"
                    key={j}
                  >
                    <button
                      type="button"
                      onClick={() => dispatch(delImg(i.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={i.url} alt="" width={200} height={200} />
                  </div>
                );
              })}
            </div>
            <CustomInput
              type="text"
              label="Enter Heading"
              name="heading"
              onCh={formik.handleChange("heading")}
              val={formik.values.heading}
              onBl={formik.handleBlur("heading")}
            />
            <div className="error">
              {formik.touched.heading && formik.errors.heading}
            </div>
            <div className="">
              <ReactQuill
                name="content"
                theme="snow"
                modules={modules}
                formats={formats}
                placeholder="Enter Content Here"
                onChange={formik.handleChange("content")}
                value={formik.values.content}
              />
              <div className="error">
                {formik.touched.content && formik.errors.content}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 my-5 w-100"
            >
              {getBlogId !== undefined ? "Edit" : "Add"} Blog
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddBlog;