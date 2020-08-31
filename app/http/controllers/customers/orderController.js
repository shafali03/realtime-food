const Order = require('../../../models/order')

function orderController() {

  return {
    store(req, res) {
      // Validate request
      const { phone, addressNumber, address, postcode } = req.body
      if (!phone || !addressNumber || !address || !postcode) {
        req.flash('error', 'All fields are required')
        return res.redirect('/cart')
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        addressNumber,
        address,
        postcode
      })
      order.save().then(result => {
        req.flash('success', 'Order placed successfully')
        return res.redirect('/')
      }).catch(err => {
        req.flash('error', 'Something went wrong')
        return res.redirect('/cart')
      })
    }
  }
}


module.exports = orderController