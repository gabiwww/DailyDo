<template>
  <div class="home">
    <MainHeader />
    <MainMobileHeader />
    <div class="home-content">
      <div class="home-text">
        <h1>Profil</h1>
      </div>
      <div class="home-box">
        <div class="box-top" @click="goToLoginData">
          <h2>Dane logowania</h2>
          <img src="@assets/arrow-right.svg" alt="" />
        </div>
      </div>
      <div class="home-logout" @click="logout">
        <img src="@assets/logout.svg" alt="" />
        <h2>wyloguj</h2>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@main-components/main-header.vue";
import MainMobileHeader from "@main-components/main-mobile-header.vue";

export default {
  components: {
    MainHeader,
    MainMobileHeader,
  },
  data() {
    return {
      isActivitiesOpen: false,
    };
  },
  methods: {
    logout() {
      this.$router.push("/");
    },
    goToLoginData() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 1024px;
  align-items: center;
  flex-direction: column;
  background: rgb(15, 71, 135);
  background: linear-gradient(
    90deg,
    rgba(15, 71, 135, 0.6) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(15, 71, 135, 0.6) 100%
  );
  .home-content {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    .home-logout {
      cursor: pointer;
      width: 640px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      img {
        margin-right: 1rem;
      }
      h2 {
        font-size: 24px;
        color: var(--blue);
        font-weight: 700;
      }
    }
    .home-text {
      text-align: center;
      padding-top: 2rem;
      margin-bottom: 2rem;
      h1 {
        font-size: 32px;
        text-transform: uppercase;
        color: var(--blue);
        font-weight: 700;
        margin-bottom: 1rem;
      }
    }
    .home-box:not(:last-child) {
      margin-bottom: 2rem;
    }
    .home-box {
      width: 640px;
      padding: 1rem;
      background-color: var(--white-opacity);
      border-radius: 15px;
      margin-left: auto;
      margin-right: auto;
      box-shadow: var(--shadow);
      .box-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        cursor: pointer;
        h2 {
          font-size: 22px;
          font-weight: 600;
          color: var(--blue);
        }
        img {
          transition: 0.5s;
          &.active {
            transform: rotate(180deg);
          }
        }
      }
      .box-mid {
        p {
          font-size: 16px;
          font-weight: 700;
          color: var(--light-blue);
        }
      }
      .box-bottom {
        margin-top: 1rem;
        display: block;
        .box-bottom-columns {
          display: flex;
          .box-bottom-left {
            display: flex;
            align-items: center;
            margin-right: 1rem;
            p {
              font-size: 16px;
              font-weight: 400;
              color: var(--blue);
              margin-right: 1rem;
            }
            .box-select {
              .select-styled {
                select {
                  width: 162px;
                  height: 31px;
                  border: none;
                  box-shadow: var(--shadow);
                  color: var(--light-blue);
                  border-radius: 15px;
                  padding-left: 1rem;
                  font-size: 14px;
                  font-weight: 600;
                  -webkit-appearance: none;
                  background: url("@assets/arrow-down.svg");
                  background-repeat: no-repeat;
                  background-position-x: 90%;
                  background-position-y: 50%;
                  cursor: pointer;
                }
              }
            }
          }
          .box-bottom-right {
            display: flex;
            align-items: center;
            p {
              font-size: 16px;
              font-weight: 400;
              color: var(--blue);
              margin-right: 1rem;
            }
            .box-select {
              .select-styled {
                select {
                  width: 162px;
                  height: 31px;
                  border: none;
                  box-shadow: var(--shadow);
                  color: var(--light-blue);
                  border-radius: 15px;
                  padding-left: 1rem;
                  font-size: 14px;
                  font-weight: 600;
                  -webkit-appearance: none;
                  background: url("@assets/arrow-down.svg");
                  background-repeat: no-repeat;
                  background-position-x: 90%;
                  background-position-y: 50%;
                  cursor: pointer;
                }
              }
            }
          }
        }
        &.active {
          display: none;
        }
      }
      .box-bottom-info {
        margin-top: 1rem;
        margin-bottom: 1rem;
        p {
          font-size: 14px;
          font-weight: 400;
          color: var(--light-blue);
        }
      }
      .box-bottom-button {
        .box-bottom-btn {
          width: 240px;
          height: 41px;
          background-color: var(--light-blue);
          border: 1px solid var(--light-blue);
          color: var(--white);
          font-size: 16px;
          font-weight: 700;
          border-radius: 25px;
          cursor: pointer;
        }
      }
    }
  }
  .mobile-header {
    display: none;
  }
}

@media screen and (max-width: 1200px) {
  .home {
    .header {
      display: none;
    }
    .mobile-header {
      display: flex;
    }
    .home-content {
      .home-text {
        h1 {
          font-size: 24px;
          text-align: left;
        }
        p {
          text-align: left;
        }
      }
      .home-box {
        width: 100%;
        .box-bottom {
          .box-bottom-columns {
            flex-direction: column;
            .box-bottom-left {
              margin-bottom: 1rem;
            }
          }
        }
      }
      .home-logout {
        width: 100%;
      }
    }
  }
}
</style>
