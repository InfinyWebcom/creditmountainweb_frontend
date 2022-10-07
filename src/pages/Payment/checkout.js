import React, { useEffect } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import AppConfig from 'constants/config';
import axios from 'axios';
import PropTypes from 'prop-types'
import { Button } from 'reactstrap';


const Checkout = (props) => {
    const { toggleAdd, parentData } = props;
    const stripe = useStripe();
    const elements = useElements();
    useEffect(()=>{
        // if(parentData.amount != undefined) pay()
    },[parentData])
    const pay = async() => {
        try {
            axios.post(`${AppConfig.baseUrl}stripe/pay`, parentData, {
                headers: {
                  'Content-Type': 'application/json',
                  'token': localStorage.getItem('token')
                }
            }).then(async result => {
                console.log('sdfsdfsegt',result,parentData);
                // console.log('CardElement------>',elements);
                const data = result.data.clientSecret;
                if(result.data.data.status == 'requires_action' && result.data.data.next_action.type == 'use_stripe_sdk'){
                    window.location.assign(result.data.data.next_action.use_stripe_sdk.stripe_js)
                }
                // const cardElement = elements.getElement(CardElement);
                // console.log('sdfsdfsegt-',cardElement);
                // let sendData = { payment_method: { card: cardElement } }
                // const confirmPayment = await stripe.confirmCardPayment(
                //     data.clientSecret,
                //     {
                //         payment_method: parentData.payment_method
                //       }
                // );
                // const elements = stripe.elements({clientSecret: data});
                // const PaymentElement = elements.create('payment')
                // console.log('sdfsdfsegt-',stripe,stripe.paymentIntents);
                // const paymentIntent = await stripe.paymentIntents.confirm(
                //     parentData.payment_method
                //     // 'pi_1Dq2OK2eZvKYlo2Cus7PfPyD',
                //     // {payment_method: 'pm_card_visa'}
                //   );
                // console.log('sdfsdfsegt--',paymentIntent);
                // const { paymentIntent } = confirmPayment;
                // if (paymentIntent.status === "succeeded") alert(`Payment successful!`);
                // else alert(`Payment failed!`); 
                // toggleAdd();
            })
          } catch (err) {
            console.log('kjansd',err);
            alert("There was an error in payment");
          }
    }
    return (
        <div>
            {/* <PaymentElement id='#payment'/> */}
            <div style={{ float: 'right' }} className='mt-4'>
                <Button onClick={pay} >ADD</Button>
            </div>
        </div>
    )
}

Checkout.propTypes = {
    toggleAdd: PropTypes.any,
    Id: PropTypes.string,
    parentData: PropTypes.any
}

export default Checkout; 