import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";
import { deleteBlogThunk, getBlogThunk, resetState } from "../../features/blog/BlogSlice";


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
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Author",
    dataIndex: "author",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Blog = () => {
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
    dispatch(getBlogThunk());
  }, []);

  const blogState = useSelector((state) => state?.blog?.blogs);
  console.log(blogState);

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
              {blogState[i]?.heading}
            </p>
          </div>
        </>
      ),
      content: (
        <>
          <div>
            <p
              dangerouslySetInnerHTML={{ __html: blogState[i]?.content }}
            ></p>
          </div>
        </>
      ),
      date: (
        <>
          <div>
            <p>
              {blogState[i]?.date}
            </p>
          </div>
        </>
      ),
      author: (
        <>
          <div>
            <p>
              {blogState[i]?.author}
            </p>
          </div>
        </>
      ),
      action: (
        <>
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
      dispatch(getBlogThunk());
    }, 100);
  };


  return (
    <>
      <div>
        <h3 className="mb-4 title"> Blogs List</h3>
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

export default Blog;


