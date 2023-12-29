const Joi = require("joi");
const Models = require("../models/indexModel");
const ReportCategory = {};
var mongo = require("mongodb");
var moment = require("moment");
const { Model } = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

ReportCategory.CreateCategory = async (req, res, next) => {
  try {
    const {
        Categoryname,CategoryID
    } =
      req.body;

    const schema = Joi.alternatives(
      Joi.object({      

        CategoryID: [Joi.number().empty().required()],
        Categoryname: [Joi.string().empty().required()]
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
      const addCategory = await Models.CategoryModel.create(req.body)
      return res.json({
        message: "successfull",
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

module.exports = ReportCategory;
