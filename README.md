## Simple POS system
This is a very simple POS system webpage create using React.

In this webpage, user can select item to add to cart, it will calculate the total amount and allow user to choose payment method. Once the order is finalized, click on the “pay now” will generate a receipt with unique ID and time stamp.

I use React to create re-use components to display menu item, and React state logic to create prompt window for input qty, cart, payment amount, payment method etc.

Item menu design is from bootstrap card.

React created using vite.

Cart logic ,toastify and react-to-print inspired by Devtamin tutorial: [https://www.youtube.com/watch?v=8E7Xwy0lXlg](https://www.youtube.com/watch?v=8E7Xwy0lXlg)

**Instruction:**

1.  At terminal, key in `cd pos-system` to move into program directory
2.  At terminal, key in `npm i` to install all npm package
3.  At terminal, key in `npm run dev` to execute the program
4.  At internet browser, visit http://localhost:5173/ to access the program
5.  Use CTRL + C and type `y` to terminate the session

**Feature:**

 - Add to cart prompt a window to input quantity
   
  - Count will not go below zero, and zero quantity will not add to cart, and prompt to close window
   
   - When add item to cart, show notification
   
   - Cart to display order details, and update total amount every time
   when item was added
   
   - Allow remove item in cart
   
   - Must add item to cart and select either one payment method to proceed to “Pay Now”
   
   - “Pay Now” will generate printable receipt
   
   - Allow clear cart
   
   - Select cash payment will unhide input field to key in cash amount
   
   - Switch payment method from cash to cart, then back to cash, will clear input amount
   
   - If cash amount less than total bill amount, browser will alert “Please pay sufficient cash”
   
   - Generate receipt display order details and payment method
   
   - Generate receipt with unique invoice (through UUID)
   
   - Generate receipt with timestamp
   
   - Will calculate balance amount for cash payment ; and will hide this for card payment
   
 
 Any issue kindly feedback:

[wengkiadyap@gmail.com](mailto:wengkiadyap@gmail.com)