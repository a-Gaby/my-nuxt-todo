<script setup>
const { data: todos, refresh } = await useFetch('/api/todos')
const newTitle = ref('')

// 添加待办
const addTodo = async () => {
  if (!newTitle.value) return
  await $fetch('/api/todos', {
    method: 'POST',
    body: { title: newTitle.value }
  })
  newTitle.value = ''
  refresh() 
}

// 切换完成状态
const toggleTodo = async (todo) => {
  // 发起 PATCH 请求
  await $fetch(`/api/todos/${todo.id}`, {
    method: 'PATCH',
    body: { completed: !todo.completed } // 取反：原来完成就变未完成，未完成就变完成
  })
  refresh()
}

// 删除待办
const deleteTodo = async (id) => {
  // 发起 DELETE 请求
  await $fetch(`/api/todos/${id}`, {
    method: 'DELETE'
  })
  refresh()
}
</script>

<template>
  <div style="max-width: 450px; margin: 50px auto; font-family: sans-serif;">
    <h2>📝 我的待办事项</h2>
    
    <!-- 输入区 -->
    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
      <input 
        v-model="newTitle" 
        @keyup.enter="addTodo"
        placeholder="输入你想做的事..." 
        style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
      />
      <button 
        @click="addTodo"
        style="padding: 8px 16px; background: #00DC82; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        添加
      </button>
    </div>

    <!-- 列表区 -->
    <ul style="list-style: none; padding: 0;">
      <li 
        v-for="todo in todos" 
        :key="todo.id" 
        style="display: flex; align-items: center; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee;"
      >
        <!-- 左边：打勾 + 文字（点击文字也能打勾） -->
        <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" @click="toggleTodo(todo)">
          <input 
            type="checkbox" 
            :checked="todo.completed" 
            style="cursor: pointer;"
            @click.stop="toggleTodo(todo)" 
          />
          <!-- 如果已完成，加个删除线并变灰 -->
          <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#999' : '#333' }">
            {{ todo.title }}
          </span>
        </div>

        <!-- 右边：删除按钮 -->
        <button 
          @click="deleteTodo(todo.id)"
          style="padding: 4px 8px; background: #ff4d4f; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;"
        >
          删除
        </button>
      </li>
    </ul>
  </div>
</template>