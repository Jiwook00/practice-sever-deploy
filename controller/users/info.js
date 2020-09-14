const { users } = require('../../models');

module.exports = {
  get: async (req, res) => {
    // TODO : 유저의 session을 이용하여, 데이터베이스에 있는 정보를 제공하도록 구현하세요.
    let { userid } = req.session
    if (userid) {
      console.log(userid.id);
      await users.findOne({
        where: {
          email: userid.id
        }
      })
        .then(data => {
          if (data) {
            console.log(data.dataValues);
            res.status(200).json(data.dataValues);
          }
        })
    } else {
      res.status(401).send('need user session');
    }

    res.end();
  }
};

//  세션 아이디가 있으면   
// 유저스에서 찾아오고 findAll? findOne? => 보낸다
// express-session을 가저오나? .. app에 가저오고 있으면