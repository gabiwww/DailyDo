<template>
  <main class="main">
    <router-view></router-view>
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap");
</style>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
  //User select none
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
body {
  background-color: var(--background);
}

.main {
  max-width: 1440px;
  width: 100%;
  height: 1024px;
  margin-inline: auto;
  background-color: var(--bg);
}

:root {
  --bg: #f5f5f5;
  --black: #000000;
  --white: #ffffff;
  --white-opacity: rgba(255, 255, 255, 0.55);
  --blue: #0f4787;
  --light-blue: #0f478773;
  --pink: #c200ff;
  --yellow: #ffb800;
  --shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
}
</style>
