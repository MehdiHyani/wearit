import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneOrderQuery } from '../app/order/orderApiSlice';

const ViewOneOrder = () => {

    const { orderId } = useParams();
    const { order } = useGetOneOrderQuery(orderId);

  return (
    /* if order is pending
        cancel button -> canceled
            if user is manager
                confirm button -> confirmed
    */
    <div>{}</div>
  )
}

export default ViewOneOrder