<script setup>
// useFetch 是 Nuxt 自带的，专门用来调接口
// 注意这里直接写 '/api/user'，不用写 http://localhost:3000，因为它就在同一个服务器上
const { data: users, pending, error } = await useFetch("/api/user");
console.log(users.value);
</script>

<template>
  <div style="padding: 20px; font-family: sans-serif">
    <h1>我的第一个全栈页面</h1>

    <!-- 状态1：加载中 -->
    <p v-if="pending">正在从云端数据库拉取数据，请稍候...</p>

    <!-- 状态2：请求出错 -->
    <p v-else-if="error" style="color: red">出错了：{{ error.message }}</p>

    <!-- 状态3：成功拿到数据 -->
    <div v-else style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
      <h3>✅ 数据库里的真实用户：</h3>
      <ul>
        <li v-for="user in users" :key="user.id" style="margin-bottom: 8px;">
          <strong>名字：</strong> {{ user.name }} 
          <strong>邮箱：</strong> {{ user.email }}
        </li>
      </ul>
    </div>
  </div>
</template>