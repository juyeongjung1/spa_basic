import { createRouter, createWebHistory } from 'vue-router'
import EmployeeListView from '../views/EmployeeListView.vue'
import EmployeeDetailView from '../views/EmployeeDetailView.vue'
import NewEmployeeView from '../views/NewEmployeeView.vue'
import EmployeeEditView from '../views/EmployeeEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/employees',
      name: 'employees',
      component: EmployeeListView
    },
    {
      path: '/employees/:id',
      name: 'employee-detail',
      component: EmployeeDetailView
    },
    {
      path: '/employees/new',
      name: 'employee-new',
      component: NewEmployeeView
    },
    {
      path: '/employees/edit/:id',
      name: 'employee-edit',
      component: EmployeeEditView
    }
  ]
})

export default router