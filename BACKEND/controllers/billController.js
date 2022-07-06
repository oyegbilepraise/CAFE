require("dotenv").config();
const db = require("../models");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const auth = require("../services/authenticaton");

const Bill = db.bill;

const generateReport = async (req, res) => {
  const gennerateUuid = uuid.v1();

  try {
    const result = await Bill.create({
      ...req.body,
    });
    ejs.renderFile(
      path.join(__dirname, "", "report.ejs"),
      {
        productDetails: req.body.productDetails,
        name: req.body.name,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        paymentMethod: req.body.paymentMethod,
        totalAmount: req.body.totalAmount,
      },
      (err, results) => {
        if (err) {
          return res.status(500).json({ err });
        } else {
          pdf
            .create(results)
            .toFile(
              "./generated_pdf/" + gennerateUuid + ".pdf",
              function (err, pdf) {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ err });
                } else {
                  return res.status(200).json({ uuid: gennerateUuid });
                }
              }
            );
        }
      }
    );
    res.status(200).json({ message: "Successful", result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getPdf = async (req, res) => {
  const pdfPath = "./generated_pdf/" + req.body.uuid + ".pdf";
  if (fs.existsSync(pdfPath)) {
    res.contentType("application/pdf");
    fs.createReadStream(pdfPath).pipe(res);
  } else {
    ejs.renderFile(
      path.join(__dirname, "", "report.ejs"),
      {
        productDetails: req.body.productDetails,
        name: req.body.name,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        paymentMethod: req.body.paymentMethod,
        totalAmount: req.body.totalAmount,
      },
      (err, results) => {
        if (err) {
          return res.status(500).json({ err });
        } else {
          pdf
            .create(results)
            .toFile(
              "./generated_pdf/" + req.body.uuid + ".pdf",
              function (err, pdf) {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ err });
                } else {
                  res.contentType("application/pdf");
                  fs.createReadStream(pdfPath).pipe(res);
                }
              }
            );
        }
      }
    );
  }
};

module.exports = { generateReport, getPdf };
