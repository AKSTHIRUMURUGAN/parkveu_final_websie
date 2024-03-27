import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orderDetail as orderDetailAction } from "../../actions/orderActions";
import Loader from "../layouts/Loader";
import QRCode from 'qrcode.react';

function OrderDetail() {
    const { orderDetail, loading } = useSelector(state => state.orderState);
    const { user = {}, slotNos } = orderDetail;

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(orderDetailAction(id));
    }, [id]);

    const qrContent = orderDetail && {
        name: user.name,
        id: orderDetail._id,
        paymentId: orderDetail.id,
        slotNos: slotNos ? slotNos.join(', ') : '',
    };

    const formattedQRContent = qrContent && Object.entries(qrContent).map(([key, value]) => `${key}: ${value}`).join('\n');

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="row d-flex justify-content-center mt-5">
                        <div className="col-12 col-lg-8 order-details text-center">

                            <h1 className="mb-5">Order # {orderDetail._id}</h1>

                            <h4 className="mb-3">Slot Info</h4>
                            <p><b>Name:</b> {user.name}</p>
                            <p><b>Email:</b> {user.email}</p>
                            <p><b>Qunatity:</b> {orderDetail.quantity}</p>
                            <p><b>Amount:</b> ${orderDetail.totalPrice}</p>
                            <p><b>Slot Nos:</b> {slotNos && slotNos.join(', ')}</p>
                            <p><b>Payment Id:</b> ${orderDetail.id}</p>

                            <hr />

                            <h4 className="my-3">Payment</h4>
                            <p className={orderDetail.status ? "greenColor" : "redColor"} ><b>{orderDetail.status}</b></p>

                            <h2 className="my-4">Your Ticket is here</h2>
                            {formattedQRContent && <QRCode value={formattedQRContent} />}

                            <hr />
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default OrderDetail;
