import "./Search.css";

import { useSearchParams } from "react-router-dom";

import { useRoomContext } from "../../../contexts/RoomContext";
import { SEARCH_FIELDS } from "../../../utils/constants";
import useForm from "../../../hooks/useForm";

export const Search = () => {
    const [searchParams] = useSearchParams();
    const { onRoomSearchClick } = useRoomContext();

    const location = searchParams.get('location') ? searchParams.get('location') : '';
    const price = searchParams.get('price') ? searchParams.get('price') : '';
    const adult = searchParams.get('adult') ? searchParams.get('adult') : '1';
    const child = searchParams.get('child') ? searchParams.get('child') : '0';

    const { values, onChangeHandler, onSubmit } = useForm({
        [SEARCH_FIELDS.LOCATION]: location,
        [SEARCH_FIELDS.PRICE]: price,
        [SEARCH_FIELDS.ADULT]: adult,
        [SEARCH_FIELDS.CHILD]: child,
    }, onRoomSearchClick);
    return (
        <div
            className="container-fluid booking pb-5 wow fadeIn"
            data-wow-delay="0.1s"
        >
            <div className="container">
                <div className="bg-white shadow" style={{ padding: 35 }}>
                    <div className="row g-2">
                        <div className="col-md-10">
                            <div className="row g-2">
                                <div className="col-md-3">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="search-location"
                                            placeholder="Property location"
                                            name={SEARCH_FIELDS.LOCATION}
                                            value={values.location}
                                            onChange={onChangeHandler}
                                        />
                                        <label htmlFor="search-name">Location</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="search-price"
                                            placeholder="Price per night"
                                            name={SEARCH_FIELDS.PRICE}
                                            value={values.price}
                                            onChange={onChangeHandler}
                                        />
                                        <label htmlFor="search-price">Price per night</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-floating">
                                        <select name={SEARCH_FIELDS.ADULT}
                                            value={values.adult}
                                            onChange={onChangeHandler}
                                            className="form-select"
                                            id="select7"
                                        >
                                            <option disabled>Select</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                        <label htmlFor="select7">Adults</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-floating">
                                        <select name={SEARCH_FIELDS.CHILD}
                                            value={values.child}
                                            onChange={onChangeHandler}
                                            className="form-select"
                                            id="select8"
                                        >
                                            <option disabled>Select</option>
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                        <label htmlFor="select8">Children</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button onClick={onSubmit} className="btn btn-primary w-100 h-100">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}