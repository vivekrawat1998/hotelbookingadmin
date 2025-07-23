import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import {
  fetchRooms,
  removeRoom,
  resetRoomState,
} from "../../features/room/Roomslice";

const RoomList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  console.log("rooms", roomId)

  const { rooms = [] } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(resetRoomState());
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(removeRoom(roomId));
    setOpen(false);
    setTimeout(() => dispatch(fetchRooms()), 300);
  };

  const columns = [
    { title: "S.No.", dataIndex: "key" },
    {
      title: "Image",
      dataIndex: "image",
    },
    { title: "Room Name", dataIndex: "name" },
    { title: "Category", dataIndex: "category" },
    { title: "Base Price (Per Night)", dataIndex: "basePricePerNight" },
    { title: "AC", dataIndex: "ac" },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const dataSource = Array.isArray(rooms)
    ? rooms.map((room, i) => ({
        key: i + 1,
        image: room.images && room.images.length > 0 ? (
          <img
            src={room.images[0].url}
            alt="room"
            width={100}
            height={100}
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
        ) : (
          "No Image"
        ),
        name: room.name,
        category: room.category?.name || "—",
        basePricePerNight: room.basePricePerNight,
        ac: room.ac ? "Yes" : "No",
        action: (
          <button
            className="text-danger border-0 bg-transparent"
            onClick={() => {
              setRoomId(room.id);
              setOpen(true);
            }}
          >
            <AiFillDelete />
          </button>
        ),
      }))
    : [];

  return (
    <>
      <h3 className="mb-4 title">Room List</h3>
      <Table columns={columns} dataSource={dataSource} />
      <CustomModal
        open={open}
        hideModal={() => setOpen(false)}
        performAction={handleDelete}
        title="Are you sure you want to delete this room?"
      />
    </>
  );
};

export default RoomList;
