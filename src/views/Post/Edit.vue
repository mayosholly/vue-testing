<template>
<div class="container">
    <div class="row">
        <div class="card">
            <div class="card-header">
               <h4>Edit Post</h4>
               <RouterLink to="/posts" class="btn btn-primary">Back</RouterLink> 
            </div> 
            <div class="card-body">
                <form action="" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="">Title</label>
                        <input type="text" v-model="model.post.title" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Category</label>
                        <input type="text" v-model="model.post.category" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Content</label>
                        <input type="text" v-model="model.post.content" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="btn btn-success">
                            Upload Image
                            <input type="file"  @change="handleFileChange"  style="display: none" accept="image/*">
                        </label>
                        <img v-if="imageUrl" :src="imageUrl"  alt="Uploaded Image" style="max-width: 200px; margin-top: 10px;">
                    </div>
                    <div class="mb-3">
                       <button type="button" @click="updatePost" class="btn btn-primary" >update Post</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
</div>

</template>
    
    <script>
    import axios from 'axios'
    export default {
        name: 'PostCreate',
        data(){
            return {
                postId: '',
                imageUrl: null,
                model: {
                    post: {
                        title: '',
                        content: '',
                        category: '',
                        image: '',
                    }
                },
               image: ''
            }
        },
        mounted(){
            this.postId = this.$route.params.id
            this.getPostData(this.postId)
        },
        methods: {
            async getPostData(postId){
                try {
                    const res = await axios.get(`http://127.0.0.1:3000/api/posts/${postId}`)
                    this.model.post = res.data
                } catch (error) {
                    console.log(error)
                }
            },
            handleFileChange(e){
                const file = e.target.files[0]
                this.image = file

                if(file){
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        this.imageUrl = e.target.result
                    }
                    reader.readAsDataURL(file)
                }
            },
            async updatePost(){
                console.log(this.model.post)
                const formData = new FormData();
                formData.append("image", this.image)
                formData.append("title", this.model.post.title)
                formData.append("content", this.model.post.content)
                formData.append("category", this.model.post.category)
               try {
               const res = await axios.put(`http://127.0.0.1:3000/api/posts/${this.postId}`, formData)
                alert('successfully Updated')
                this.$router.push('/posts')
               } catch (error) {
                console.log(error)
               }
            } 
        }
    }
    </script>