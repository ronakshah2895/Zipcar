import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCarSide } from 'react-icons/fa';
import adminAction from '../../store/action/adminActions';
import userAction from '../../store/action/userAction';
import Header from '../../common/Header/Header';
import './UserHome.css';


function UserHome() {
  const dispatch = useDispatch();
  const adminVehicletype = useSelector(
    (state) => state.adminReducer.vehicletype,
  );
  const adminLocations = useSelector((state) => state.adminReducer.location);
  const searchRes = useSelector((state) => state.userReducer.searchRes);
  // console.log(searchRes);
  useEffect(() => {
    dispatch(adminAction.getlocations());
    dispatch(adminAction.getvehicletype());
  }, [dispatch]);
  return (
    <div>
      <Header />
      {/* <div className="container heading-container">
        <div className="col text-center">
          <h3>Search Available Vehicles to rent</h3>
        </div>
      </div> */}
      <div className="USERHOME container">
        <form
          className="form-search"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(userAction.search(e));
          }}
        >
          <div className="form-group row">
            <div className="col-sm-6">
              <input
                type="text"
                id="vehicle"
                className="form-control"
                placeholder="Type Vehicle you want to rent"
                name="name"
                required
              />
            </div>
            <div className="col-sm-2">
              <select
                className="form-control"
                id="vehicletype"
                placeholder="Vehicle Type"
                name="vehicletype"
                defaultValue="DEFAULT"
              >
                <option value="DEFAULT" disabled>Vehicle Type</option>
                {adminVehicletype.map((vehicletype) => (
                  <option
                    key={vehicletype.id}
                    value={vehicletype.vehicletype}
                  >
                    {vehicletype.vehicletype}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-2">
              <select
                className="form-control"
                id="rentallocation"
                placeholder="Rental Location"
                name="rentallocation"
                defaultValue="DEFAULT"
              >
                <option value="DEFAULT" disabled>Location</option>
                {adminLocations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                    ,
                    {' '}
                    {location.address}

                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-1">
              <button type="submit" className="btn btn-success">
                Search
              </button>
            </div>
            <div className="col-sm-1">
              <input type="reset" value="Reset" className="btn btn-success" />
            </div>
          </div>
        </form>
        <div className="row">
          {searchRes.map((vehicle) => (
            <div key={vehicle.id} className="col-sm-4">
              <div className="card-loca card shadow-sm">
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <h4>{vehicle.name}</h4>
                    </li>
                    <li className="list-group-item">
                      Vehicle Type:
                      &nbsp;
                      <b>{vehicle.vehicletype}</b>
                    </li>
                    <li className="list-group-item">
                      Make Year:
                      &nbsp;
                      <b>{vehicle.makeyear}</b>
                    </li>
                    <li className="list-group-item">
                      Model Number:
                      &nbsp;
                      <b>{vehicle.modelnumber}</b>
                    </li>
                    <li className="list-group-item">
                      Registration Tag:
                      &nbsp;
                      <b>{vehicle.registrationtag}</b>
                    </li>
                    <li className="list-group-item">
                      Mileage:
                      &nbsp;
                      <b>{vehicle.mileage}</b>
                    </li>
                    <li className="list-group-item">
                      Last Serviced Date:
                      &nbsp;
                      <b>{vehicle.lastserviced}</b>
                    </li>
                    <li className="list-group-item">
                      Vehicle Condition:
                      &nbsp;
                      <b>{vehicle.vehiclecondition}</b>
                    </li>
                    <li className="list-group-item">
                      Rental Location:
                      &nbsp;
                      <b>{vehicle.rentallocation}</b>
                    </li>
                  </ul>
                  <br />
                  <div className="col text-center">
                    <button
                      type="submit"
                      className="btn col-sm-6 btn-success"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      Book &nbsp;
                      <FaCarSide />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Select time and duration</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form
                  className="form-signin"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="form-group row">
                    <div className="col">
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="select-date"
                        placeholder="Select Date and Time to rent"
                        name="select-date"
                        min={`${new Date().toISOString().slice(0, 10)}T${new Date().toTimeString().split(' ')[0].slice(0, -3)}`}
                        max={`${new Date(new Date().getTime() + (91 * 86400000)).toISOString().slice(0, 10)}T${new Date(new Date().getTime() + (91 * 86400000)).toTimeString().split(' ')[0].slice(0, -3)}`}
                        defaultValue=""
                        required
                      />

                      <input
                        type="number"
                        className="form-control"
                        id="select-duration"
                        placeholder="Enter duration to rent(hours)"
                        name="select-duration"
                        min="1"
                        max="72"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col text-center">
                      <button type="submit" className="btn btn-success">
                        Book &nbsp;
                        <FaCarSide />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserHome;