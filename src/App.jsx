import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from './components/MainLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import { OpenRoute } from './routing/openRoute';
import { PrivateRoute } from './routing/privateRoute';
import ContactForm from './pages/contatUsForm/ContactForm';
import AddUsers from './pages/users/AddUsers';
import OurAllUser from './pages/users/OurAllUser';
import AddSocialMedia from './pages/socialMedia/AddSocialMedia';
import SocialMedia from './pages/socialMedia/SocialMedia';
import AddGallery from './pages/gallery/AddGallery';
import Gallery from './pages/gallery/Gallery';
import AddAddress from './pages/addressDetails/AddAddress';
import Address from './pages/addressDetails/Address';
import AddPhoneDet from './pages/phoneDetails/AddPhoneDet';
import PhoneDet from './pages/phoneDetails/PhoneDet';
import AddEmailDet from './pages/emailDetails/AddEmailDet';
import EmailDet from './pages/emailDetails/EmailDet';
import AddOurTeam from './pages/ourTeam/AddOurTeam';
import OurTeam from './pages/ourTeam/OurTeam';
import AddProgramme from './pages/programmes/AddProgramme';
import Programme from './pages/programmes/Programme';
import AddTestimonial from './pages/testimonial/AddTestimonial';
import Testimonial from './pages/testimonial/Testimonial';
import AddNumCount from './pages/numCount/AddNumCount';
import NumCount from './pages/numCount/NumCount';
import AddUnhome from './pages/unhome/AddUnhome';
import Unhome from './pages/unhome/Unhome';
import AddMap from './pages/map/AddMap';
import Map from './pages/map/Map';
import AddAbCont from './pages/aboutCont/AddAbCont';
import AbCont from './pages/aboutCont/AbCont';
import Mission from './pages/mission/Mission';
import AddMission from './pages/mission/AddMission';
import Vision from './pages/vision/Vision';
import AddVision from './pages/vision/AddVision';
import AddService from './pages/services/AddService';
import Service from './pages/services/Service';
import AddSubSer from './pages/serviceSub/AddSubSer';
import SubServ from './pages/serviceSub/SubServ';
import AddOurDonator from './pages/donaters/Adddonators';
import OurDonor from './pages/donaters/Ourdonators';
import CreateFaq from "./pages/Faq/Createfaq"
import Faq from './pages/Faq/Faqall';
import AddBlog from './pages/blog/AddBlogs';
import Blogs from './pages/blog/Blogs';
import AddcrowdFunding from './pages/crowdfunding/Addcrowdfunding';
import Crowdfunding from './pages/crowdfunding/CrowdFuning';
import MemberForm from './pages/memberform/MemberForm';
import AddCategory from './pages/Category/Addcategory';
import CategoryList from './pages/Category/Category';
import AddRoom from './pages/room/Addroom';
import RoomList from './pages/room/Roomlist';
import Boookingpage from './pages/Bookings/GetallBookings';
function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* <Route
            path="/"
            element={
              <OpenRoute>
                <Register />
              </OpenRoute>
            }
          /> */}
          <Route
            path="/"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<ContactForm />} />

            <Route path='membeship_data' element={<MemberForm />} />
            {/* our users data */}
            <Route path='add__user__data' element={<AddUsers />} />
            <Route path='user__list' element={<OurAllUser />} />

            {/* our users data */}
            <Route path='add__Faq__details' element={<CreateFaq />} />
            <Route path='add__Faq__details/:id' element={<CreateFaq />} />
            <Route path='Faq_list' element={<Faq />} />

            {/* Social Media Links */}
            <Route path='add_links' element={<AddSocialMedia />} />
            <Route path='add_links/:id' element={<AddSocialMedia />} />
            <Route path='links_list' element={<SocialMedia />} />

            {/* gallery images */}
            <Route path='add__gallery__details' element={<AddGallery />} />
            <Route path='add__gallery__details/:id' element={<AddGallery />} />
            <Route path='gallery_list' element={<Gallery />} />


            <Route path='add_category_details' element={<AddCategory />} />
            {/* <Route path='add__gallery__details/:id' element={<AddGallery />} /> */}
            <Route path='category_list' element={<CategoryList />} />

            <Route path='add_room_details' element={<AddRoom />} />
            {/* <Route path='add__gallery__details/:id' element={<AddGallery />} /> */}
            <Route path='Room_list' element={<RoomList />} />

            <Route path='add_address__details' element={<AddAddress />} />
            <Route path='add_address__details/:id' element={<AddAddress />} />
            <Route path='address__details__list' element={<Address />} />


            <Route path='bookingpage' element={<Boookingpage />} />

            <Route path='add_phone__details' element={<AddPhoneDet />} />
            <Route path='add_phone__details/:id' element={<AddPhoneDet />} />
            <Route path='phone__details__list' element={<PhoneDet />} />
            <Route path='add_email__details' element={<AddEmailDet />} />
            <Route path='add_email__details/:id' element={<AddEmailDet />} />
            <Route path='email__details__list' element={<EmailDet />} />

            {/* our team details */}
            <Route path='add_our__team___details' element={<AddOurTeam />} />
            <Route path='add_our__team___details/:id' element={<AddOurTeam />} />
            <Route path='our__team___details__list' element={<OurTeam />} />


            {/* our donaters */}

            <Route path='add_donators' element={<AddOurDonator />} />
            <Route path='get_alldonators' element={<OurDonor />} />

            {/* programmes */}
            <Route path='add__programmes__details' element={<AddProgramme />} />
            <Route path='add__programmes__details/:id' element={<AddProgramme />} />
            <Route path='programmes__details__list' element={<Programme />} />

            {/* Crowdfunding */}
            <Route path='add__crowdfunding__details' element={<AddcrowdFunding />} />
            {/* <Route path='add__programmes__details/:id' element={<AddProgramme />} /> */}
            <Route path='crowdfunding__details__list' element={<Crowdfunding />} />


            {/* Blogs */}
            <Route path='add___blogs___details' element={<AddBlog />} />
            <Route path='Blogs__list' element={<Blogs />} />

            <Route path='add-service' element={<AddService />} />
            <Route path='add-service/:id' element={<AddService />} />
            <Route path='service-list' element={<Service />} />

            <Route path='add-sub-serv' element={<AddSubSer />} />
            <Route path='add-sub-serv/:id' element={<AddSubSer />} />
            <Route path='sub-service-list' element={<SubServ />} />


            <Route path='add-mission' element={<AddMission />} />
            <Route path='add-mission/:id' element={<AddMission />} />
            <Route path='mission-list' element={<Mission />} />

            <Route path='add-vision' element={<AddVision />} />
            <Route path='add-vision/:id' element={<AddVision />} />
            <Route path='vision-list' element={<Vision />} />


            {/* our testimonials */}
            <Route path='add--testimonials' element={<AddTestimonial />} />
            <Route path='testimonials--list' element={<Testimonial />} />


            <Route path='add_number_counter_details' element={<AddNumCount />} />
            <Route path='add_number_counter_details/:id' element={<AddNumCount />} />
            <Route path='number_counter_list' element={<NumCount />} />


            <Route path='add-up-team' element={<AddUnhome />} />
            <Route path='add-up-team/:id' element={<AddUnhome />} />
            <Route path='up-team-list' element={<Unhome />} />


            <Route path='add--map' element={<AddMap />} />
            <Route path='add--map/:id' element={<AddMap />} />
            <Route path='map--list' element={<Map />} />

            <Route path='add--about--us' element={<AddAbCont />} />
            <Route path='add--about--us/:id' element={<AddAbCont />} />
            <Route path='about--us--list' element={<AbCont />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
