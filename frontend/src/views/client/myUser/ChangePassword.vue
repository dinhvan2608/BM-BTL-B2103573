<template>
  <div class="list-book-client flex-wrapper">
    <header class="header">
      <div class="container">
        <div class="inner-head">
          <div class="inner-box">
            <router-link to="/">
              <div class="inner-logo">
                <img src="../../../assets/Ayaya.png" alt="Logo" />
                <span>AyayaBook</span>
              </div>
            </router-link>
            <ul class="inner-menu">
              <router-link to="/">
                <li>Home</li>
              </router-link>
              <router-link to="/books">
                <li>Books</li>
              </router-link>
            </ul>
          </div>
          <form @submit.prevent="search()">
            <div class="form-group d-flex mb-0">
              <input
                type="text"
                id="keyword"
                name="keyword"
                class="form-control"
                placeholder="Nhập từ khóa..."
                v-model="keyword"
              />
              <button type="submit" class="btn btn-primary btn-search">
                Tìm
              </button>
            </div>
          </form>
          <div v-if="myUser.userId">
            <div class="inner-info" @click="showUser()">
              <button
                v-if="myUser.avatar"
                class="title-name"
                style="padding: 0"
              >
                <img
                  v-bind:src="myUser.avatar"
                  v-bind:alt="myUser.fullName"
                  width="40px"
                  height="40px"
                  style="
                    object-fit: cover;
                    object-position: center;
                    border-radius: 50%;
                  "
                />
              </button>
              <button v-else class="title-name" :style="myStyle">
                {{ myUser.charName }}
              </button>
              <div class="box-info" :style="show">
                <div class="info" @click="myInfo()">
                  <i class="fa-regular fa-user"></i> Thông tin cá nhân
                </div>
                <div class="borrow" @click="borrowBook()">
                  <i class="fa-solid fa-book mr-2"></i> Sách đã mượn
                </div>
                <div class="log" @click="logout()">
                  <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
                </div>
              </div>
            </div>
          </div>
          <div v-else class="inner-auth">
            <router-link to="/auth/login">
              <div class="sign-in">Sign in</div>
            </router-link>
            <router-link to="/auth/register">
              <div class="sign-up">Sign up</div>
            </router-link>
          </div>
        </div>
      </div>
    </header>
    <div>
      <div class="container my-5">
        <div class="row justify-content-center">
          <div class="col-8">
            <h1 class="text-center mb-5">Đổi mật khẩu</h1>
            <form @submit.prevent="updatePassword()">
              <div class="form-group">
                <label for="password"
                  >Mật khẩu hiện tại <span style="color: red">*</span>
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  @blur="validate()"
                  v-model="password.password"
                  v-bind:class="{ 'is-invalid': errors.password }"
                />
                <div class="invalid-feedback" v-if="errors.password">
                  {{ errors.password }}
                </div>
              </div>
              <div class="form-group">
                <label for="newPassword"
                  >Mật khẩu mới <span style="color: red">*</span>
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                  name="newPassword"
                  @blur="validate()"
                  v-model="password.newPassword"
                  v-bind:class="{ 'is-invalid': errors.newPassword }"
                />
                <div class="invalid-feedback" v-if="errors.newPassword">
                  {{ errors.newPassword }}
                </div>
              </div>
              <div class="form-group">
                <label for="rePassword"
                  >Nhập lại mật khẩu <span style="color: red">*</span>
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="rePassword"
                  name="rePassword"
                  @blur="validate()"
                  v-model="password.rePassword"
                  v-bind:class="{ 'is-invalid': errors.rePassword }"
                />
                <div class="invalid-feedback" v-if="errors.rePassword">
                  {{ errors.rePassword }}
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">Cập nhật</button>

                <div
                  class="invalid-feedback"
                  v-if="errors.message"
                  style="display: block"
                >
                  {{ errors.message }}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">Copyright 2024 by VanB2103573</footer>
  </div>
</template>

<style scoped>
.flex-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}
</style>

<script>
export default {
  name: "InfoUser",
  data() {
    return {
      myStyle: {
        backgroundColor: "",
      },
      show: {
        display: "none",
      },
      errors: {
        password: "",
        newPassword: "",
        rePassword: "",
        message: "",
      },
      myUser: {
        userId: "",
        fullName: "",
        avatar: "",
        birthYear: "",
        sex: "",
        address: "",
        phone: "",
        password: "",
        charName: "",
        bgc: "",
      },
      password: {
        password: "",
        newPassword: "",
        rePassword: "",
      },
      keyword: "",
    };
  },
  created() {
    const tokenUser = this.$cookies.get("tokenUser");
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (tokenUser) {
      this.getMyUser(tokenUser);
      this.myStyle.backgroundColor = "#" + randomColor;
    }
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        password: "",
        newPassword: "",
        rePassword: "",
        message: "",
      };
      if (!this.password.password) {
        this.errors.password = "Password is required";
        isValid = false;
        return;
      }
      if (!this.password.newPassword) {
        this.errors.newPassword = "New password is required";
        isValid = false;
        return;
      }
      if (!this.password.rePassword) {
        this.errors.rePassword = "Re password is required";
        isValid = false;
        return;
      }

      if (this.password.newPassword !== this.password.rePassword) {
        this.errors.rePassword = "Re password incorrect";
        isValid = false;
        return;
      }

      return isValid;
    },
    updatePassword() {
      if (this.validate()) {
        const tokenUser = this.$route.params.token;
        if (tokenUser) {
          this.$request
            .patch(
              `http://localhost:5268/api/my-user/change-password/${tokenUser}`,
              this.password
            )
            .then((res) => {
              if (res.data.success) {
                this.$swal.fire("Đổi mật khẩu thành công!", "", "success");
                this.$router.push({ name: "user.info" });
              } else {
                this.errors.message = res.data.message;
              }
            });
        }
      }
    },
    search() {
      if (this.keyword) {
        this.$router.push({
          name: "books.result.search",
          query: { keyword: this.keyword },
        });
      }
    },
    async openUploadWidget() {
      const widget = await window.cloudinary.createUploadWidget(
        {
          cloud_name: "dyic01hpo",
          upload_preset: "upload-image-book",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            this.errors.avatar = "";
            this.myUser.avatar = result.info.secure_url;
          }
        }
      );
      widget.open();
    },
    getMyUser(tokenUser) {
      this.$request
        .get(`http://localhost:5268/api/my-user/${tokenUser}`)
        .then((res) => {
          if (res.data.success) {
            this.myUser = res.data.user;
            const arrName = res.data.user.fullName.split(" ");
            const name = arrName[arrName.length - 1];

            this.myUser.charName = name[0].toUpperCase();
          }
        });
    },
    showUser() {
      if (this.show.display === "none") {
        this.show.display = "block";
      } else {
        this.show.display = "none";
      }
    },
    myInfo() {
      this.$router.push({ name: "user.info" });
    },
    borrowBook() {
      this.$router.push({ name: "books.order" });
    },
    logout() {
      this.$cookies.remove("tokenUser");
      this.$router.push({ name: "user.login" });
    },
  },
};
</script>
