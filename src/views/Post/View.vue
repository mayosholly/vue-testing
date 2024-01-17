<template>
<div class="container">
    <div class="row">
        <div class="card">
            <div class="card-header">
                <h4>
                    Add Post
                    <RouterLink class="btn btn-primary float-end" to="/post/create"> Add Post</RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Content</th>
                                    <th>Images</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                        <tbody>
                            <tr v-for="(post, index) in posts" :key="index" >
                                <td>{{ post._id }}</td>
                                <td>{{ post.title }}</td>
                                <td>{{ post.category }}</td>
                                <td>{{ post.content }}</td>
                                <td>
                                      <img  :src="`/${post.image}`"  alt="Uploaded Image" style="max-width: 200px; margin-top: 10px;">
                                </td>
                                <td>
                                    <RouterLink :to="{ path: '/post/' + post._id + '/edit'}" class="btn btn-primary">Edit</RouterLink>
                                </td>
                            </tr>
                        </tbody>
                        </table>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import { RouterLink } from 'vue-router';
import axios from 'axios'

export default{
    name:'posts',
    data(){
        return{
            posts: []
        }
    },
    mounted(){
        this.getPosts()
    },
    methods: {
        async getPosts(){
            try {
                const res = await axios.get('http://127.0.0.1:3000/api/posts')
                this.posts = res.data
            } catch (error) {
                console.log(error)
            }
        }
    }

}

</script>