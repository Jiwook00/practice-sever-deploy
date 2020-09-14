const { users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    // TODO : 유저가 회원가입을 했을 때, 회원정보를 데이터베이스에 저장하도록 구현하세요.
    let { email, username, password } = req.body
    await users.findOrCreate({
      where: { email },
      defaults: {
        username,
        password
      }
    })
      .then(([result, created]) => {
        if (!created) {
          return res.status(409).send('Already exists user');
        }
        res.status(200).json(result);
      })
    res.end();
  }
};


// 바디의 내용을 가저와서  유저 정보를 생성 findOrCreate 생성이 끝나면 
// 이미 있다면? 추가가 안된다면? => 이미 있는 아이디 입니다.
// 없다면 그 정보를 보내고

// email: DataTypes.STRING,
// username: DataTypes.STRING,
// password: DataTypes.STRING