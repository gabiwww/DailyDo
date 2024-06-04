<template>
  <div class="home">
    <div class="home-content">
      <div class="home-text">
        <h1>Logowanie</h1>
      </div>
      <div class="home-box">
        <div class="box-input">
          <input type="text" placeholder="Login" v-model="username" />
        </div>
        <div class="box-input">
          <input :type="inputType" placeholder="Hasło" v-model="password" />
          <img
            class="eye-icon"
            v-if="!showPassword"
            src="@assets/eye.svg"
            alt="Hide Password"
            @click="togglePassword()"
          />
          <img
            class="eye-icon"
            v-else
            src="@assets/eye-closed.svg"
            alt="Show Password"
            @click="togglePassword()"
          />
        </div>
        <div class="box-button">
          <button class="box-btn" @click="login">Zaloguj się</button>
        </div>
        <div class="box-button back-button">
          <button class="box-btn" @click="goBackToMainPage">
            Wróć do strony głównej
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../lib/api";

export default {
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
    };
  },
  computed: {
    inputType() {
      return this.showPassword ? "text" : "password";
    },
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
      console.log("password?", this.showPassword);
    },
    async login() {
      const response = await api({
        url: "/auth/login",
        method: "POST",
        body: { username: this.username, password: this.password },
      });

      if (response.ok) {
        this.username = "";
        this.password = "";

        const data = await response.json();
        const accessToken = data.access_token;
        localStorage.setItem("accessToken", accessToken);

        this.$router.push("/activity");
      } else {
        this.username = "";
        this.password = "";
        alert("Login failed");
      }
    },
    goBackToMainPage() {
      this.$router.push("/");
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
        position: relative;
        input {
          width: 100%;
          border-radius: 15px;
          font-size: 16px;
          border: none;
          box-shadow: var(--shadow);
          font-weight: 700;
          color: var(--light-blue);
          padding-left: 1rem;
          padding-right: 3rem; /* Add padding for the icon */
          margin-bottom: 2rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
        .eye-icon {
          position: absolute;
          top: 28%; /* Adjust the position vertically */
          right: 1rem; /* Adjust the position horizontally */
          transform: translateY(-50%);
          cursor: pointer;
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
      .back-button {
        margin-top: 1rem;
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
