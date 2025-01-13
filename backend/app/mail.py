from fastapi import HTTPException
from pydantic import BaseModel
from typing import List
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
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
    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = os.getenv('BREVO_API_KEY')
    
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
    
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

    sender = {"name": "Your Store", "email": os.getenv('SMTP_FROM')}
    to = [{"email": request.email, "name": request.orderDetails.shippingAddress.name}]

    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=to,
        html_content=html_content,
        sender=sender,
        subject="Order Confirmation"
    )

    try:
        api_response = api_instance.send_transac_email(send_smtp_email)
        return True
    except ApiException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to send order confirmation email: {str(e)}"
        )
