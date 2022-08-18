const router = require('express').Router();
const { Category, Product } = require('../../models');
const { userInfo } = require('os');
const { update } = require('../../models/Category');
// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) =>  {
      if(!dbCategoryData) {
        res.status(404).json({message: "Category does not exist"});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ]
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message:"no cagetory exists"});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req,res ) => {
  Category.update (req.body,
    {where: {
      id:req.params.id
    }
  }
  )
  .then((dbCategoryData) => {
    if(!dbCategoryData) {
      res.status(404).json({message:"No Category exists!"});
      return;
    } res.json(dbCategoryData);
  })
  .catch((err) => {
    console.log(err); 
    res.status(500).json(err);
  });
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No Category exists!" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;