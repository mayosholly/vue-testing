<template>
    <div class="container">
        <div class="row">
        <div class="card mt-5">
            <div class="card-header">
                <h4>Edit Student
                <RouterLink to="/students" class="btn btn-primary float-end">
                    Back
                </RouterLink>
            </h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <div v-if="isLoading">
                    <Spinner />
                </div>
                <form action="">
                    <div class="mb-3">
                        <label for="">First Name</label>
                        <input type="text" v-model="model.student.first_name" class="form-control">
                    <span v-if="this.errorList.first_name" style="color: red;">{{ this.errorList.first_name[0] }}</span>
                    </div>
                    <div class="mb-3">
                        <label for="">Last Name</label>
                        <input type="text" v-model="model.student.last_name" class="form-control">
                    <span v-if="this.errorList.last_name" style="color: red;">{{ this.errorList.last_name[0] }}</span>

                    </div>
                    <div class="mb-3">
                        <label for="">Email</label>
                        <input type="email" v-model="model.student.email" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Phone</label>
                        <input type="number" v-model="model.student.phone" class="form-control">
                    </div>
                    <div class="mb-3">
                        <button type="button" @click="updateStudent" class="btn btn-primary">Save </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import axios from 'axios'
    import Spinner from '../../components/Spinner.vue'

export default{

    name: 'studentEdit',
    data() {
        return {
            studentId : '',
            errorList : '',
            isLoading: false,
            model: {
                student:{
                    first_name: '',
                    last_name: '',
                    phone: '',
                    email: ''
                }
            }
        }
    },
    components: {
        Spinner
    },
    mounted() {
        this.studentId = this.$route.params.id
        this.getStudentData(this.studentId)
    },
    methods: {
        async getStudentData(studentId){
            try {
                const res = await axios.get(`http://smart-church.test/api/admin/members/${studentId}`)
                this.isLoading = true               
                this.model.student = res.data.data
                this.isLoading = false

            } catch (error) {
                if(error.response.status == 404){
                    this.isLoading = true
                    alert('page not found')
                    this.isLoading = false
                }
            }
        },
        async updateStudent(){
            var mythis = this
            try {
                const res = await axios.put(`http://smart-church.test/api/admin/members/${this.studentId}`, this.model.student)
                this.isLoading = true
                this.errorList = ''
                this.isLoading = false
                this.$router.push('/students');
            } catch (error) {
                if(error.response){
                    if(error.response.status == 422){
                        this.isLoading = true
                        mythis.errorList  = error.response.data.errors
                        this.isLoading = false
                    }
                  
                }else if(error.request){
                    console.log(error.request)
                }else{
                    console.log('Error', error.message)
                }

            }
        }
    }
}

</script>