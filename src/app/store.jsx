import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import uploadReducer from "../features/upload/uploadSlice";
import contactFormReducer from "../features/contactusform/contactFormSlice";
import addressReducer from "../features/addressed/addressSlice";
import phoneReducer from "../features/phone/phoneSlice";
import emailReducer from "../features/emails/emailSlice";
import programmeReducer from "../features/programme/programmeSlice";
import ourTeamReducer from "../features/ourTeam/ourTeamSlice";
import galleryReducer from "../features/gallery/gallerySlice";
import socMediaReducer from "../features/socialMedia/socialSlice";
import testimonialReducer from "../features/testimonial/testimonialSlice";
import numCountReducer from "../features/numCount/numSlice";
import mapReducer from "../features/map/mapSlice";
import aboutReducer from "../features/aboutCont/aboutContSlice";
import missionReducer from "../features/mission/missionSlice";
import visionReducer from "../features/vision/visionSlice";
import serviceReducer from "../features/services/serSlice";
import subServReducer from "../features/serviceSub/serSubSlice";
import upTeamReducer from "../features/upTeam/upTeamSlice";
import ourDonorReducer from "../features/donors/donorFormslice"
import faqReducer from "../features/faq/Faqslice"
import crowdfundingReducer from "../features/crowdfunding/crowdfundingSlice"
import memberReducer from "../features/membership/membershipSlice"
import categoryReducer from "../features/category/CategoriesSlice"
import roomReducer from "../features/room/Roomslice"
import bookingSliceReducer from "../features/booking/Bookingslices"
import blogReducer from "../features/blog/BlogSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer,
        upload: uploadReducer,
        category: categoryReducer,
        room: roomReducer,
        ourDonor: ourDonorReducer,
        contactForm: contactFormReducer,
        address: addressReducer,
        phone: phoneReducer,
        email: emailReducer,
        programme: programmeReducer,
        ourTeam: ourTeamReducer,
        gallery: galleryReducer,
        socMedia: socMediaReducer,
        testimonial: testimonialReducer,
        numCount: numCountReducer,
        map: mapReducer,
        about: aboutReducer,
        mission: missionReducer,
        vision: visionReducer,
        service: serviceReducer,
        subServ: subServReducer,
        upTeam: upTeamReducer,
        faq: faqReducer,
        crowdfunding: crowdfundingReducer,
        members: memberReducer,
        bookings: bookingSliceReducer
    }
})