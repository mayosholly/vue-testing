<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card mt-5">
                    <div class="card-header">
                        <h4>
                            Student
                            <RouterLink to="/student/create" class="btn btn-primary float-end">
                                Add Student
                            </RouterLink>
                        </h4>
                        <div v-if="isLoading">
                            <Spinner />
                        </div>
                    </div>
                    <div class="card-body">
                        
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <TableBody :students=this.students
                                @row-clicked="deleteStudent"
                            />
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import TableBody from '../../components/TableBody.vue'
import Spinner from '../../components/Spinner.vue'

export default{
    name: 'students',
    data(){
        return {
            isLoading: false,
            students: []
        }
    },
    components:{
        TableBody,
        Spinner
    },
    mounted(){
        this.getStudents()
    },
    methods: {
        async getStudents() {
            try {
                const res = await axios.get('http://smart-church.test/api/admin/members')
                this.students = res.data.data
                // console.log(this.students)

            } catch (error) {
                console.log(error)
            }            
        },
        async deleteStudent(id){
            try {
                this.isLoading =  true

                if(confirm('Are you sure you want to delete this data? ')){
                    const res = await axios.delete(`http://smart-church.test/api/admin/members/${id}`)
                    alert(res.data.message)
                    this.getStudents()

                }
                this.isLoading =  false

            } catch (error) {
                if(error.response.status == 404){
                 alert('Page not found')
          }
            }
                  }
    }
}

</script>