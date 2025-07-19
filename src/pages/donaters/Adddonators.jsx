import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import CustomInput from '../../components/CustomInput';
import { createOurDonor, updateOurDonor, getSinOurDonor, resetState } from "../../features/donors/donorFormslice";
let Schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    amount: yup.string().required("Position is Required"),
});

const AddOurDonator = () => {
    const dispatch = useDispatch();
    const [images, setImages] = useState([]);
    const location = useLocation();
    const getDonorId = location.pathname.split("/")[3];
    const navigate = useNavigate();
    const imgState = useSelector((state) => state?.upload?.images);
    const newBoard = useSelector((state) => state?.ourDonor);
    const {
        isSuccess,
        isError,
        isLoading,
        doneOurDonor,
        otAmount,
        otName,
        otImages,
        updatedOurDonor,
    } = newBoard;

    useEffect(() => {
        if (getDonorId !== undefined) {
            dispatch(getSinOurDonor(getDonorId));
            img?.push(otImages);
        } else {
            dispatch(resetState());
        }
    }, [getDonorId]);

    useEffect(() => {
        dispatch(resetState());
    }, []);

    useEffect(() => {
        if (isSuccess && doneOurDonor) {
            toast.success("Data Added Successfullly!");
        }
        if (isSuccess && updatedOurDonor) {
            toast.success("Data Updated Successfullly!");
            // navigate("/admin/our__Donor___details__list");
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
    }, [images]);

    // formik validation
    const formik = useFormik({
        initialValues: {
            name: otName || "",
            amount: otAmount || "",
        },
        validationSchema: Schema,
        onSubmit: (values) => {
            if (getDonorId !== undefined) {
                const data = { id: getDonorId, DonorData: values };
                dispatch(updateOurDonor(data));
                dispatch(resetState());
            } else {
                const newDem = {
                    images: [...img],
                    amount: values?.amount,
                    name: values?.name,
                };
                dispatch(createOurDonor(newDem));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });

    return (
        <>
            <div>
                <h3 className="mb-4 title">
                    {getDonorId !== undefined ? "Edit" : "Add"} Content
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
                                    <div className=" amount-relative"
                                        key={j}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => dispatch(delImg(i.public_id))}
                                            className="btn-close amount-absolute"
                                            style={{ top: "10px", right: "10px" }}
                                        ></button>
                                        <img src={i.url} alt="" width={200} height={200} />
                                    </div>
                                );
                            })}
                        </div>

                        <CustomInput
                            type="text"
                            label="Enter Name"
                            name="name"
                            onCh={formik.handleChange("name")}
                            val={formik.values.name}
                            onBl={formik.handleBlur("name")}
                        />

                        <div className="error">
                            {formik.touched.name && formik.errors.name}
                        </div>


                        <CustomInput
                            type="text"
                            label="Enter amount"
                            name="amount"
                            onCh={formik.handleChange("amount")}
                            val={formik.values.amount}
                            onBl={formik.handleBlur("amount")}
                        />

                        <div className="error">
                            {formik.touched.amount && formik.errors.amount}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success border-0 rounded-3 my-5 w-100"
                        >
                            {getDonorId !== undefined ? "Edit" : "Add"} Content
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddOurDonator;