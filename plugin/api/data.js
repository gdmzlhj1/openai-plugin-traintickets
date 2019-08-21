var data = "init data";

function getData() {
  return data;
}

function setData(value) {
  data = value;
}

const domain = "https://openai.weixin.qq.com";
// const domain = "http://localhost:13563";

function auth({ appid }) {
  wx.request({
    url: domain + "/auth/miniprogram/plugin/openai",
    method: "post",
    data: {
      appid
    },
    success: res => {
      console.log(res.data);
      wx.setStorageSync("authtoken", res.data.authtoken);

      send({ query: "你好" });
    },
    fail: error => {
      console.log(error);
    }
  });
}

function request(opt) {
  const authtoken = wx.getStorageSync("authtoken") || "";
  wx.request({
    url: domain + opt.url,
    method: opt.method,
    header: {
      authtoken
    },
    data: opt.data,
    success: opt.success,
    fail: opt.fail
  });
}

function send({ query }) {
  request({
    url: "/miniprogram/openai/chatbot",
    method: "post",
    data: {
      query
    },
    success: function(res) {
      console.log("chat result : ", res);
    }
  });
}

module.exports = {
  getData: getData,
  setData: setData,
  auth: auth
};
