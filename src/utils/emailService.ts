interface OrderDetails {
    items: any[];
    total: string;
    shippingAddress: {
      name: string;
      address: string;
      city: string;
      country: string;
      postalCode: string;
    };
  }
  
  export const sendOrderConfirmationEmail = async (email: string, orderDetails: OrderDetails) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/send-order-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          orderDetails,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send order confirmation email');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
      throw error;
    }
  };
  