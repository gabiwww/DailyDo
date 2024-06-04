<template>
  <div class="home">
    <div class="home-pc">
      <h1>DailyDo</h1>
      <p>Witaj w DailyDo!</p>
      <p>
        Twórz aktywności i utrzymuj balans między pracą a życiem każdego dnia.
      </p>
      <button class="home-btn" @click="goToLogin">Zaloguj się</button>
      <button class="home-btn" @click="goToRegister">Zarejestruj się</button>
    </div>
    <div class="home-mobile">
      <div class="mobile-box">
        <p>Witaj w DailyDo!</p>
        <p>
          Twórz aktywności i utrzymuj balans między pracą a życiem każdego dnia.
        </p>
        <div class="mobile-box-buttons">
          <button class="mobile-box-btn" @click="goToLogin">Zaloguj się</button>
          <button class="mobile-box-btn" @click="goToRegister">
            Zarejestruj się
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import MainMobileHeader from "@main-components/main-mobile-header.vue";
export default {
  components: {
    MainMobileHeader,
  },
  setup() {
    const router = useRouter();

    const goToRegister = () => {
      router.push("/register");
    };

    const goToLogin = () => {
      router.push("/login");
    };

    return {
      goToRegister,
      goToLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 1024px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgb(15, 71, 135);
  background: linear-gradient(
    90deg,
    rgba(15, 71, 135, 0.6) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(15, 71, 135, 0.6) 100%
  );
  .home-pc {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1 {
      font-size: 128px;
      color: var(--blue);
      font-weight: 700;
      line-height: 128px;
      margin-bottom: 4rem;
    }
    p:not(:last-of-type) {
      margin-bottom: 2rem;
    }
    p:not(:first-of-type) {
      margin-bottom: 4rem;
    }
    p {
      width: 503px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      font-size: 24px;
      color: var(--blue);
    }
    .home-btn:not(:last-child) {
      width: 240px;
      height: 41px;
      font-size: 16px;
      font-weight: 700;
      border-radius: 25px;
      background-color: var(--blue);
      border: 1px solid var(--blue);
      color: var(--white);
      margin-bottom: 1rem;
      box-shadow: var(--shadow);
      cursor: pointer;
    }
    .home-btn:last-child {
      width: 240px;
      height: 41px;
      font-size: 16px;
      font-weight: 700;
      border-radius: 25px;
      background-color: var(--white);
      border: 1px solid var(--white);
      color: var(--blue);
      margin-bottom: 2rem;
      box-shadow: var(--shadow);
      cursor: pointer;
    }
  }
  .home-mobile {
    display: none;
  }
}

@media screen and (max-width: 1200px) {
  .home {
    height: 844px;
    .home-pc {
      display: none;
    }
    .home-mobile {
      display: block;
      width: 100%;
      .mobile-header {
        background-color: var(--blue);
        height: 80px;
        display: flex;
        .mobile-header-content {
          width: 95%;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .mobile-header-logo {
            flex: 1;
            text-align: center;
            a {
              font-size: 24px;
              color: var(--white);
              font-weight: 700;
              text-decoration: none;
            }
          }
          .mobile-header-menu {
            flex: 0;
            margin-left: auto;
          }
        }
      }
      .mobile-box {
        margin-top: 2rem;
        width: 95%;
        margin-left: auto;
        margin-right: auto;
        background-color: var(--white-opacity);
        box-shadow: var(--shadow);
        border-radius: 15px;
        padding: 2rem;
        p:not(:last-of-type) {
          margin-bottom: 1rem;
        }
        p:not(:first-of-type) {
          margin-bottom: 2rem;
        }
        p {
          width: 313px;
          margin-right: auto;
          margin-left: auto;
          text-align: center;
          color: var(--blue);
          font-size: 1rem;
        }
        .mobile-box-buttons {
          display: flex;
          flex-direction: column;
          align-items: center;
          .mobile-box-btn:not(:last-child) {
            width: 240px;
            height: 40px;
            background-color: var(--blue);
            color: var(--white);
            border: 1px solid var(--blue);
            box-shadow: var(--shadow);
            border-radius: 25px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            margin-bottom: 1rem;
          }
          .mobile-box-btn:last-child {
            width: 240px;
            height: 40px;
            background-color: var(--white);
            color: var(--blue);
            border: 1px solid var(--white);
            box-shadow: var(--shadow);
            border-radius: 25px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            margin-bottom: 1rem;
          }
        }
      }
    }
  }
}
</style>
