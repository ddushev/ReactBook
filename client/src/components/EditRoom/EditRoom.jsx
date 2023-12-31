import { useEffect } from "react";
import { useParams } from "react-router";

import { useAuthContext } from "../../contexts/AuthContext";
import { useRoomContext } from "../../contexts/RoomContext";
import { dataFactory } from "../../services/dataRequests";
import { ROOM_FORM_FIELDS } from "../../utils/constants";
import useForm from "../../hooks/useForm";

import { CommonHeader } from "../Common/CommonHeader/CommonHeader";

export const EditRoom = () => {
    const { token, userId } = useAuthContext();
    const data = dataFactory(token, userId);
    const { roomId } = useParams();
    const { onEditRoomSubmit, roomErrors, setRoomErrors } = useRoomContext();

    useEffect(() => {
        return () => {
            setRoomErrors([]);
        }
    }, []);

    const { values, onSubmit, onChangeHandler, changeValues } = useForm({
        [ROOM_FORM_FIELDS.NAME]: '',
        [ROOM_FORM_FIELDS.PRICE]: '',
        [ROOM_FORM_FIELDS.IMAGE_URL]: '',
        [ROOM_FORM_FIELDS.LOCATION]: '',
        [ROOM_FORM_FIELDS.ADULT]: '',
        [ROOM_FORM_FIELDS.CHILD]: '',
        [ROOM_FORM_FIELDS.BED]: '',
        [ROOM_FORM_FIELDS.BATH]: '',
        [ROOM_FORM_FIELDS.WIFI]: '',
        [ROOM_FORM_FIELDS.PARKING]: '',
        [ROOM_FORM_FIELDS.DESCRIPTION]: '',
    }, onEditRoomSubmit, roomId);

    useEffect(() => {
        data.getRoom(roomId)
            .then(result => {
                changeValues(result);
            });
    }, [roomId]);

    return (
        <>
            <CommonHeader />
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title text-center text-primary text-uppercase">
                            Room Details
                        </h6>
                        <h1 className="mb-5">
                            Edit{" "}
                            <span className="text-primary text-uppercase">Details</span>
                        </h1>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-6">
                            <div className="wow fadeInUp" data-wow-delay="0.2s">
                                <form onSubmit={onSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="edit-name"
                                                    placeholder="Property Name"
                                                    name={ROOM_FORM_FIELDS.NAME}
                                                    value={values.name}
                                                    onChange={onChangeHandler}
                                                    data-testid="name"
                                                />
                                                <label htmlFor="name">Property Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="edit-price"
                                                    placeholder="Price per night"
                                                    name={ROOM_FORM_FIELDS.PRICE}
                                                    value={values.price}
                                                    onChange={onChangeHandler}
                                                    data-testid="price"
                                                />
                                                <label htmlFor="email">Price per night </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="edit-imageUrl"
                                                    placeholder="Property image"
                                                    name={ROOM_FORM_FIELDS.IMAGE_URL}
                                                    value={values.imageUrl}
                                                    onChange={onChangeHandler}
                                                    data-testid="imageUrl"
                                                />
                                                <label htmlFor="name">Property image</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="edit-location"
                                                    placeholder="Property image"
                                                    name={ROOM_FORM_FIELDS.LOCATION}
                                                    value={values.location}
                                                    onChange={onChangeHandler}
                                                    data-testid="location"
                                                />
                                                <label htmlFor="name">Property location</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select name={ROOM_FORM_FIELDS.ADULT} value={values.adult} onChange={onChangeHandler} className="form-select" id="edit-select1" data-testid="adult">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
                                                <label htmlFor="select1">Adults</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select name={ROOM_FORM_FIELDS.CHILD} value={values.child} onChange={onChangeHandler} className="form-select" id="edit-select2" data-testid="child">
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
                                                <label htmlFor="select2">Children</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select name={ROOM_FORM_FIELDS.BED} value={values.bed} onChange={onChangeHandler} className="form-select" id="edit-select3" data-testid="bed">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
                                                <label htmlFor="select3">Beds</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select name={ROOM_FORM_FIELDS.BATH} value={values.bath} onChange={onChangeHandler} className="form-select" id="edit-select4" data-testid="bath">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
                                                <label htmlFor="select4">Baths</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating" >
                                                <select name={ROOM_FORM_FIELDS.WIFI} value={values.wifi} onChange={onChangeHandler} className="form-select" id="edit-select5" data-testid="wifi">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                                <label htmlFor="select5">WiFi</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating" >
                                                <select name={ROOM_FORM_FIELDS.PARKING} value={values.parking} onChange={onChangeHandler} className="form-select" id="edit-select6" data-testid="parking">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                                <label htmlFor="select6">Parking</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Special Request"
                                                    id="edit-description"
                                                    style={{ height: 100 }}
                                                    name={ROOM_FORM_FIELDS.DESCRIPTION}
                                                    value={values.description}
                                                    onChange={onChangeHandler}
                                                    data-testid="textarea"
                                                />
                                                <label htmlFor="description">Description</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {roomErrors.length == 0 ?
                            <div className="col-lg-6">
                                <div className="row g-3">
                                    <div className="col-6 text-end">
                                        <img
                                            className="img-fluid rounded w-75 wow zoomIn"
                                            data-wow-delay="0.1s"
                                            src="/img/about-1.jpg"
                                            style={{ marginTop: "25%" }}
                                        />
                                    </div>
                                    <div className="col-6 text-start">
                                        <img
                                            className="img-fluid rounded w-100 wow zoomIn"
                                            data-wow-delay="0.3s"
                                            src="/img/about-2.jpg"
                                        />
                                    </div>
                                    <div className="col-6 text-end">
                                        <img
                                            className="img-fluid rounded w-50 wow zoomIn"
                                            data-wow-delay="0.5s"
                                            src="/img/about-3.jpg"
                                        />
                                    </div>
                                    <div className="col-6 text-start">
                                        <img
                                            className="img-fluid rounded w-75 wow zoomIn"
                                            data-wow-delay="0.7s"
                                            src="/img/about-4.jpg"
                                        />
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="col-lg-6 error-box">
                                <h4>Errors</h4>
                                {roomErrors.map(error => <p key={error}>{error}</p>)}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>

    );
}