import { Route, Routes } from "react-router-dom"

import { AuthContextProvider } from "./contexts/AuthContext"
import { RoomContextProvider } from "./contexts/RoomContext"

import { GuestRouteGuard } from "./components/Common/GuestRouteGuard/GuestRouteGuard"
import { UserRouteGuard } from "./components/Common/UserRouteGuard/UserRouteGuard"
import { RoomOwnerGuard } from "./components/Common/RoomOwnerGuard/RoomOwnerGuard"
import { NotRoomOwnerGuard } from "./components/Common/NotRoomOwnerGuard/NotRoomOwnerGuard"

import { Header } from "./components/Header/Header"
import { Home } from "./components/Home/Home"
import { Footer } from "./components/Footer/Footer"
import { BackToTop } from "./components/BackToTop/BackToTop"
import { Newsletter } from "./components/Newsletter/Newsletter"
import { About } from "./components/About/About"
import { RoomsCatalog } from "./components/RoomsCatalog/RoomsCatalog"
import { AddRoom } from "./components/AddRoom/AddRoom"
import { Testimonials } from "./components/Testimonials/Testimonials"
import { SendMessage } from "./components/SendMessage/SendMessage"
import { Login } from "./components/Sign/Login/Login"
import { Register } from "./components/Sign/Register/Register"
import { Logout } from "./components/Logout/Logout"
import { RoomDetails } from "./components/RoomDetails/RoomDetails"
import { EditRoom } from "./components/EditRoom/EditRoom"
import { NotFound } from "./components/NotFound/NotFound"



function App() {
    return (
        <div className="container-xxl bg-white p-0">
            <AuthContextProvider>
                <RoomContextProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/available-rooms" element={<RoomsCatalog />} />
                        <Route path="/available-rooms/:roomId/details" element={<RoomDetails />} />
                        <Route path="/testimonials" element={<Testimonials />} />

                        <Route element={<UserRouteGuard />}>
                            <Route path="/my-published-rooms" element={<RoomsCatalog />} />
                            <Route path="/my-bookings" element={<RoomsCatalog />} />
                            <Route path="/add-room" element={<AddRoom />} />
                            <Route path="/reservation-confirmed/:roomId" element={<RoomDetails />} />
                            <Route path="/reservation-confirmed/:roomId/send-message" element={<SendMessage />} />
                            <Route path="/logout" element={<Logout />} />

                            <Route element={<RoomOwnerGuard />}>
                                <Route path="/available-rooms/:roomId/edit" element={<EditRoom />} />
                                <Route path="/booking-confirmation/:roomId" element={<RoomDetails />} />
                            </Route>

                            <Route element={<NotRoomOwnerGuard />}>
                                <Route path="/pending-confirmation/:roomId" element={<RoomDetails />} />
                            </Route>
                        </Route>

                        <Route element={<GuestRouteGuard />} >
                            <Route path="/sign-in" element={<Login />} />
                            <Route path="/sign-up" element={<Register />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>

                    <Newsletter />
                    <Footer />
                    <BackToTop />
                </RoomContextProvider>
            </AuthContextProvider>
        </div>
    )
}

export default App
