<template>
  <div class="home">
    <MainHeader />
    <MainMobileHeader />
    <div class="home-content">
      <div class="home-text">
        <h1>Rejestracja</h1>
      </div>
      <div class="home-box">
        <div class="box-input">
          <input type="text" placeholder="Login" />
        </div>
        <div class="box-input">
          <input type="password" placeholder="Hasło" />
        </div>
        <div class="box-input">
          <input type="password" placeholder="Powtórz hasło" />
        </div>
        <div class="box-button">
          <button class="box-btn">Zarejestruj się</button>
        </div>
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
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 1024px;
  align-items: center;
  flex-direction: column;
  background: url("@assets/bg2.png");
  .home-content {
    .home-text {
      padding-top: 2rem;
      margin-bottom: 2rem;
      h1 {
        text-align: center;
        color: var(--blue);
        font-size: 32px;
        font-weight: 700;
        text-transform: uppercase;
      }
    }
    .home-box {
      margin-left: auto;
      margin-right: auto;
      width: 643px;
      padding: 2rem;
      background-color: var(--white-opacity);
      border-radius: 15px;
      cursor: pointer;
      box-shadow: var(--shadow);
      .box-input {
        input {
          width: 100%;
          border-radius: 15px;
          font-size: 16px;
          border: none;
          box-shadow: var(--shadow);
          font-weight: 700;
          color: var(--light-blue);
          padding-left: 1rem;
          margin-bottom: 2rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
      }
      .box-button {
        display: flex;
        justify-content: center;
        .box-btn {
          width: 240px;
          height: 41px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 25px;
          background-color: var(--blue);
          border: 1px solid var(--blue);
          color: var(--white);
          box-shadow: var(--shadow);
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
      .home-list {
        display: none;
      }
      .home-text {
        width: 95%;
        margin-left: auto;
        margin-right: auto;
        h1 {
          text-align: left;
          font-size: 24px;
        }
      }
      .home-box {
        width: 95%;
      }
    }
  }
}
</style>
