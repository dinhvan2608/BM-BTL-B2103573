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
    <div v-if="errors.message" class="container">
      <div class="text-center not-found">
        {{ errors.message }}
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="box-head">
              <h2 class="inner-title mt-4">
                Kết quả tìm kiếm: {{ previousKeyword }}
              </h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            v-for="book in books"
            class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb-3"
          >
            <div class="product-item" @click="sendDetail(book.slug)">
              <div class="inner-image">
                <img v-bind:src="book.thumbnail" v-bind:alt="book.bookName" />
              </div>
              <div class="inner-content">
                <h3 class="inner-title">{{ book.bookName }}</h3>
                <div class="inner-author mb-2">
                  Tác giả: <span>{{ book.author }}</span>
                </div>
                <div class="inner-status mb-2">
                  Số lượng: <span>{{ book.stock }}</span>
                </div>
                <div v-if="book.rate" class="inner-rate">
                  <div>
                    Đánh giá: <b>{{ book.rate }}</b>
                  </div>
                  <img
                    src="https://salt.tikicdn.com/ts/upload/e3/f0/86/efd76e1d41c00ad8ebb7287c66b559fd.png"
                    alt=""
                  />
                </div>
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
/* End box-head */

/* product-item */
.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  max-height: 360px;
  height: 100%;
}

.product-item:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
}

.product-item .inner-image {
  width: 100%;
  aspect-ratio: 4/3;
  border-bottom: 1px solid #ddd;
}

.product-item .inner-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-item .inner-content {
  padding: 15px;
}

.product-item .inner-content .inner-title {
  font-size: 20px;
  font-weight: 700;
}

.product-item .inner-content .inner-status,
.product-item .inner-content .inner-author {
  font-weight: 500;
}

.product-item .inner-content .inner-author span {
  font-size: 16px;
  font-weight: 400;
}

.product-item .inner-content .inner-status span {
  padding: 1px 10px 2px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: rgb(0, 182, 0);
}

.product-item .inner-content .inner-rate {
  display: flex;
  align-items: center;
  gap: 5px;
}

.product-item .inner-content .inner-rate img {
  width: 20px;
  height: 20px;
}
/* End product-item */

.not-found {
  font-size: 24px;
  font-weight: 500;
  color: red;
}

.flex-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}
</style>

<script>
export default {
  name: "ListBookUser",
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
      errors: {
        message: "",
      },
      keyword: "",
      previousKeyword: "",
      books: [],
    };
  },
  created() {
    const tokenUser = this.$cookies.get("tokenUser");
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (tokenUser) {
      this.getMyUser(tokenUser);
      this.myStyle.backgroundColor = "#" + randomColor;
    }
    this.keyword = this.$route.query.keyword;
    this.getAllBookSearch(this.$route.query.keyword);
  },
  methods: {
    getAllBookSearch(keyword) {
      this.$request
        .get(`http://localhost:5268/api/books/search?keyword=${keyword}`)
        .then((res) => {
          if (res.data.success) {
            this.books = res.data.books;
          } else {
            this.errors.message = res.data.message;
          }
        });
      this.previousKeyword = this.keyword;
      this.keyword = "";
      this.errors.message = "";
    },
    sendDetail(slugBook) {
      this.$router.push({ name: "books.detail", params: { slugBook } });
    },
    search() {
      if (this.keyword) {
        this.$router.push({
          name: "books.result.search",
          query: { keyword: this.keyword },
        });
        this.getAllBookSearch(this.keyword);
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
