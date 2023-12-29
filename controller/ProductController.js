const Joi = require("joi");
const Models = require("../models/indexModel");
const Report = {};
var mongo = require("mongodb");
var moment = require("moment");
const { Model } = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

Report.CreateProduct = async (req, res, next) => {
  try {
    const {
      Productname,Quantity,Price
    } =
      req.body;

    const schema = Joi.alternatives(
      Joi.object({      

        Quantity: [Joi.number().empty().required()],
        Productname: [Joi.string().empty().required()],
        Price: [Joi.number().empty().required()],
      })
    );

    const result = schema.validate(
      req.body
    );
    if (result.error) {
      const message = result.error.details.map((i) => i.message).join(",");
      return res.json({
        message: result.error.details[0].message,
        error: message,
        missingParams: result.error.details[0].message,
        status: 200,
        success: true,
      });

    }
    else{
      const addProduct = await Models.ProductModel.create(req.body)
      return res.json({
        messgae: "successfull",
        status: 200,
        success: true,     
      });
    }
  } catch (error) {
    console.log(error)
    return res.json({
      message: "Error occured=>" + error,
      status: 200,
      success: true,
    });
  }
};

Report.GetallProduct = async (req, res, next) => {
  try {
   
    
      const getProduct = await Models.ProductModel.find({})
      return res.json({
        messgae: "successfull",
        status: 200,
        success: true,  
        getProduct: getProduct, 

      });
    
  } catch (error) {
    console.log(error)
    return res.json({
      message: "Error occured=>" + error,
      status: 200,
      success: true,
    });
  }
};

Report.UpdateProduct = async (req, res, next) => {
  try {
    const { id, Productname, Quantity } = req.body;
    
    const schema = Joi.alternatives(
      Joi.object({      

        Quantity: [Joi.number().empty().required()],
        Productname: [Joi.string().empty().required()],
        id: [Joi.string().empty().required()],
      })
    );

    const result = schema.validate(
      req.body
    );
    if (result.error) {
      const message = result.error.details.map((i) => i.message).join(",");
      return res.json({
        message: result.error.details[0].message,
        error: message,
        missingParams: result.error.details[0].message,
        status: 200,
        success: true,
      });

    }
    else{

 
    const UpdateProduct = await Models.ProductModel.updateOne({_id:id}, 
      $Set);
    const getProduct = await Models.ProductModel.find({_id:id});
      return res.json({
        message: "successfully ]updated",
        status: 200,
        success: true,  
        getProduct: getProduct, 

      });}
    
  } catch (error) {
    console.log(error)
    return res.json({
      message: "Error occured=>" + error,
      status: 200,
      success: true,
    });
  }
};

Report.GetProductById = async (req, res, next) => {
  try {
    const { id} = req.body;
    
    const schema = Joi.alternatives(
      Joi.object({            
        id: [Joi.string().empty().required()],
      })
    );

    const result = schema.validate(
      req.body
    );
    if (result.error) {
      const message = result.error.details.map((i) => i.message).join(",");
      return res.json({
        message: result.error.details[0].message,
        error: message,
        missingParams: result.error.details[0].message,
        status: 200,
        success: true,
      });

    }
    else{
    const getProduct = await Models.ProductModel.find({_id:id});
      return res.json({
        message: "successfully ]updated",
        status: 200,
        success: true,  
        getProduct: getProduct, 

      });}
    
  } catch (error) {
    console.log(error)
    return res.json({
      message: "Error occured=>" + error,
      status: 200,
      success: true,
    });
  }
};

Report.DeleteProduct = async (req, res, next) => {
  try {
    const { id} = req.body;
    
    const schema = Joi.alternatives(
      Joi.object({            
        id: [Joi.string().empty().required()],
      })
    );

    const result = schema.validate(
      req.body
    );
    if (result.error) {
      const message = result.error.details.map((i) => i.message).join(",");
      return res.json({
        message: result.error.details[0].message,
        error: message,
        missingParams: result.error.details[0].message,
        status: 200,
        success: true,
      });

    }
    else{
    const DeleteProduct = await Models.ProductModel.deleteOne({_id:id});
      return res.json({
        message: "successfully deleted",
        status: 200,
        success: true,  
        DeleteProduct: DeleteProduct, 

      });}
    
  } catch (error) {
    console.log(error)
    return res.json({
      message: "Error occured=>" + error,
      status: 200,
      success: true,
    });
  }
};

module.exports = Report;
