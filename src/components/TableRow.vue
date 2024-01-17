<template>
    
                                <!-- <tr v-for="(student, index) in this.students"  :key="index"> -->
                                <tr>
                                    <td>{{ student.id }}</td>
                                    <td>{{ student.first_name }}</td>
                                    <td>{{ student.last_name }}</td>
                                    <td>{{ student.email }}</td>
                                    <td>{{ student.phone }}</td>
                                    <td>
                                        <RouterLink class="btn btn-primary" :to="{ path: '/student/' + student.slug + '/edit'}">
                                            Edit
                                        </RouterLink>

                                        <button type="button" @click="deleteStudent(student.slug)" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                                <!-- </tr> -->
</template>

<script>
export default{
    name: 'TableRow',
    props: ['student'],
    methods: {
        deleteStudent(id){
            this.$emit('row-clicked', id)
        }
    }
    
}
</script>