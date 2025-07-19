import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import Dropzone from "react-dropzone";
import {
  createRoom,
  editRoom,
  fetchSingleRoom,
  resetRoomState,
} from "../../features/room/Roomslice";
import { fetchCategories } from "../../features/category/CategoriesSlice";
import { uploadImg, delImg } from "../../features/upload/uploadSlice";
import CustomInput from "../../components/CustomInput";

const schema = yup.object().shape({
  name: yup.string().required("Room name is required"),
  category: yup.string().required("Category is required"),
  basePricePerNight: yup.number().required("Base price is required"),
  ac: yup.boolean().required("AC availability is required"),
});

const AddRoom = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const roomId = location.pathname.split("/")[3];

  const [images, setImages] = useState([]);
  const { singleRoom } = useSelector((state) => state.room);
  const { categories = [] } = useSelector((state) => state.category || {});
  const imgState = useSelector((state) => state?.upload?.images);

  useEffect(() => {
    if (roomId) {
      dispatch(fetchSingleRoom(roomId));
    } else {
      dispatch(resetRoomState());
    }
    dispatch(fetchCategories());
  }, [roomId, dispatch]);

  const img = [];
  imgState?.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.setFieldValue("images", img);
  }, [imgState]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: singleRoom?.name || "",
      category: singleRoom?.category || "",
      basePricePerNight: singleRoom?.basePricePerNight || 0,
      ac: singleRoom?.ac || false,
      images: singleRoom?.images || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const payload = roomId
        ? { ...values, id: roomId }
        : { ...values, images: [...img] };

      dispatch(roomId ? editRoom(payload) : createRoom(payload));
      setTimeout(() => {
        dispatch(resetRoomState());
      }, 300);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
      <h3 className="mb-4 title">{roomId ? "Edit" : "Add"} Room</h3>

      <CustomInput
        label="Room Name"
        name="name"
        val={formik.values.name}
        onCh={formik.handleChange("name")}
      />

      {/* Category Dropdown */}
      <div>
        <label className="form-label">Category</label>
        <select
          className="form-select"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange("category")}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category && (
          <div className="error">{formik.errors.category}</div>
        )}
      </div>

      {/* Base Price */}
      <CustomInput
        label="Base Price Per Night"
        name="basePricePerNight"
        type="number"
        val={formik.values.basePricePerNight}
        onCh={formik.handleChange("basePricePerNight")}
      />

      {/* AC Checkbox */}
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="acCheckbox"
          checked={formik.values.ac}
          onChange={(e) => formik.setFieldValue("ac", e.target.checked)}
        />
        <label className="form-check-label" htmlFor="acCheckbox">
          AC Available
        </label>
      </div>

      {/* Image Upload Section */}
      <div className="bg-white border-1 p-4 text-center">
        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} className="border p-3 rounded">
                <input {...getInputProps()} />
                <p>Drag & drop or click to select room images</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>

      {/* Image Preview */}
      <div className="showimages d-flex flex-wrap gap-3">
        {imgState?.map((i, j) => (
          <div className="position-relative" key={j}>
            <button
              type="button"
              onClick={() => dispatch(delImg(i.public_id))}
              className="btn-close position-absolute"
              style={{ top: "10px", right: "10px" }}
            ></button>
            <img src={i.url} alt="Room" width={200} height={200} />
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-success mt-4">
        {roomId ? "Update" : "Add"} Room
      </button>
    </form>
  );
};

export default AddRoom;
