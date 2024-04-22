import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: "dg6iqaqvm",
    api_key: "658993249516785",
    api_secret: "RWxv8mzLLvXfv0oKvlodDwy8tcY",
});
export const getUrlFromCloudinary = async (imageFile) => {
    const { createReadStream } = await imageFile;
    const stream = createReadStream();
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(stream, { folder: "post-images", public_id: `post-images/${Date.now()}` }, function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                resolve(result?.secure_url);
            }
        });
    });
};
