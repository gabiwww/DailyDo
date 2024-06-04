<template>
  <div class="home">
    <div class="home-content">
      <div class="home-text">
        <h1>Dane do logowania</h1>
      </div>
      <div class="home-box">
        <div class="box-input">
          <input type="text" placeholder="Login" v-model="username" />
        </div>
        <div class="box-input">
          <input type="password" placeholder="Hasło" v-model="password" />
        </div>
        <div class="box-button back-button">
          <button class="box-btn" @click="goBackToMainProfile">
            Wróć do strony profilu
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
    };
  },
  methods: {
    goBackToMainProfile() {
      this.$router.push("/profile");
    },
    async fetchUserData() {
      // replace with your actual API call
      const response = await api({ url: "/profile", method: "GET" });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      this.username = data.username;
      this.password = data.password;
    },
  },
  mounted() {
    this.fetchUserData();
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
