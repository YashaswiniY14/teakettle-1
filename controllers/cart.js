var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
    const cart = req.session.cart || [];
	res.render('cart',{cart});
});

router.post('/add',function(req,res){
    console.log('Received data:', req.body);
    const { productId, productName, selectedWeight, price, quantity } = req.body;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    // Check if the item is already in the cart
    const existingItem = req.session.cart.find(item => item.productId === productId && item.selectedWeight === selectedWeight);

    if (existingItem) {
        // Update quantity if the product is already in the cart
        existingItem.quantity = parseInt(existingItem.quantity) + parseInt(quantity);
    } else {
        // Add new item to the cart
        req.session.cart.push({
            productId,
            productName,
            selectedWeight,
            price: parseFloat(price),  // Convert to number
            quantity: parseInt(quantity)
        });
    }
    console.log('Product added to cart successfully!');
    console.log('Updated cart:', req.session.cart);
    // res.json({ message: 'Product added to cart successfully!' });
    // console.log(req.session.cart);
    res.json({ message: 'Product added to cart successfully!' });
});
router.post('/update', function(req, res) {
    console.log(req.body);
    let { productId, newQuantity, selectedWeight } = req.body;
    productId = parseInt(productId);

    if (!req.session.cart) {
        return res.json({ success: false, message: 'Cart not found' });
    }
    // if (newQuantity <= 0) {
    //     // Remove the item from the cart
    //     req.session.cart.splice(itemIndex, 1);
    // }
    // const existingItem_index = req.session.cart.findIndex(item => item.productId === productId && item.selectedWeight === selectedWeight);
    // if (existingItem_index === -1) {
    //         return res.json({ success: false, message: 'Product not found in cart' });
    //     }
    
    // if (existingItem) {
    //     // Update quantity if the product is already in the cart
    //     existingItem.quantity = parseInt(newQuantity);
    // }

    const itemIndex = req.session.cart.findIndex(item => 
        item.productId === productId && item.selectedWeight === selectedWeight
    );
    console.log(itemIndex);

    if (itemIndex === -1) {
        return res.json({ success: false, message: 'Product not found in cart' });
    }

    if (newQuantity <= 0) {
        // Remove the item from the cart
        req.session.cart.splice(itemIndex, 1);
    } else {
        // Update the quantity
        console.log("qunatity updating");
        console.log(newQuantity);
        req.session.cart[itemIndex].quantity = parseInt(newQuantity);
    }

    // Recalculate total
    const total = req.session.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log('Updated cart:', req.session.cart);
    res.json({ 
        success: true, 
        message: newQuantity <= 0 ? 'Item removed from cart' : 'Cart updated successfully', 
        cart: req.session.cart,
        total: total
    });
});



module.exports = router;