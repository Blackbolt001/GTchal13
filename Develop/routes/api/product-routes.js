const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  Product.findAll({
    include: [
      {
        model: Category,
        attributes: ["category_name"]
      },
      {
        model:Tag,
        attributes:['tag_name']
      }
    ]
  })
    .then((dbProductData) =>  {
      if(!dbProductData) {
        res.status(404).json({message: "Product does not exist"});
        return;
      }
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
 Product.findOne({
    where: {
      id: req.params.id,
    },
        attributes: ["id", "product_name", "price", "stock",],
        include :[
          {
            model:Category,
            attributes:['category_name']
          },
          {
            model:Tag,
            attributes: ['tag_name']
          }
        ]
    })
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(404).json({ message:"no product exists"});
        return;
      }
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock:req.body.stock,
    tagIds:req.body
  })
    .then((dbProductData) => res.json(dbProductData))
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put("/:id", (req,res ) => {
  Product.update (req.body,
    {where: {
      id:req.params.id
    }
  }
  )
  .then((dbProductData) => {
    if(!dbProductData) {
      res.status(404).json({message:"No Product exists!"});
      return;
    } res.json(dbProductData);
  })
  .catch((err) => {
    console.log(err); 
    res.status(500).json(err);
  });
});

router.delete("/:id", (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(404).json({ message: "No Category exists!" });
        return;
      }
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;