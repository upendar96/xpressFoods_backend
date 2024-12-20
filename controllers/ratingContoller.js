const Firm=require('../models/Firm');

const rating=async(req,res)=>{
    try { 
    const { rating } = req.body;
     const firmId = req.params.id;
     
        const firm = await Firm.findById(firmId); 
        if (!firm) {
             return res.status(404).json({ message: 'Restaurant not found' }); 
            }
             firm.rating = ((firm.rating * firm.numberOfRatings) + rating) / (firm.numberOfRatings + 1);
              firm.numberOfRatings += 1; 
              await firm.save(); 
              res.status(200).json(firm);
             } catch (error) 
             { 
                res.status(500).json({ message: 'Internal server error' });
             }
}
module.exports={rating}