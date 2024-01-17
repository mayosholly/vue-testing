<template>
    <div class="container">
        <div class="row">
        <div class="card mt-5">
            <div class="card-header">
                <h4>Add Student
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
                        <button type="button" @click="saveStudent" class="btn btn-primary">Save </button>
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

    name: 'studentCreate',
    data() {
        return {
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
    methods: {
        async saveStudent(){
            var mythis = this
            try {
                const res = await axios.post('http://smart-church.test/api/admin/members', this.model.student)
                this.isLoading = true
                this.model.student = {
                    first_name : '',
                    last_name : '',
                    email : '',
                    phone : ''
                }
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