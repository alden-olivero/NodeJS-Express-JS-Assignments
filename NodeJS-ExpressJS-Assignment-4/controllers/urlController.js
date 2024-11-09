const UrlModel=require("../models/urlModel");
const {nanoid}=require("nanoid");
const urlShortenerLogger=require("../utils/logger");
const ApiError=require("../utils/ApiError");

exports.createShortUrl=async(req,res,next)=>{
    try{
        const {originalUrl}=req.body;
        const shortUrlCode=nanoid(8);
        const newUrl=await UrlModel.create({
            originalUrl,
            shortUrl:`${req.protocol}://${req.get("host")}/api/v1/urls/redirect/${shortUrlCode}`,
            shortUrlCode
        });
        urlShortenerLogger.info("Short URL created",{shortUrlCode});
        res.status(201).json({
            status:"success",
            data:{
                shortUrlCode:newUrl.shortUrlCode,
                shortUrl:newUrl.shortUrl,
                originalUrl:newUrl.originalUrl
            }
        });
    }catch(err){
        urlShortenerLogger.error("Failed to create short URL",{error:err.message});
        next(new ApiError(400,"Failed to create short URL"));
    }
};

exports.getUrlByShortCode=async(req,res,next)=>{
    try{
        const {shortUrlCode}=req.params;
        const url=await UrlModel.findOne({shortUrlCode});
        if(!url){
            urlShortenerLogger.error("Short URL not found",{shortUrlCode});
            return next(new ApiError(404,"Short URL not found"));
        }
        urlShortenerLogger.info(`Retrived details of the url`,{shortUrlCode});
        res.status(200).json({
            status:"success",
            data:{
                shortUrlCode:url.shortUrlCode,
                shortUrl:url.shortUrl,
                originalUrl:url.originalUrl
            }
        });
    }catch(err){
        urlShortenerLogger.error("Error retrieving URL by shortcode",{error:err.message});
        next(new ApiError(500,"Failed to retrieve URL"));
    }
};

exports.getAllUrls=async(req,res,next)=>{
    try{
        const urls=await UrlModel.find();
        urlShortenerLogger.info("Retrieved all URLs",{count:urls.length});
        res.status(200).json({
            status:"success",
            data:urls
        });
    }catch(err){
        urlShortenerLogger.error("Failed to retrieve all URLs",{error:err.message});
        next(new ApiError(500,"Failed to retrieve all URLs"));
    }
};

exports.updateUrl=async(req,res,next)=>{
    try{
        const {shortUrlCode}=req.params;
        const updatedUrl=await UrlModel.findOneAndUpdate(
            {shortUrlCode},
            req.body,
            {new:true,runValidators:true}
        );
        if(!updatedUrl){
            urlShortenerLogger.error("Short URL not found for update",{shortUrlCode});
            return next(new ApiError(404,"Short URL not found"));
        }
        urlShortenerLogger.info("Short URL updated",{shortUrlCode});
        res.status(200).json({
            status:"success",
            data:{
                shortUrlCode:updatedUrl.shortUrlCode,
                shortUrl:updatedUrl.shortUrl,
                originalUrl:updatedUrl.originalUrl
            }
        });
    }catch(err){
        urlShortenerLogger.error("Failed to update short URL",{error:err.message});
        next(new ApiError(400,"Failed to update URL"));
    }
};
exports.deleteUrl=async(req,res,next)=>{
    try{
        const {shortUrlCode}=req.params;
        const deletedUrl=await UrlModel.findOneAndDelete({shortUrlCode});
        if(!deletedUrl){
            urlShortenerLogger.error("Short URL not found for deletion",{shortUrlCode});
            return next(new ApiError(404,"Short URL not found"));
        }
        urlShortenerLogger.info("Short URL deleted",{shortUrlCode});
        res.status(204).json({
            status:"success",
            data:null
        });
    }catch(err){
        urlShortenerLogger.error("Failed to delete short URL",{error:err.message});
        next(new ApiError(500,"Failed to delete URL"));
    }
};

exports.redirect=async(req,res,next)=>{
    try{
        const {shortUrlCode}=req.params;
        const url=await UrlModel.findOne({shortUrlCode});
        if(url){
            urlShortenerLogger.info("Redirecting to original URL",{shortUrlCode});
            return res.redirect(url.originalUrl);
        }else{
            urlShortenerLogger.error("Short URL not found for redirect",{shortUrlCode});
            return next(new ApiError(404,"Short URL not found"));
        }
    }catch(err){
        urlShortenerLogger.error("Error during redirection",{error:err.message});
        next(new ApiError(500,"Failed to redirect URL"));
    }
};
