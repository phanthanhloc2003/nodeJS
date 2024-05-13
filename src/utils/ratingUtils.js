// utils/ratingUtils.js

const comment = require("../models/CommentModels")
async function calculateAverageRating(id) {
    try {
        const comments = await comment.findAll({
            where: { idProduct: id }
        });
        let totalStars = 0;
        let totalReviews = 0;

        comments.forEach(comment => {
            totalStars += comment.rating;
            totalReviews++;
        });
        const averageRating = totalStars / totalReviews;
        return averageRating;
    } catch (error) {
        console.error("Lỗi khi tính toán điểm trung bình:", error);
        throw error;
    }
}

module.exports = {
    calculateAverageRating
};
