var express=require('express');
productModel=require.main.require('./models/products_model')
var router=express.Router();

router.get('/', function (req, res) {

    productModel.productlist(function (products) {
        if (products) {
            productModel.productOptions(function (options) {
                if (options) {
                    // Group options by product ID
                    const groupedOptions = options.reduce((acc, option) => {
                        if (!acc[option.product_id]) {
                            acc[option.product_id] = [];
                        }
                        acc[option.product_id].push(option);
                        return acc;
                    }, {});

                    res.render('menu', { products: products, productOptions: groupedOptions });
                } else {
                    console.log("No product options found.");
                    res.render('menu', { products: products, productOptions: {} });
                }
            });
        } else {
            console.log("No product data found.");
            res.render('menu', { products: [] });
        }
    });
});

// router.get('/',function(req,res){

//     productModel.productlist(function(products)
//     {
//         if(products)
//         {
//             productModel.productOptions(function(options)
//             {
//                 if(options)

//                     {
//                         const groupedOptions = options.reduce((acc, option) => {
//                             if (!acc[option.product_id]) {
//                                 acc[option.product_id] = [];
//                             }
//                             acc[option.product_id].push(option);
//                             return acc;
//                         }, {});
//                         // console.log(options);
//                         // console.log(groupedOptions);
//                         res.render('menu', { products: products, productOptions: groupedOptions });


//                     }
//             });
//             // res.render('menu',{products:products});

//         }else{
//             console.log("No product data found.");
//             res.render('menu', { result: [] });
//         }
//     });
// 	// res.render('menu');
// });


module.exports = router;