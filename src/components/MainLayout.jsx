import { useNavigate, Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineLogout,
} from "react-icons/ai";
import { Layout, Menu, Button, theme } from "antd";
import { IoMdAdd } from "react-icons/io";
import { BsListCheck } from "react-icons/bs";
import { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.jpeg"

const { Header, Sider, Content } = Layout;

const MainLayout = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth.user);

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h2 className="text-light fs-5 text-center py-2 mb-0">
              <span className="sm-logo">Asslatur</span>
              <span className="lg-logo">Admin Panel</span>
            </h2>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key === "signout") {
                localStorage.clear();
                // window.location.reload();
                navigate("/");
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "web__users__data",
                label: "Our Users Data",
                children: [
                  {
                    key: "add__user__data",
                    icon: <IoMdAdd className="fs-4" />,
                    label: "Add User",
                  },
                  {
                    key: "user__list",
                    icon: <BsListCheck className="fs-4" />,
                    label: "Users List",
                  },
                ],
              },
              {
                key: "",
                icon: <BsListCheck className="fs-4" />,
                label: "Client Contacts",
              },

              // {
              //   key: "membeship_data",
              //   icon: <BsListCheck className="fs-4" />,
              //   label: "Membership "
              // },
              {
                key: "bookingpage",
                icon: <BsListCheck className="fs-4" />,
                label: "All bookings "
              },
              // {
              //   key: "contact__details",
              //   label: "Contact Details",
              //   children: [
              //     {
              //       key: "add_address__details",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Address Details",
              //     },
              //     {
              //       key: "address__details__list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Address Details List",
              //     },

              //     {
              //       key: "add_phone__details",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Phone Details",
              //     },
              //     {
              //       key: "phone__details__list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Phone Details List",
              //     },

              //     {
              //       key: "add_email__details",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Email Details",
              //     },
              //     {
              //       key: "email__details__list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Email Details List",
              //     },
              //     {
              //       key: "add--map",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Map Location",
              //     },
              //     {
              //       key: "map--list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Map Location List",
              //     },
              //   ],
              // },

              // {
              //   key: "socia__media",
              //   label: "Social Media",
              //   children: [
              //     {
              //       key: "add_links",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Links",
              //     },
              //     {
              //       key: "links_list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Links List",
              //     },
              //   ],
              // },
              // {
              //   key: "mission",
              //   label: "Mission",
              //   children: [
              //     {
              //       key: "add-mission",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Mission",
              //     },
              //     {
              //       key: "mission-list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Mission List",
              //     },
              //   ],
              // },
              // {
              //   key: "vision",
              //   label: "Vision",
              //   children: [
              //     {
              //       key: "add-vision",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Vision",
              //     },
              //     {
              //       key: "vision-list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Vision List",
              //     },
              //   ],
              // },
              // {
              //   key: "gallery",
              //   label: "Gallery",
              //   children: [
              //     {
              //       key: "add__gallery__details",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Gallery",
              //     },
              //     {
              //       key: "gallery_list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Gallery List",
              //     },
              //   ],
              // },
              // {
              //   key: "faq",
              //   label: "FAQ",
              //   children: [
              //     {
              //       key: "add__Faq__details",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add FAQ",
              //     },
              //     {
              //       key: "Faq_list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "FAQ List",
              //     },
              //   ],
              // },
              {
                key: "Category",
                label: "Category",
                children: [
                  {
                    key: "add_category_details",
                    icon: <IoMdAdd className="fs-4" />,
                    label: "Add Category Details",
                  },
                  {
                    key: "category_list",
                    icon: <BsListCheck className="fs-4" />,
                    label: "Category List",
                  },
                ],
              },
              {
                key: "Rooms",
                label: "Rooms",
                children: [
                  {
                    key: "add_room_details",
                    icon: <IoMdAdd className="fs-4" />,
                    label: "Add Room Details",
                  },
                  {
                    key: "Room_list",
                    icon: <BsListCheck className="fs-4" />,
                    label: "Room List",
                  },
                ],
              },

              // {
              //   key: "programmes__data",
              //   label: "Charity Programmes",
              //   children: [
              //     {
              //       key: "add__programmes__details",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Programmes Details",
              //     },
              //     {
              //       key: "programmes__details__list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Programmes Details List",
              //     },
              //   ],
              // },
              // {
              //   key: "Crowdfunding__data",
              //   label: "Crowd Funding ",
              //   children: [
              //     {
              //       key: "add__crowdfunding__details",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add CrowdFunding Details",
              //     },
              //     {
              //       key: "crowdfunding__details__list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "CrowdFunding Details List",
              //     },
              //   ],
              // },
              // {
              //   key: "Blog____data",
              //   label: "Blogs ",
              //   children: [
              //     {
              //       key: "add___blogs___details",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Blog Details",
              //     },
              //     {
              //       key: "Blogs__list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Blogs Details List",
              //     },
              //   ],
              // },

              // {
              //   key: "services",
              //   label: "Services",
              //   children: [
              //     {
              //       key: "add-service",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Service",
              //     },
              //     {
              //       key: "service-list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Service List",
              //     },
              //   ]
              // },
              // {
              //   key: "sub-services",
              //   label: "Sub Services",
              //   children: [
              //     {
              //       key: "add-sub-serv",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Sub Service",
              //     },
              //     {
              //       key: "sub-service-list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Sub Service List",
              //     },
              //   ]
              // },


              {
                key: "our_testimonial_data",
                label: "Our Testimonials",
                children: [
                  {
                    key: "add--testimonials",
                    icon: <IoMdAdd className="fs-4" />,
                    label: "Add Testimonials",
                  },
                  {
                    key: "testimonials--list",
                    icon: <BsListCheck className="fs-4" />,
                    label: "Testimonials List",
                  },
                ],
              },
              // {
              //   key: "numcount",
              //   label: " NumCount",
              //   children: [
              //     {
              //       key: "add_number_counter_details",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Numcount",
              //     },
              //     {
              //       key: "number_counter_list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Numcount List",
              //     },
              //   ],
              // },
              // {
              //   key: "our_team_data",
              //   label: "Our Teams Data",
              //   children: [
              //     {
              //       key: "add_our__team___details",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Our Team",
              //     },
              //     {
              //       key: "our__team___details__list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Our Team List",
              //     },
              //   ],
              // },
              // {
              //   key: "our_donor_data",
              //   label: "Our Donors Data",
              //   children: [
              //     {
              //       key: "add_donators",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Our Donor",
              //     },
              //     {
              //       key: "get_alldonators",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Our Donor List",
              //     },
              //   ],
              // },
              // {
              //   key: "Up-Team",
              //   label: "Upper Team",
              //   children: [
              //     {
              //       key: "add-up-team",
              //       icon: <IoMdAdd className="fs-4" />,
              //       label: "Add Data",
              //     },
              //     {
              //       key: "up-team-list",
              //       icon: <BsListCheck className="fs-4" />,
              //       label: "Data List",
              //     },
              //   ],
              // },

              {
                key: "signout",
                icon: <AiOutlineLogout className="fs-4" />,
                label: "Sign Out",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="d-flex justify-content-between ps-1 px-5"
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <div className="d-flex gap-4 align-items-center">
              {/* <div className="position-relative">
                <IoMdNotifications className="fs-4" />
                <span className="badge bg-primary rounded-circle p-1 position-absolute">
                  3
                </span>
              </div> */}
              <div className="d-flex gap-3 align-items-center">
                <div>
                  <img
                    height={32}
                    width={32}
                    src={logo}
                    alt=""
                  />
                </div>
                <div>
                  <p className="mb-0">{authState?.email}</p>
                  {/* <p className="mb-0">amitkinha2000@gmail.com</p> */}
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default MainLayout;
