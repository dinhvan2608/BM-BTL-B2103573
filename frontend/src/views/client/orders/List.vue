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
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="box-head">
              <h1 class="inner-title text-center mt-5">Sách đã mượn</h1>
            </div>
          </div>
        </div>
        <div class="container book-order">
          <div class="row">
            <div v-for="order in orders" class="col-4 mb-3">
              <div
                class="box-book"
                @click="sendDetail(order.book.slug)"
                style="cursor: pointer"
              >
                <div class="inner-image">
                  <img
                    v-bind:src="order.book.thumbnail"
                    v-bind:alt="order.book.bookName"
                  />
                </div>
                <div class="inner-box p-2">
                  <h2 class="inner-title mb-3">{{ order.book.bookName }}</h2>
                  <div
                    v-if="order.order.createdAt === order.order.updatedAt"
                    class="inner-create mb-2"
                  >
                    Ngày mượn mới nhất:
                    <b>{{ formatDate(order.order.createdAt) }}</b>
                  </div>
                  <div v-else class="inner-update mb-2">
                    Ngày mượn mới nhất:
                    <b>{{ formatDate(order.order.updatedAt) }}</b>
                  </div>
                  <div class="inner-quantity mb-2">
                    Số lượng đã mượn: <span>{{ order.order.quantity }}</span>
                  </div>
                  <form
                    class="d-none"
                    @submit.prevent="
                      giveOrder(order.user.userId, order.book.bookId)
                    "
                  >
                    <div class="form-group mb-2">
                      <input
                        type="number"
                        min="1"
                        v-bind:max="order.order.quantity"
                        name="giveQuantity"
                        id="giveQuantity"
                        class="form-control"
                        v-model="myOrder.giveQuantity"
                        placeholder="Số lượng cần trả..."
                      />
                    </div>
                    <div class="form-group mb-2">
                      <button
                        type="submit"
                        class="btn btn-warning btn-block"
                        style="color: #fff; font-weight: 600"
                      >
                        Trả sách
                      </button>
                    </div>
                  </form>
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

.book-order .box-book {
  border: 1px solid #ccc;
  border-radius: 12px;
}

.book-order .inner-image {
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
}

.book-order .inner-image img {
  height: 250px;
  object-fit: contain;
}

.book-order .inner-quantity span {
  color: #fff;
  background: green;
  font-weight: 600;
  display: inline-block;
  padding: 3px 6px;
  border-radius: 8px;
}

.box-book:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
}

.flex-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}
</style>

<script>
import moment from "moment";
export default {
  name: "OrderBook",
  data() {
    return {
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
      myOrder: {
        giveQuantity: "",
      },
      orders: [],
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
    giveOrder(userId, bookId) {
      this.$request
        .patch("http://localhost:5268/api/order/give", {
          userId: userId,
          bookId: bookId,
          giveQuantity: this.myOrder.giveQuantity,
        })
        .then((res) => {
          this.getAll(res.data.userId);
          console.log(res.data);
        });
    },
    getAll(userId) {
      this.$request
        .get(`http://localhost:5268/api/order/${userId}`)
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
          }
        });
    },
    sendDetail(slugBook) {
      this.$router.push({ name: "books.detail", params: { slugBook } });
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("h:mm A, DD/MM/YYYY");
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
    getMyUser(tokenUser) {
      this.$request
        .get(`http://localhost:5268/api/my-user/${tokenUser}`)
        .then((res) => {
          if (res.data.success) {
            this.myUser = res.data.user;
            const arrName = res.data.user.fullName.split(" ");
            const name = arrName[arrName.length - 1];

            this.myUser.charName = name[0].toUpperCase();
            this.getAll(this.myUser.userId);
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
