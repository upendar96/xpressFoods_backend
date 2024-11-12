const User=require('../models/User');
const Product=require('../models/Product');
exports.addTowishlist = async (req, res) => {
    const { userId, productId}= req.body;
    
    

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const wishList = user.wishlist.find(item => item.productId.toString() === productId);
        if (wishList) {
            console.log("alredy added");
        } else {
            user.wishlist.push({ productId}); 
        }
         

        await user.save();
        res.status(200).json({ message: 'Product added to cart', wishlist: user.wishlist});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error)
    }
}
exports. getUserwishlist = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).populate('wishlist.productId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ wishlist: user.wishlist});
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

