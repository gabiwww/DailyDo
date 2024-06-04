<template>
  <div class="home">
    <div class="home-content">
      <div class="home-text">
        <h1>Rejestracja</h1>
      </div>
      <div class="home-box">
        <form @submit.prevent="register">
          <div class="box-input">
            <input type="text" placeholder="Login" v-model="username" />
          </div>
          <div class="box-input">
            <input type="password" placeholder="Hasło" v-model="password" />
          </div>
          <div class="box-input confirm-box">
            <input
              class="confirm-input"
              type="password"
              placeholder="Powtórz hasło"
              v-model="confirmPassword"
            />
            <p class="error-text" v-if="passwordError">{{ passwordError }}</p>
          </div>
          <div class="box-button">
            <button
              :style="{ color: isDisabled ? 'gray' : 'white' }"
              class="box-btn"
              type="submit"
              :disabled="isDisabled"
            >
              Zarejestruj się
            </button>
          </div>
          <div class="box-button back-button">
            <button class="box-btn" @click="goBackToMainPage">
              Wróć do strony głównej
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      passwordError: "",
    };
  },
  computed: {
    isDisabled() {
      return this.password !== this.confirmPassword;
    },
  },
  watch: {
    password() {
      this.checkPasswords();
    },
    confirmPassword() {
      this.checkPasswords();
    },
  },
  methods: {
    checkPasswords() {
      this.passwordError = this.isDisabled ? "Hasła nie są zgodne" : "";
    },
    async register() {
      if (this.isDisabled) {
        this.passwordError = "Hasła nie są zgodne";
        return;
      } else {
        this.passwordError = "";
      }

      const response = await fetch("http://localhost:3002/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });

      if (response.ok) {
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        this.$router.push("/login");
      } else {
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        alert("Registration failed");
      }
    },
    goBackToMainPage() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.error-text {
  color: red;
  text-align: center;
}
.confirm-input {
  margin-bottom: 1rem;
}
.confirm-box {
  padding-bottom: 1rem;
}
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
