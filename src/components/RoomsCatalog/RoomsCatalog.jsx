import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import { useRoomContext } from "../../contexts/RoomContext";

import { CommonHeader } from "../Common/CommonHeader/CommonHeader";
import { RoomCard } from "../RoomCard/RoomCard";
import { Search } from "../Common/Search/Search";

export const RoomsCatalog = () => {
    const locationPathname = useLocation().pathname;
    const [currentPageInfo, setCurrentPageInfo] = useState({
        roomsCatalog: {
            mainHeading: '',
            mainHeadingSpan: '',
            secondaryHeading: '',
        },
        noRooms: {
            mainHeading: '',
            mainHeadingSpan: '',
            secondaryHeading: '',
            to: ''
        },
        filterRooms: () => '',
    });

    const pageInfo = useRef({
        "/available-rooms": {
            roomsCatalog: {
                mainHeading: 'Explore available ',
                mainHeadingSpan: 'Rooms',
                secondaryHeading: 'Our Rooms',
            },
            noRooms: {
                mainHeading: 'Add a ',
                mainHeadingSpan: 'Room',
                secondaryHeading: 'No Available Rooms',
                to: '/add-room'
            },
            filterRooms: (rooms, userId) => rooms.filter(room => !room.booked && room._ownerId != userId),
        },
        "/my-published-rooms":  {
            roomsCatalog: {
                mainHeading: 'Rooms you ',
                mainHeadingSpan: 'Published',
                secondaryHeading: 'Your Rooms',
            },
            noRooms: {
                mainHeading: 'Add a ',
                mainHeadingSpan: 'Room',
                secondaryHeading: 'No Published Rooms',
                to: '/add-room'
            },
            filterRooms: (rooms, userId) => rooms.filter(room => !room.booked && room._ownerId == userId),
        },
        "/my-bookings": {
            roomsCatalog: {
                mainHeading: 'Rooms you ',
                mainHeadingSpan: 'Booked',
                secondaryHeading: 'Your Rooms',
            },
            noRooms: {
                mainHeading: 'Book a ',
                mainHeadingSpan: 'Room',
                secondaryHeading: 'No Booked Rooms',
                to: '/available-rooms'
            },
            filterRooms: (rooms, userId) => rooms.filter(room => room.booked && room._ownerId != userId),
        },
        "/my-hosted-rooms": {
            roomsCatalog: {
                mainHeading: 'Rooms you ',
                mainHeadingSpan: 'Hosted',
                secondaryHeading: 'Your Rooms',
            },
            noRooms: {
                mainHeading: 'Add a ',
                mainHeadingSpan: 'Room',
                secondaryHeading: 'No Hosted Rooms',
                to: '/add-room'
            },
            filterRooms: (rooms, userId) => rooms.filter(room => room.booked && room._ownerId == userId),
        },

    });

    useEffect(() => {
        setCurrentPageInfo(pageInfo.current[locationPathname]);
    }, [locationPathname, pageInfo]);

    let { rooms } = useRoomContext();
    const { userId } = useAuthContext()
    rooms = currentPageInfo.filterRooms(rooms, userId);
    return (
        <>
            <CommonHeader />
            <Search />
            <div className="container-xxl py-5">
                <div className="container">
                    {rooms.length > 0 ?
                        <>
                            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                                <h6 className="section-title text-center text-primary text-uppercase">
                                    {currentPageInfo.roomsCatalog?.secondaryHeading}
                                </h6>
                                <h1 className="mb-5">
                                {currentPageInfo.roomsCatalog?.mainHeading} <span className="text-primary text-uppercase">{currentPageInfo.roomsCatalog?.mainHeadingSpan}</span>
                                </h1>
                            </div>
                            <div className="row g-4">
                                {rooms.map(room => <RoomCard key={room._id} {...room} />)}
                            </div>
                        </> :
                        <>
                            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                                <h6 className="section-title text-center text-primary text-uppercase">
                                {currentPageInfo.noRooms?.secondaryHeading}

                                </h6>
                                <h1 className="mb-5">
                                {currentPageInfo.noRooms?.mainHeading}
                                    <Link to={currentPageInfo.noRooms?.to}>
                                        <span className="text-primary text-uppercase">{currentPageInfo.noRooms?.mainHeadingSpan}</span>
                                    </Link>
                                </h1>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
}