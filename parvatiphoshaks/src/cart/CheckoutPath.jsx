import React from 'react'
import "../CartStyles/CheckoutPath.css"
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PaymentIcon from '@mui/icons-material/Payment'

const CheckoutPath = ({ activeStep }) => {
    const steps = [
        {
            label: "Shipping",
            icon: <LocalShippingIcon />
        },
        {
            label: "Confirm Order",
            icon: <CheckCircleIcon />
        },
        {
            label: "Payment",
            icon: <PaymentIcon />
        }
    ]

    return (
        <div className="checkoutPath">
            {steps.map((step, idx) => {
                const active = idx === activeStep
                const completed = idx < activeStep
                return (
                    <div
                        className="checkoutPath-step"
                        key={idx}
                        active={active ? "true" : undefined}
                        completed={completed ? "true" : undefined}
                    >
                        <div className="checkoutPath-icon">{step.icon}</div>
                        <span className="checkoutPath-label">{step.label}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default CheckoutPath
