import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { deleteGallery, getAll, resetState } from "../../features/gallery/gallerySlice";
const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "Images",
    dataIndex: "images",
  },
  {
    title: "Heading",
    dataIndex: "heading",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Gallery = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [appId, setappId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setappId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAll());
  }, []);

  const visMisState = useSelector((state) => state?.gallery?.gallery);

  const data1 = [];
  for (let i = 0; i < visMisState?.length; i++) {
    data1?.push({
      key: i + 1,
      images: (
        <img height={100} width={100} src={visMisState[i]?.images[0]?.url} />
      ),
      heading: (
        <>
          <div>
            <p>
              {visMisState[i]?.heading}
            </p>
          </div>
        </>
      ),
      action: (
        <>
          <Link
            to={`/admin/add__gallery__details/${visMisState[i]?._id}`}
            className="ms-3 fs-3 text-primary"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(visMisState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteData = (e) => {
    dispatch(deleteGallery(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAll());
    }, 100);
  };


  return (
    <>
      <div>
        <h3 className="mb-4 title"> gallery Data</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteData(appId);
          }}
          title="Are you sure you want to delete this Data?"
        />
      </div>
    </>
  )
}
export default Gallery
