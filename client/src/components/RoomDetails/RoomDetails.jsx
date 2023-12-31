import "./RoomDetails.css"

import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import { useRoomContext } from "../../contexts/RoomContext";
import { useMessageContext } from "../../contexts/MessageContext";
import PATH from "../../utils/paths";

import { Search } from "../Common/Search/Search";
import { CommonHeader } from "../Common/CommonHeader/CommonHeader";
import { MessagesCatalog } from "../MessagesCatalog/MessagesCatalog";
import { WeatherDetails } from "./WeatherDetails/WeatherDetails";



export const RoomDetails = () => {
    const locationPathname = useLocation().pathname;
    const { roomId } = useParams();
    const { userId, username } = useAuthContext();
    const [roomMessages, setRoomMessages] = useState([]);
    const [roomDataWithDetails, setroomDataWithDetails] = useState({});

    const { getRoomFromState, onDeleteRoomClick, onBookRoomInteract, getRoomAndBookerDetails, getRoomAndOwnerDetails } = useRoomContext();
    const { getRoomMessages } = useMessageContext();
    const roomData = getRoomFromState(roomId);
    useEffect(() => {
        getRoomMessages(roomId)
            .then(data => setRoomMessages(data));
        if (locationPathname == `/booking-confirmation/${roomId}`) {
            getRoomAndBookerDetails(roomId)
                .then(data => setroomDataWithDetails(data));
        } else if (locationPathname == `/pending-confirmation/${roomId}`) {
            getRoomAndOwnerDetails(roomId)
                .then(data => setroomDataWithDetails(data));
        }
    }, [roomId]);
    return (
        <>
            <CommonHeader />
            <Search />
            <div className="room-details wow fadeInUp" data-wow-delay="0s">
                <div className="room-item shadow rounded overflow-hidden">
                    <div className="p-4 mt-2 room-details">
                        <div className="details-container">
                            <div className="details-location-container justify-content-between mb-3">
                                <h5 className="mb-0">{roomData?.name} details</h5>
                                <h5 className="mb-0"><i className="fas fa-map-marker-alt text-primary me-2" />{roomData?.location}</h5>
                            </div>
                            <div className="mb-3">
                                <small className="border-end me-3 pe-3">
                                    <i className="fas fa-dollar-sign text-primary me-2" />{roomData?.price}
                                </small>
                                <small className="border-end me-3 pe-3">
                                    <i className="fa fa-bed text-primary me-2" />{roomData?.bed}
                                </small>
                                <small className="border-end me-3 pe-3">
                                    <i className="fa fa-bath text-primary me-2" />{roomData?.bath}
                                </small>
                                <small className="border-end me-3 pe-3">
                                    <i className="fa fa-male text-primary me-2" />{roomData?.adult}
                                </small>
                                <small className="border-end me-3 pe-3">
                                    <i className="fa fa-baby text-primary me-2" />{roomData?.child}
                                </small>
                                {
                                    roomData?.wifi == "Yes" &&
                                    <small className="border-end me-3 pe-3">
                                        <i className="fa fa-wifi text-primary me-2" />
                                        Yes
                                    </small>
                                }

                                {
                                    roomData?.parking == "Yes" &&
                                    <small className="border-end me-3 pe-3">
                                        <i className="fa fa-parking text-primary me-2" />
                                        Yes
                                    </small>
                                }
                            </div>
                        </div>
                        <div className="weather-img-container">
                            <WeatherDetails location={roomData?.location} />
                            <div className="position-relative room-img" >
                                <img className="img-fluid" src={roomData?.imageUrl} alt="room image" />
                            </div>
                        </div>
                        <div className="text-body mb-3 details-description">
                            {(locationPathname == `/available-rooms/${roomId}/details` ||
                                locationPathname == `/reservation-confirmed/${roomId}`) &&
                                <>
                                    <h5>Description</h5>
                                    {roomData?.description}
                                </>
                            }
                        </div>

                        {locationPathname == `/booking-confirmation/${roomId}` &&
                            <div className="confirmation-container">
                                <h5>Booking confirmation</h5>
                                <p>Dear {username},</p>
                                <p>Congratulations! Your confirmation has been successfully processed, and the reservation for <span className="contact-person">{`${roomDataWithDetails?.booker?.firstName} ${roomDataWithDetails?.booker?.lastName}`}</span> has been confirmed. Please ensure all arrangements are in order to provide a seamless experience for our guest. If you have any questions or need assistance, feel free to reach out. Thank you for being a valued host.</p>
                                <p>Warm regards,</p>
                                <p>ReactBook's team</p>
                            </div>

                        }
                        {locationPathname == `/pending-confirmation/${roomId}` &&
                            <div className="confirmation-container">
                                <h5>Pending confirmation</h5>
                                <p>Dear {username},</p>
                                <p>Thank you for your booking! Your request has been received, and we are currently liaising with the host <span className="contact-person">{`${roomDataWithDetails?.owner?.firstName} ${roomDataWithDetails?.owner?.lastName}`} </span> to confirm your reservation. Please allow us a short period for confirmation, and we'll promptly update you once everything is finalized. Your patience is greatly appreciated.</p>
                                <p>Best regards,</p>
                                <p>ReactBook's team</p>
                            </div>
                        }
                        {/* Owner buttons on available rooms page before room is booked*/}
                        {
                            userId == roomData?._ownerId &&
                            locationPathname == `/available-rooms/${roomId}/details` &&

                            <div className="d-flex justify-content-between">
                                <Link className="btn btn-sm btn-primary rounded py-2 px-4" to={`/available-rooms/${roomData?._id}/edit`}>
                                    Edit Room
                                </Link>
                                <a onClick={(e) => onDeleteRoomClick(e, roomId)} className="btn btn-sm btn-dark rounded py-2 px-4" href="#">
                                    Delete Room
                                </a>
                            </div>
                        }
                        {/* Owner buttons on booking confirmation page or reservation confirmed page */}

                        {
                            userId == roomData?._ownerId &&
                            (locationPathname == `/booking-confirmation/${roomId}` ||
                                locationPathname == `/reservation-confirmed/${roomId}`) &&

                            <div className="d-flex justify-content-between">
                                <Link className="btn btn-sm btn-primary rounded py-2 px-4" to="/my-published-rooms">
                                    Published Rooms
                                </Link>
                                <Link className="btn btn-sm btn-dark rounded py-2 px-4" to={PATH.AVAILABLE_ROOMS}>
                                    Available Rooms
                                </Link>
                            </div>
                        }
                        {/* Not owner user buttons before booking */}
                        {
                            userId &&
                            userId != roomData?._ownerId &&
                            !roomData?.bookedBy &&

                            <div className="d-flex justify-content-between">
                                <Link onClick={() => onBookRoomInteract({ ...roomData, bookedBy: userId }, roomId, `/pending-confirmation/${roomId}`)} className="btn btn-sm btn-primary rounded py-2 px-4" to="#">
                                    Book Room
                                </Link>
                                <Link className="btn btn-sm btn-dark rounded py-2 px-4" to={PATH.AVAILABLE_ROOMS}>
                                    Available Rooms
                                </Link>
                            </div>
                        }

                        {/* Not owner user buttons after booking */}
                        {
                            userId &&
                            userId != roomData?._ownerId &&
                            roomData?.bookedBy &&

                            <div className="d-flex justify-content-between">
                                <Link className="btn btn-sm btn-primary rounded py-2 px-4" to="/my-bookings">
                                    Check your bookings
                                </Link>
                                <Link className="btn btn-sm btn-dark rounded py-2 px-4" to={PATH.AVAILABLE_ROOMS}>
                                    Available Rooms
                                </Link>
                            </div>
                        }
                        {/* Guest */}
                        {
                            !userId &&

                            <div className="d-flex justify-content-between">
                                <Link className="btn btn-sm btn-primary rounded py-2 px-4" to="/sign-in">
                                    Sign In to Book
                                </Link>
                                <Link className="btn btn-sm btn-dark rounded py-2 px-4" to={PATH.AVAILABLE_ROOMS}>
                                    Back to Catalog
                                </Link>
                            </div>
                        }

                    </div>
                </div>
            </div >
            {
                roomMessages?.length > 0 ?
                    <MessagesCatalog roomMessages={roomMessages} roomData={roomData} /> :
                    null
            }
        </>
    );
}