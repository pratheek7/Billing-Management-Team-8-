import "./CheckoutScreen.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";

const CheckoutScreen = () => {

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {}, []);

	const getCartCount = () => {
		return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
	};

	const getCartSubTotal = () => {
		return cartItems
		  .reduce((price, item) => price + item.price * item.qty, 0)
		  .toFixed(2);
	};

	 const getCartGSTSubTotal = () => {
	 	return cartItems
	 	  .reduce((gst, item) => gst + (item.gst/ 100) * item.price * item.qty, 0)
	 	  .toFixed(2);
	};
	const getFinalTotal = () => {
     return (Number(getCartGSTSubTotal())+Number(getCartSubTotal())).toFixed(2);
	}

	const downloadInvoice = () => {
		var doc = new jsPDF('l', 'pt', 'letter');
		document.getElementById('download').style.visibility = "hidden";
		doc.html(document.getElementById('invoice'), {
			callback: function (pdf) {
				doc.save();
				
				document.getElementById('download').style.visibility = "visible";
			}
		});
	};

	return (
		<div id="invoice" className="checkoutscreen">
			<table cellPadding="0" cellSpacing="0">
				<tbody>
					<tr className="top">
						<td colSpan="8">
							<table>
								<tbody>
									<tr>
										<td>
											<h1>Invoice</h1><br/>
											Created: {new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear()}
										</td>
										<td>
											<button id="download" onClick={() => downloadInvoice()}>Download</button>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>

					<tr className="heading">
					
						<td>Item</td>
						<td>Quantity</td>
						<td>Price</td>
						<td>GST</td>

					</tr>

					{
						cartItems.map((item, i) => (
							<tr key={i} className={cartItems.length === i+1 ? "item last" : "item"}>
								
								<td>{item.name}</td>
								<td>{item.qty}</td>
								<td>Rs {(item.price * item.qty).toFixed(2)}</td>
								<td>Rs {((item.gst/ 100) * item.price).toFixed(2) * item.qty}</td>
							</tr>
						))
					}

					<tr className="total">
					
						<td></td>
						<td>Total: {getCartCount()}</td>
						<td>Rs {getCartSubTotal()}</td>
						<td>Rs {getCartGSTSubTotal()}</td>
					</tr>
					<tr className="total">
					
						<td></td>
						<td></td>
						<td></td>
	
						<td>Final Total: Rs {getFinalTotal()}</td>
						
						
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default CheckoutScreen;
