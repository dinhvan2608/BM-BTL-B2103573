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
                <li style="color: #598cd9">Home</li>
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
    <div class="main">
      <div class="container">
        <div class="section-one">
          <div class="row">
            <div class="col-6">
              <div class="inner-content">
                <h1>
                  WELCOME TO <br /><span style="color: #598cd9">AYAYABOOK</span>
                </h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Nobis similique corrupti maiores vero in, debitis voluptas
                  adipisci omnis iure nisi qui itaque eum. Quia veniam maxime
                  iusto, animi dolores laudantium! Nisi exercitationem excepturi
                  tempora vel enim, labore dolore perspiciatis id numquam!
                  Beatae veniam deserunt sed nemo labore laborum! Adipisci
                  possimus sapiente aliquam consequatur rem accusamus! Hic vel
                  assumenda unde vitae?
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="inner-image">
                <img
                  v-bind:src="bookFirst.thumbnail"
                  v-bind:alt="bookFirst.bookName"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="section-two">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="box-head">
                  <h1 class="inner-title text-center mt-4">New Books</h1>
                </div>
              </div>
            </div>
            <div class="row">
              <div
                v-for="(book, index) in books"
                class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb-3"
              >
                <div
                  v-if="index < 4"
                  class="product-item"
                  @click="sendDetail(book.slug)"
                >
                  <div class="inner-image">
                    <img
                      v-bind:src="book.thumbnail"
                      v-bind:alt="book.bookName"
                    />
                  </div>
                  <div class="inner-content">
                    <h3 class="inner-title">{{ book.bookName }}</h3>
                    <div class="inner-author mb-2">
                      Tác giả: <span>{{ book.author }}</span>
                    </div>
                    <div class="inner-status mb-2">
                      Số lượng: <span>{{ book.stock }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <router-link to="/books">
            <div class="inner-more">
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </router-link>
        </div>

        <div class="section-three">
          <div class="row">
            <div class="col-6">
              <div class="inner-image">
                <img
                  src="https://res.cloudinary.com/dyic01hpo/image/upload/v1713501705/upload-image-book/dasuxvppq58lydpmiklf.png"
                  alt=""
                />
              </div>
            </div>
            <div class="col-6">
              <div class="inner-content">
                <div class="box-head">
                  <h2 class="inner-title text-center mt-4">About us</h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Recusandae dolorem molestias dolor consectetur aspernatur,
                    nobis obcaecati, commodi ad, a odit ipsum ullam sequi omnis
                    rerum! Quo veritatis beatae praesentium itaque! Ducimus
                    perspiciatis temporibus laudantium explicabo nulla nisi qui
                    soluta maiores vitae. Asperiores laborum minima accusamus!
                    Eaque, obcaecati dicta. Omnis, minima nihil. Tempore
                    inventore quis dolorum totam obcaecati, earum saepe
                    laudantium.
                  </p>
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
.section-one {
  height: calc(100vh - 50px);
}

.section-one .row {
  height: calc(100vh - 50px);
}

.section-one .inner-content,
.section-one .inner-image {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-one .inner-content h1 {
  font-size: 42px;
  font-weight: 700;
}

.section-one .inner-content p {
  font-size: 16px;
  color: rgb(51, 51, 51);
  margin-top: 30px;
}

.section-one .inner-image img {
  width: 90%;
  height: auto;
  margin-left: 30px;
}

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
  width: 60px;
  height: 3px;
  background-color: #0f1b4c;
  position: absolute;
  top: calc(100% + 2px);
  left: calc(50% - 30px);
}
/* End box-head */

/* product-item */
.section-two {
  padding-top: 50px;
  position: relative;
}

.section-two .inner-more {
  cursor: pointer;
  font-size: 50px;
  color: #0f1b4c;
  position: absolute;
  left: 100%;
  top: calc(50%);
}

.product-item {
  cursor: pointer;
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

.section-three {
  padding: 120px 0;
}

.section-three .inner-content,
.section-three .inner-image {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-three .inner-content h1 {
  font-size: 42px;
  font-weight: 700;
}

.section-three .inner-content p {
  font-size: 16px;
  color: rgb(51, 51, 51);
  margin-top: 30px;
}

.section-three .inner-image img {
  width: 90%;
  height: auto;
  margin-left: 30px;
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
      keyword: "",
      books: [],
      bookFirst: {
        bookName: "",
        thumbnail: "",
      },
    };
  },
  created() {
    const tokenUser = this.$cookies.get("tokenUser");
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    if (tokenUser) {
      this.getMyUser(tokenUser);
      this.myStyle.backgroundColor = randomColor;
    }
    this.getAllBook();
  },
  methods: {
    getAllBook() {
      this.$request.get("http://localhost:5268/api/books").then((res) => {
        if (res.data.success) {
          this.books = res.data.books;
          this.bookFirst.bookName = res.data.books[0].bookName;
          this.bookFirst.thumbnail = res.data.books[0].thumbnail;
        }
      });
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
