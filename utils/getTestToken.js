// ============= Token for Test =============

const getTestToken = async (request, app, data) => {
  const response = await request(app)
    .post("/api/v1/user/login")
    .set("Content-Type", "application/json")
    .send(data);

  let _token = await response.body.token;
  return _token;
};

// ====================================================

module.exports = getTestToken;

// ====================================================
