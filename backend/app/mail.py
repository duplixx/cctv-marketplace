from fastapi import HTTPException
from pydantic import BaseModel
from typing import List
import resend
import os

class OrderItem(BaseModel):
    name: str
    quantity: int
    price: str

class ShippingAddress(BaseModel):
    name: str
    address: str
    city: str
    postalCode: str
    country: str

class OrderDetails(BaseModel):
    items: List[OrderItem]
    total: str
    shippingAddress: ShippingAddress

class EmailRequest(BaseModel):
    email: str
    orderDetails: OrderDetails

def send_order_confirmation(request: EmailRequest):
    resend.api_key = os.getenv('RESEND_API_KEY')

    # r = resend.Emails.send({
    # "from": "onboarding@resend.dev",
    # "to": "rootsshikhar001@gmail.com",
    # "subject": "Testibng Hello World",
    # "html": "<p>Congrats on sending your <strong>first email</strong>!</p>"
    # })
    
    items_html = "".join([
        f"<li>{item.name} - Quantity: {item.quantity} - Price: {item.price}</li>"
        for item in request.orderDetails.items
    ])

    html_content = f"""
    <h1>Thank you for your order!</h1>
    <h2>Order Details:</h2>
    <ul>
        {items_html}
    </ul>
    <p>Total: ${request.orderDetails.total}</p>
    <h2>Shipping Address:</h2>
    <p>{request.orderDetails.shippingAddress.name}</p>
    <p>{request.orderDetails.shippingAddress.address}</p>
    <p>{request.orderDetails.shippingAddress.city}, {request.orderDetails.shippingAddress.postalCode}</p>
    <p>{request.orderDetails.shippingAddress.country}</p>
    """

    try:
        response = resend.Emails.send({
            "from": "orders@duplixx.xyz",
            "to": request.email,
            "subject": "Order Confirmation",
            "html": html_content
        })
        return True
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to send order confirmation email: {str(e)}"
        )
