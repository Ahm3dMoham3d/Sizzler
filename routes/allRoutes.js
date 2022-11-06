// Express Router
const express = require("express");
const router = express.Router();

// Protected Routes
const authController = require("../controllers/auth/authController");

// Controllers
const deliveryFeeController = require("../controllers/deliveryFeeController");
const deliveryController = require("../controllers/deliveryController");
const discountController = require("../controllers/discountController");
const taxController = require("../controllers/taxController");
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");
const inventoryController = require("../controllers/inventoryController");
const orderController = require("../controllers/orderController");
const orderItemController = require("../controllers/orderItemsController");
const tableController = require("../controllers/tableController");
const shiftController = require("../controllers/shiftController");
const addOneController = require("../controllers/addOneController");

const customerController = require("../controllers/customerController");
const MoneyInController = require("../controllers/moneyInController");
const MoneyOutController = require("../controllers/moneyOutController");

const aggController = require("../controllers/aggController");

//delivery
router
  .route("/delivery")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    deliveryController.getAllDelivery
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    deliveryController.addDelivery
  );
router
  .route("/delivery/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    deliveryController.getOneDelivery
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    deliveryController.updateDelivery
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    deliveryController.deleteDelivery
  );

//delivery fee
router
  .route("/delivery-fee")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    deliveryFeeController.getAllDeliveryFee
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    deliveryFeeController.addDeliveryFee
  );
router
  .route("/delivery-fee/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    deliveryFeeController.getOneDeliveryFee
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    deliveryFeeController.updateDeliveryFee
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    deliveryFeeController.deleteDeliveryFee
  );

//customer
router
  .route("/customer")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    customerController.getAllCustomer
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    customerController.addCustomer
  );
router
  .route("/customer/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    customerController.getOneCustomer
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    customerController.updateCustomer
  )

  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    customerController.deleteCustomer
  );
router
  .route("/customer-amount/:id")
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    customerController.updateCustomerAmount
  );
//discount
router
  .route("/discount")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    discountController.getAllDiscount
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    discountController.addDiscount
  );
router
  .route("/discount/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    discountController.getOneDiscount
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    discountController.updateDiscount
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    discountController.deleteDiscount
  );

//tax
router
  .route("/tax")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    taxController.getAllTax
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    taxController.addTax
  );
router
  .route("/tax/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    taxController.getOneTax
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    taxController.updateTax
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    taxController.deleteTax
  );

//category
// router.route("/category/img/:id").get(categoryController.getCategoryImg);
router
  .route("/category")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    categoryController.getAllCategory
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    categoryController.addCategory
  );
router
  .route("/category/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    categoryController.getOneCategory
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    categoryController.uploadImg,
    categoryController.resizeImg,
    categoryController.updateCategory
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    categoryController.deleteCategory
  );

//product
router
  .route("/product/search")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    productController.searchProducts
  );

router
  .route("/product")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    productController.getAllProducts
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin"),

    productController.addProduct
  );
router
  .route("/product/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    productController.getOneProduct
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    productController.uploadImg,
    productController.resizeImg,
    productController.updateProduct
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    productController.deleteProduct
  );

//inventory
router
  .route("/inventory")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    inventoryController.getAllInventory
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    inventoryController.addInventory
  );
router
  .route("/inventory/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    inventoryController.getOneInventory
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    inventoryController.updateInventory
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    inventoryController.deleteInventory
  );

router
  .route("/inventory-amout/:id")
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    inventoryController.updateInvetoryNumber
  );

//order
router
  .route("/order")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    orderController.getAllOrder
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    orderController.addOrder
  );
router.route("/orderReset").get(
authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    orderController.restCounter
)
router
  .route("/order/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    orderController.getOneOrder
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    orderController.updateOrder
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    orderController.deleteOrder
  );

//order item
router
  .route("/order-item")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    orderItemController.getAllOrderItem
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    orderItemController.addOrderItem
  );
router
  .route("/order-item/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    orderItemController.getOneOrderItem
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    orderItemController.updateOrderItem
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    orderItemController.deleteOrderItem
  );

//tables
router
  .route("/table")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    tableController.getAllTables
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    tableController.addTable
  );
router
  .route("/table/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    tableController.getOneTable
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    tableController.updateTable
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    tableController.deleteTable
  );

//shift
router
  .route("/shift")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    shiftController.getAllShift
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    shiftController.addShift
  );
router
  .route("/shift/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    shiftController.getOneShift
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    shiftController.updateShift
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    shiftController.deleteShift
  );

//addOne
router
  .route("/add-one")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    addOneController.getAllAddOne
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    addOneController.addAddOne
  );
router
  .route("/add-one/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    addOneController.getOneAddOne
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    addOneController.updateAddOne
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    addOneController.deleteAddOne
  );
// money in
router
  .route("/money-in")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    MoneyInController.getAllMoneyIn
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    MoneyInController.addMoneyIn
  );
router
  .route("/money-in/:id")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    MoneyInController.getOneMoneyIn
  )
  .patch(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    MoneyInController.updateMoneyIn
  )
  .delete(
    authController.protectedRoute,
    authController.restrictTo("admin"),
    MoneyInController.deleteMoneyIn
  );

router
  .route("/orderType")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    aggController.getByType
  );
router
  .route("/items-sells-daily")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    aggController.getProductsSalesDaily
  );

router
  .route("/items-sells")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    aggController.getProductsSales
  );

router
  .route("/sells-weekly")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    aggController.getSellsWeekly
  );

router
  .route("/sells-monthly")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    aggController.getSellsMonthly
  );

router
  .route("/sells-yearly")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    aggController.getSellsYearly
  );

router
  .route("/moneyOut")
  .get(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    MoneyOutController.getAllMoneyOut
  )
  .post(
    authController.protectedRoute,
    authController.restrictTo("admin", "cashier"),
    MoneyOutController.addMoneyOut
  );
module.exports = router;
