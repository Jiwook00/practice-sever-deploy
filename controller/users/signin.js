const { users } = require('../../models');
const crypto = require('crypto');

module.exports = {
  post: async (req, res) => {
    // TODO : 유저가 로그인을 했을 때, 회원정보를 데이터베이스에서 확인하고, 회원의 id를 session에 담아주도록 구현하세요.
    let { email, password } = req.body;

    const secret = '@codestates';
    const hash = crypto.createHmac('sha256', secret)
      .update(password)
      .digest('hex');

    await users.findOne({
      where: {
        email: email,
        password: hash
      }
    })
      .then(data => {
        if (data) {
          req.session.userid = { id: data.dataValues.email };
          // console.log(req.session)
          res.status(200).json(req.session.userid);
        } else {
          res.status(404).send('unvalid user');
        }
      })
    res.end();
  }
};


// 유저스에서 로그인한 회원 정보가 있는 곳을 찾고 find로 찾아준다.
// session.session_id = ???