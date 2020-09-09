<template>
  <div class="loginContainer">
    <div class="loginInner">
      <!-- 头部 -->
      <div class="login_header">
        <h2 class="login_logo">Jonas'Music</h2>
        <!-- 登录方式切换 -->
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <!-- 返回 -->
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-fanhui"></i>
      </a>

      <!-- 主体 -->
      <div class="login_content">
        <form @submit.prevent="toLogin">
          <!-- ----------------------------短信登录----------------------- -->
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <!-- 显示获取验证码或者倒计时效果 -->
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ok_phone: rightPhone}"
                @click.prevent="getCode"
              >{{computeTime? `已发送(${computeTime}s)`:'获取验证码'}}</button>
            </section>
            <!-- 验证码 -->
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
            </section>
            <section class="login_hint">
              温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>

          <!-- ----------------------------密码登录------------------------- -->
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" />
              </section>

              <!-- 显示隐藏密码 -->
              <section class="login_verification">
                <!-- 显示密码 -->
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd" />
                <!-- 隐藏密码 -->
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd" />
                <!-- 切换按钮 -->
                <div class="switch_button" :class="showPwd? 'on':'off'" @click="showPwd = !showPwd">
                  <div class="switch_circle" :class="showPwd? 'showC':''"></div>
                  <span class="switch_text">{{showPwd ? 'abc': '....'}}</span>
                </div>
              </section>

              <!-- 验证码 -->
              <!--<section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" />
                <img />
              </section>-->
            </section>
          </div>

          <!-- 提交 -->
          <button class="login_submit">登录</button>
        </form>
        <router-link to="/aboutMe" class="about_us">关于作者</router-link>
      </div>
    </div>

    <AlerTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"></AlerTip>
  </div>
</template>



<script>
import { reqSendCode, reqPwdLogin, reqSmsLogin } from "../api/index";
import AlerTip from "../components/base/AlerTip.vue";

export default {
  data() {
    return {
      loginWay: false, // 登录状态
      phone: "",
      code: "",
      pwd: "",
      name: "",
      captcha: "",
      computeTime: "", // 验证码倒计时
      showPwd: false, // 是否显示隐藏密码

      // ---表单提交校验弹出框
      alertText: "",
      showAlert: false,
    };
  },
  computed: {
    // ---手机号合法检查
    rightPhone() {
      return /^1\d{10}$/.test(this.phone); // true/false
    },
  },

  methods: {
    // ----------------------获取验证码+倒计时---------------------------
    async getCode() {
      // 如果当前没有计时...
      if (!this.computeTime) {
        // 1.才能启动倒计时
        this.computeTime = 30;
        this.intervalId = setInterval(() => {
          this.computeTime--;
          if (this.computeTime === 0) {
            clearInterval(this.intervalId);
          }
        }, 1000);

        // 2.再发送ajax请求（验证码短信）
        let result = await reqSendCode(this.phone);

        // if (result.code === 1) {
        //   // 显示失败提示
        //   this.showAlert = true;
        //   this.alertText = result.msg;
        //   // 停止倒计时
        //   if (this.computeTime) {
        //     this.computeTime = 0;
        //     clearInterval(this.intervalId);
        //   }
        // }
      }
    },

    // ------------------------------登录------------------------------------
    async toLogin() {
      let result;

      // 1.前台表单验证
      //     ：短信登录
      if (this.loginWay) {
        const { rightPhone, phone } = this;
        if (!this.rightPhone) {
          this.showAlert = true;
          this.alertText = "手机号不正确";
          return;
        } else if (!/^\d{6}$/.test(code)) {
          this.showAlert = true;
          this.alertText = "验证码不正确";
          return;
        }
        // 发送请求
        // result = await reqSmsLogin(phone, code);
        return alert("抱歉，接口失效");
      }
      //     ：账号登录
      else {
        const { name, pwd } = this;
        if (!this.name) {
          this.showAlert = true;
          this.alertText = "用户名不正确";
          return;
        } else if (!this.pwd) {
          this.showAlert = true;
          this.alertText = "密码不正确";
          return;
        }
        // 发送请求
        // result = await reqPwdLogin({ name, pwd });
        return alert("抱歉，接口失效");
      }

      // 2.得到结果处理，停止计时，操作后续处理
      /*   if (this.computeTime) {
        this.computeTime = 0;
        clearInterval(this.intervalId);
      }

      if (result.code === 0) {
        // 将user保存到state中
        const user = result.data; 
        this.$store.dispatch("recordUser", user);
        // 跳转到个人中心
        this.$router.replace("/profile");
      } else {
        const msg = result.msg;
        // 出现错误，重新刷新图片验证码
        this.getCaptcha();
        // 显示警告
        this.showAlert = true;
        this.alertText = msg;
      } */
    },

    // -----------------------关闭警示框-------------------
    closeTip() {
      this.showAlert = false;
      this.alertText = "";
    },
  },

  components: {
    AlerTip,
  },
};
</script>



<style scoped lang="stylus">
.loginContainer {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fafafa;
  z-index: 9999;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    // --------------头部----------------
    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: 600;
        color: #1a73e8;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #000;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #1a73e8;
            font-weight: 700;
            border-bottom: 2px solid #1a73e8;
          }
        }
      }
    }

    // -------------------------主体内容----------------------------------
    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 10px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #1a73e8;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #aaa;
              font-size: 14px;
              background: transparent;

              // 手机正确时候，获取验证码高亮
              &.ok_phone {
                color: #3a73e8;
                font-weight: 600;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            // 切换按钮
            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              // 不显示
              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #333;
                  font-weight: 600;
                }
              }

              // 显示
              &.on {
                background: #1a73e8;
              }

              // 圆圈
              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                // 过渡
                &.showC {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #1a73e8;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 10px;
          background: #1a73e8;
          color: #fff;
          text-align: center;
          font-size: 16px;
          letter-spacing: 5px;
          font-weight: 600;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 15px;
        color: #999;
        margin-top: 20px;
        text-align: center;
      }
    }

    .go_back {
      position: absolute;
      top: 15px;
      left: 15px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        font-weight: 600;
        color: #1a73e8;
      }
    }
  }
}
</style>
