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
                <li style="color: #598cd9">Books</li>
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
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="box-head">
              <h1 class="inner-title text-center mt-5">Chi tiết sản phẩm</h1>
            </div>
          </div>
        </div>
        <div class="product-detail">
          <div class="container my-5">
            <div class="row">
              <div class="col-5">
                <div class="inner-thumb">
                  <img v-bind:src="book.thumbnail" v-bind:alt="book.bookName" />
                </div>
              </div>
              <div class="col-1"></div>
              <div class="col-6">
                <h2 class="inner-title">{{ book.bookName }}</h2>
                <div class="inner-author" v-if="book.author">
                  Tác giả: <b>{{ book.author }}</b>
                </div>
                <div class="inner-author" v-else>Tác giả: <b>Cộng đồng</b></div>
                <div v-if="publisher.fullName">
                  <div class="inner-publisher">
                    Nhà xuất bản: <b>{{ publisher.fullName }}</b>
                  </div>
                </div>
                <div class="inner-publisher" v-else>
                  Nhà xuất bản: <b>Cộng đồng</b>
                </div>
                <div class="inner-publicYear">
                  Năm xuất bản: <b>{{ book.publicYear }}</b>
                </div>
                <div class="inner-rate" v-if="book.rate">
                  <div>
                    Đánh giá: <b>{{ book.rate }}</b>
                  </div>
                  <img
                    src="../../../assets/efd76e1d41c00ad8ebb7287c66b559fd.png"
                    alt="Star"
                  />
                </div>
                <div class="inner-stock mb-2" v-if="book.stock >= 1">
                  Còn lại <span>{{ book.stock }}</span> sản phẩm
                </div>
                <div v-else class="mb-2">
                  <b style="color: red">Sản phẩm đã hết hàng!</b>
                </div>
                <form v-if="book.stock" @submit.prevent="orderBook()">
                  <input
                    class="form-control mb-2"
                    type="number"
                    name="quantity"
                    min="1"
                    value="1"
                    v-bind:max="book.stock"
                    v-model="order.quantity"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="errors.message"
                    style="display: block"
                  >
                    {{ errors.message }}
                  </div>
                  <button
                    type="submit"
                    class="btn btn-block"
                    style="
                      background-color: #0f1b4c;
                      color: #fff;
                      font-weight: 600;
                    "
                  >
                    Mượn sách
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="container my-5">
            <div class="row">
              <div class="col-12">
                <div class="box-head">
                  <h2 class="inner-title border-b text-center">
                    Mô tả sản phẩm
                  </h2>
                </div>
                <div class="inner-desc" v-html="book.description"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">Copyright 2024 by VanB2103573</footer>
  </div>
</template>

<style scoped>
/* box-head */
.box-head {
  margin-bottom: 30px;
}

.box-head .inner-title {
  margin-bottom: 2px;
  font-size: 28px;
  font-weight: 600;
  color: #0f1b4c;
  position: relative;
}

.box-head .inner-title::after {
  content: "";
  display: inline-block;
  width: 100px;
  height: 3px;
  background-color: #0f1b4c;
  position: absolute;
  top: calc(100% + 2px);
  left: calc(50% - 50px);
}

.border-b {
  padding-top: 30px;
  border-top: 1px solid #ddd;
}
/* End box-head */

/* product-detail */
.product-detail .inner-thumb img {
  width: 100%;
  height: auto;
}

.product-detail .inner-title {
  font-size: 32px;
  margin-bottom: 15px;
}

.product-detail .inner-author {
  margin-bottom: 10px;
}

.product-detail .inner-publisher {
  margin-bottom: 10px;
}

.product-detail .inner-publicYear {
  margin-bottom: 10px;
}

.product-detail .inner-rate {
  margin-bottom: 10px;
  display: flex;
  gap: 5px;
}

.product-detail .inner-rate img {
  width: 20px;
  height: 20px;
}

.product-detail .inner-stock {
  margin-bottom: 10px;
}

.product-detail .inner-stock span {
  color: #fff;
  background: green;
  font-weight: 600;
  display: inline-block;
  padding: 3px 6px;
  border-radius: 8px;
}
/* End product-detail */

.flex-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}
</style>

<script>
export default {
  name: "DetailBook",
  data() {
    return {
      textHover: {
        color: "#598cd9",
      },
      myStyle: {
        backgroundColor: "",
      },
      show: {
        display: "none",
      },
      errors: {
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
      book: {
        bookId: "",
        bookName: "",
        thumbnail: "",
        author: "Cộng đồng",
        stock: "",
        rate: "",
        description: "",
        publicYear: "",
      },
      publisher: {
        idPublisher: "",
        fullName: "Cộng đồng",
      },
      order: {
        userId: "",
        bookId: "",
        quantity: "1",
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
    this.getBook(this.$route.params.slugBook);
  },
  methods: {
    getBook(slugBook) {
      this.$request
        .get(`http://localhost:5268/api/books/detail/${slugBook}`)
        .then((res) => {
          if (res.data.success) {
            this.book = res.data.book;
            this.publisher = res.data.publisher;
            if (this.book.stock === 0) {
              console.log(this.book);
              this.$request
                .patch(
                  `http://localhost:5268/api/books/change-status/${slugBook}`
                )
                .then((res) => {
                  if (res.data.success) {
                    this.$router.push({ name: "books.list" });
                  }
                });
            }
          }
        });
    },
    orderBook() {
      const tokenUser = this.$cookies.get("tokenUser");
      if (tokenUser) {
        this.order.userId = this.myUser.userId;
        this.order.bookId = this.book.bookId;
        this.$request
          .post("http://localhost:5268/api/order/create", this.order)
          .then((res) => {
            if (res.data.success === true) {
              this.getBook(this.$route.params.slugBook);
              this.order.quantity = "1";
              this.$swal.fire("Đã mượn!", "", "success");
            } else {
              this.errors.message = res.data.message;
            }
          });
      } else {
        this.$swal
          .fire({
            title: "Bạn cần có tài khoản để thực hiện mượn sách?",
            showCancelButton: true,
            confirmButtonText: "OK",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$router.push({ name: "user.login" });
            }
          });
      }
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
    search() {
      if (this.keyword) {
        this.$router.push({
          name: "books.result.search",
          query: { keyword: this.keyword },
        });
      }
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
