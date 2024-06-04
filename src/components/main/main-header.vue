<template>
  <div class="header">
    <div class="nav">
      <div class="nav-logo">
        <router-link to="/">DailyDo</router-link>
      </div>
      <div class="nav-right">
        <div class="nav-right-links">
          <router-link to="/activity">Moje Aktywności</router-link>
          <router-link to="/manage">Zarządzanie aktywnościami</router-link>
          <router-link to="/analitics">Statystyki</router-link>
        </div>
        <router-link to="/profile" class="nav-right-icon">
          <img src="@assets/user.svg" alt="" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  background-color: var(--blue);
  .nav {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
    .nav-logo {
      a {
        font-size: 48px;
        color: var(--white);
        font-weight: 700;
        text-decoration: none;
      }
    }
    .nav-right {
      display: flex;
      align-items: center;
      .nav-right-links {
        padding-right: 2rem;
        a:not(:last-child) {
          margin-right: 2rem;
        }
        a {
          font-size: 24px;

          font-weight: 400;
          color: var(--white);
          text-decoration: none;
        }
      }
      .nav-right-icon {
        padding-left: 2rem;
        border-left: 1px solid var(--white);
      }
    }
  }
}
</style>
