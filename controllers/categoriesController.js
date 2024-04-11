const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const allCategories = (req, res) => {
  // 카테고리 전체 목록 리스트
  const allCategoiresQuery = "SELECT * FROM categories";

  conn.query(allCategoiresQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = {
  allCategories,
};
