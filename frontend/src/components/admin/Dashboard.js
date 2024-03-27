import { useEffect } from "react";
import Sidebar from "./Sidebar";
import {useDispatch, useSelector}from "react-redux"
import { adminOrders as ao } from '../../actions/orderActions';
import {getUsers}from "../../actions/userActions"

function Dashboard() {
     const dispatch = useDispatch();
     useEffect(() => {
       dispatch(ao);
       dispatch(getUsers);
     }, [dispatch]);
     const { adminOrders = []} = useSelector((state) => state.orderState);
     const { users = []}  = useSelector((state) => state.userState);
     const userc=users.length;
     const allSlotNos = [];
     adminOrders.forEach((order) => {
       const slotNos = order.slotNos;
       allSlotNos.push(...slotNos.map(Number));
     });
     const orderc=allSlotNos.length;
    return ( 
        <div className="row">
            <div className="col-12 col-md-2">
                 <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
            <h1 className="my-4">Dashboard</h1>
               <div className="row pr-4">
                    <div className="col-xl-12 col-sm-12 mb-3">
                         <div className="card text-white bg-primary o-hidden h-100">
                         <div className="card-body">
                              <div className="text-center card-font-size">Total Amount<br /> <b>${orderc*10}</b>
                              </div>
                         </div>
                         </div>
                    </div>
               </div>


                    <div className="col-xl-3 col-sm-6 mb-3">
                         <div className="card text-white bg-danger o-hidden h-100">
                         <div className="card-body">
                              <div className="text-center card-font-size">Orders<br /> <b>{orderc}</b></div>
                         </div>
                         <a className="card-footer text-white clearfix small z-1" to="/admin/orders">
                              <span className="float-left">View Details</span>
                              <span className="float-right">
                                   <i className="fa fa-angle-right"></i>
                              </span>
                         </a>
                         </div>
                    </div>


                    <div className="col-xl-3 col-sm-6 mb-3">
                         <div className="card text-white bg-info o-hidden h-100">
                         <div className="card-body">
                              <div className="text-center card-font-size">Users<br /> <b>{userc}</b></div>
                         </div>
                         <a className="card-footer text-white clearfix small z-1" href="/admin/users">
                              <span className="float-left">View Details</span>
                              <span className="float-right">
                                   <i className="fa fa-angle-right"></i>
                              </span>
                         </a>
                         </div>
                    </div>


                    
               </div>
            </div>
     
     );
}

export default Dashboard;