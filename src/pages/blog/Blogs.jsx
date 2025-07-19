import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { deleteBlogThunk, getBlogsThunk, resetState } from "../../features/blog/BlogSlice";

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
      title: "Content",
      dataIndex: "content",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
];

const Blogs = () => {
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
    dispatch(getBlogsThunk());
  }, []);

  const blogState = useSelector((state) => state?.blog?.blogs);

  const data1 = [];
  for (let i = 0; i < blogState?.length; i++) {
    data1?.push({
      key: i + 1,
      images: (
        <img height={100} width={100} src={blogState[i]?.images[0]?.url} />
      ),
      heading: (
        <>
          <div>
            <p>
            { blogState[i]?.heading}
            </p>
          </div>
        </>
      ),
      content: (
        <>
          <div>
            <p dangerouslySetInnerHTML={{__html: blogState[i]?.content}}></p>
          </div>
        </>
      ),
      action: (
        <>
          <Link
            to={`/admin/add__blogs__details/${blogState[i]?._id}`}
            className="ms-3 fs-3 text-primary"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteData = (e) => {
    dispatch(deleteBlogThunk(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogsThunk());
    }, 100);
  };

  return (
    <>
    <div>
      <h3 className="mb-4 title"> Blogs Data</h3>
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

export default Blogs;