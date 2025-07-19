import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { deleteOurDonor, getOurDonor, resetState } from "../../features/donors/donorFormslice";


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
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Amount",
        dataIndex: "amount",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];


const OurDonor = () => {

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
        dispatch(getOurDonor());
    }, []);

    const carouselState = useSelector((state) => state?.ourDonor?.ourDonor);


    const data1 = [];
    for (let i = 0; i < carouselState?.length; i++) {
        data1.push({
            key: i + 1,
            images: (
                <img height={100} width={100} src={carouselState[i]?.images[0]?.url} />
            ),
            name: (
                <>
                    <div>
                        <p>{carouselState[i]?.name}</p>
                    </div>
                </>
            ),
            amount: (
                <>
                    <div>
                        <p>{carouselState[i]?.amount}</p>
                    </div>
                </>
            ),
            action: (
                <>
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(carouselState[i]?._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }

    const deleteData = (e) => {
        dispatch(deleteOurDonor(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getOurDonor());
        }, 100);
    };


    return (
        <>
            <div>
                <h3 className="mb-4 title">Our Director</h3>
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


export default OurDonor;