const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
  const userId = req.user.id;
  const purchase = await Purchase.findAll({
    where: {userId: userId},
    include: [{
      model: Product,
      include: [Image],
    }]
  })
  return res.json(purchase)
});

const create = catchError(async(req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findAll({
    where: {userId: userId},
    attributes: ['userId', 'productId', 'quantity'],
    raw: true,  
  });
  const purchase = await Purchase.bulkCreate(cart);  

  await Cart.destroy({where: {userId: userId}})
  return res.json(purchase);
});

module.exports = {
    getAll,
    create,
}