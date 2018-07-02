<template>
    <div class="container">
      <div class="row">
            <div class="col-md-4 col-sm-12 offset-md-4 p-2 addTodo">
                <div class="input-group mb-3">
                    <input type="text" placeholder="What Todo?" class="form-control" ref="task"
                    v-model="newTodo"
                    @keyup.enter="createTodo">
                    <div class="input-group-append">
                        <span class="btn btn-dark bg-dark input-group-text text-white" @click="createTodo">Add</span>
                    </div>
                </div>
            </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-sm-12 rounded-top">
          <div class="col-sm-12 m-1 bg-info rounded-top">
            <h1>Todo New</h1>
            <div class="list-group">
                <div class="input-group mb-3" v-for="(todo, key) in todos" 
                :key="key">
                    <input type="text" class="form-control" ref="task" disabled v-model="todo.task">
                    <div class="input-group-append">
                        <span class="btn btn-warning bg-warning input-group-text"
                        data-toggle="tooltip" data-placement="top" title="click to progress"
                        @click="todoProgress(key)"><i class="fas fa-sign-in-alt"></i></span>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-12 rounded-top">
          <div class="col-sm-12 m-1 bg-warning rounded-top">
            <h1>Todo Progress</h1>
            <div class="list-group">
              <div class="mb-3"
              v-for="(progress, key) in todosProgress" :key="key">
                <div class="input-group">
                    <input type="text" class="form-control" ref="task" disabled v-model="progress.task">
                    <div class="input-group-append">
                        <span class="btn btn-success bg-success input-group-text"
                        data-toggle="tooltip" data-placement="top" title="click to finished"
                        @click="completedTodo(key)"><i class="fas fa-check-square"></i></span>
                    </div>
                </div>
                <div class="input-group">
                  <span class="text-dark dateAt">
                    Started at: {{formatedDate(progress.startedAt)}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-12 rounded-top">
          <div class="col-sm-12 m-1 bg-danger rounded-top">
            <h1>Todo Done</h1>
            <div class="list-group">
                <div class="mb-3" v-for="(done, key) in todosDone" 
                  :key="key">
                    <div class="input-group">
                        <input type="text" class="form-control" ref="task" disabled v-model="done.task">
                        <div class="input-group-append">
                            <span class="btn btn-info bg-info input-group-text"
                            data-toggle="tooltip" data-placement="top" title="click to deleted"
                            @click="todoDelete(key)"><i class="fas fa-trash-alt"></i></span>
                        </div>
                    </div>
                    <div class="input-group">
                      <span class="text-dark dateAt">
                          Started at: {{formatedDate(done.startedAt)}}
                      </span>
                      <span class="text-dark dateAt">
                        Completed at: {{formatedDate(done.completedAt)}}
                      </span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import TodoList from '@/components/TodoList'
import {todos, progress, completed} from '@/helpers/firebase'
import swal from 'sweetalert2'

export default {
  name: 'home',
  data(){
    return{
      todos: {},
      todosProgress: {},
      todosDone: {},
      newTodo: '',
    }
  },
  methods: {
    createTodo(){
      console.log('create todo')
      let objTodo = {
        task: this.newTodo,
        createdAt: Date.now(),
        completedAt: null,
        startedAt: null,
        isDone: false
      }
      todos.push(objTodo)
      .then(snapshot=>{
        console.log('push to database', snapshot)
      })

      this.newTodo = ''
    },
    todoProgress(key){
      console.log('todo progress', key)
      todos.child(key).once('value')
      .then(snapshot=>{
        let objTodo = snapshot.val()
        objTodo.startedAt = Date.now()
        progress.child(key).set(objTodo, function(error){
          if(error){
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!' + error,
            })
          }else{
            console.log('data move in progress successfully')
          }
        })
        todos.child(key).remove()
      })
    },
    completedTodo(key){
      console.log('completed todo')
      progress.child(key).once('value')
      .then(snapshot=>{
        let objTodo = snapshot.val()
        objTodo.isDone = true
        objTodo.completedAt = Date.now()
        completed.child(key).set(objTodo, function(error){
          if(error){
              swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!' + error,
              })
          }else{
            console.log('data moved to be done successfully')
          }
        })
        progress.child(key).remove()
      })
    },
    todoDelete(key){
      console.log('delete todo')
      completed.child(key).remove()
    },
    formatedDate(strDate){
      let date = new Date(strDate)
      return date.toLocaleString()
    }
  },
  created(){
    let self = this
    todos.orderByChild('task').on('value', function(snapshot){
      console.log('snapshot new todos', snapshot.val())
         self.todos = snapshot.val()
    })
    progress.on('value', function(snapshot){
      console.log('snapshot in progress', snapshot.val())
         self.todosProgress = snapshot.val()
    })
    completed.on('value', function(snapshot){
      console.log('snapshot done', snapshot.val())
         self.todosDone = snapshot.val()
    })
  }
}
</script>
<style scoped>
.addTodo{
  margin-top: 60px;
  margin-bottom: 20px
}

.dateAt{
  padding: 2px 10px;
  font-size: 10px
}


</style>

