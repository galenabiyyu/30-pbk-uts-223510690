<script>
export default {
  props: {
    todos: {
      type: Array,
      default: [],
    },
  },
  methods: {
    deleteTodo(index) {
      this.$emit("deleteTodo", index);
    },
    doneTodo(index) {
      this.$emit("doneTodo", index);
    },
  },
};
</script>

<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="(todo, index) in todos" :key="index">
      <div class="row gy-2">
        <div
          class="col-sm-12 col-md-auto me-auto align-self-center fs-5"
          :class="{ 'text-decoration-line-through text-muted': todo.isDone }"
        >
          {{ todo.activity }}
        </div>
        <div class="col-sm-12 col-md-auto">
          <div class="row gx-2">
            <div class="col-auto">
              <button
                class="btn"
                :class="[
                  todo.isDone ? 'btn-outline-secondary' : 'btn-outline-success',
                ]"
                @click="doneTodo(index)"
              >
                <font-awesome-icon icon="circle-check" />
              </button>
            </div>
            <div class="col-auto">
              <button
                class="btn"
                :class="[
                  todo.isDone ? 'btn-outline-secondary' : 'btn-outline-danger',
                ]"
                @click="deleteTodo(index)"
              >
                <font-awesome-icon icon="eraser" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
