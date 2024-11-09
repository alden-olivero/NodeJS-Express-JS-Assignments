const UrlModel=require("../models/urlModel");
const {nanoid}=require("nanoid");

exports.createShortUrl=async(req, res)=>{
    try {
        const {originalUrl}=req.body;
        const shortUrlCode=nanoid(8);  
        
        const newUrl=await UrlModel.create({
            originalUrl,
            shortUrl:`${req.protocol}://${req.get("host")}/api/v1/urls/redirect/${shortUrlCode}`,
            shortUrlCode
        });
        
        res.status(201).json({
            status: "success",
            data: {
                shortUrlCode:newUrl.shortUrlCode,
                shortUrl: newUrl.shortUrl,
                originalUrl: newUrl.originalUrl

            }
        });
    } catch (err) {
        res.status(400).json({
            status:"fail",
            message:err.message
        });
    }
};

exports.getUrlByShortCode=async(req,res)=>{
    try{
        const {shortUrlCode}=req.params;
        const url=await UrlModel.findOne({ shortUrlCode });

        if(!url){
            return res.status(404).json({
                status:"fail",
                message:"Short URL not found"
            });
        }

        res.status(200).json({
            status:"success",
            data: {
                shortUrlCode:url.shortUrlCode,
                shortUrl: url.shortUrl,
                originalUrl: url.originalUrl
                
            }
        });
    }catch(err) {
        res.status(500).json({
            status:"error",
            message:err.message
        });
    }
};

exports.getAllUrls=async(req,res)=>{
    try{
        const urls=await UrlModel.find();
        res.status(200).json({
            status: "success",
            data:urls
        });
    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        });
    }
};
exports.updateUrl=async(req,res)=>{
    try{
        const {shortUrlCode}=req.params;
        const updatedUrl=await UrlModel.findOneAndUpdate(
            {shortUrlCode},
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if(!updatedUrl) {
            return res.status(404).json({
                status:"fail",
                message:"Short URL not found"
            });
        }

        res.status(200).json({
            status:"success",
            data: {
                shortUrlCode:updatedUrl.shortUrlCode,
                shortUrl: updatedUrl.shortUrl,
                originalUrl: updatedUrl.originalUrl
                
            }
        });
    } catch(err) {
        res.status(400).json({
            status:"fail",
            message:err.message
        });
    }
};
exports.deleteUrl=async(req,res)=>{
    try {
        const {shortUrlCode} = req.params;
        const deletedUrl=await UrlModel.findOneAndDelete({shortUrlCode});

        if (!deletedUrl) {
            return res.status(404).json({
                status: "fail",
                message: "Short URL not found"
            });
        }

        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

exports.redirect = async(req,res) => {
    try {
        const { shortUrlCode } = req.params;
        const url = await UrlModel.findOne({shortUrlCode});

        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            res.status(404).json({
                status:"fail",
                message:"Short URL not found"
            });
        }
    } catch(err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
