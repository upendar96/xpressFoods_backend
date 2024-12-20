const User = require('../models/User');
const Product = require('../models/Product');
const Firm =require('../models/Firm')
exports.addToCart = async (req, res) => {
    const { userId, productId,firmId} = req.body;



    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const firm = await Firm.findById(firmId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItem = user.cart.find(item => item.productId.toString() === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            user.cart.push({ productId, quantity: 1,firmName:firm.firmName });
        }


        await user.save();
        res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error)
    }
}
exports.getUserCart = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).populate('cart.productId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports. deleteCartById = async (req, res) => {
    
   
    
        const { userId, productId } = req.body;
    
        try {
            const user = await User.findById(userId);
            if (user) {
                const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
                if (cartItemIndex > -1) {
                    user.cart.splice(cartItemIndex, 1);
                    await user.save();
                    res.status(200).json({ message: 'Product removed from cart' });
                } else {
                    res.status(404).json({ message: 'Product not found in cart' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    
    };
 

