const Category = require('../../models/category');
const Product = require('../../models/product');
const Packs = require('../../models/pack');

function createCategories(categories,parentId = null){

    const categoryList = [];
    let category;
    if(parentId == null){
        category=categories.filter(cat => cat.parentId==undefined);
    }
    else{
        category = categories.filter(cat =>cat.parentId==parentId);

    }
    for (let cate of category){
        categoryList.push({
            _id : cate._id,
            name : cate.name,
            slug : cate.slug,
            parentId : cate.parentId,
            children : createCategories(categories, cate._id)
        });
    }


    return categoryList;
};
exports.initialData = async(req,res)=>{
        const categories = await Category.find({}).exec();
        const products = await Product.find({})
                                      .select('_id id name price quantityp description priceAchat productPicture category')
                                     
                                      .exec();
        const packs = await Packs.find({})
                                      .select('_id id name price_achat price_vente price_product quantity description category createdAt')
                                     
                                      .exec();
        res.status(200).json({
            categories : createCategories(categories),
            products,
            packs
        })
}