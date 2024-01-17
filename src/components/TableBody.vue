<template>
    <tbody  v-if="this.students.length > 0">
        <TableRow
        v-for="(student, index) in students"  
        :key="index"
        :student="student"
        @row-clicked="deleteStudent"
        />
    </tbody>
    <tbody v-else>
        <tr>
            <td>
              <Spinner />
            </td>
        </tr>
    </tbody>   
        
</template>

<script>
import TableRow from './TableRow.vue'
import Spinner from './Spinner.vue'
export default {
    name : 'TableBody',
    props: ['students'], 
    components : {
        TableRow,
        Spinner
    },
    methods: {
        deleteStudent(id){
            this.$emit('row-clicked', id)
        }
    }
}

</script>