import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallBookings } from "../../features/booking/Bookingslices";
import { Table, Tag, Spin, Alert } from "antd";
import moment from "moment";

const Boookingpage = () => {
  const dispatch = useDispatch();

  const {
    bookings,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getallBookings());
  }, [dispatch]);

  const columns = [
    {
      title: "User Name",
      dataIndex: ["user", "name"],
      key: "userName",
    },
    {
      title: "Room Name",
      dataIndex: ["room", "name"],
      key: "roomName",
    },
    {
      title: "AC Option",
      dataIndex: "acOption",
      key: "acOption",
      render: (acOption) => (
        <Tag color={acOption === "AC" ? "blue" : "green"}>{acOption}</Tag>
      ),
    },
    {
      title: "Check In",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Check Out",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Nights",
      dataIndex: "nights",
      key: "nights",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `₹ ${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "pending" ? "orange" : "green"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "16px" }}>All Bookings</h2>

      {isLoading ? (
        <Spin tip="Loading bookings..." />
      ) : isError ? (
        <Alert message="Error" description={message} type="error" showIcon />
      ) : (
        <Table
          columns={columns}
          dataSource={bookings?.bookings || []}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 8 }}
        />
      )}
    </div>
  );
};

export default Boookingpage;
